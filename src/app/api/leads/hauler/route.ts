import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";

// Validation schema
const haulerLeadSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
    city: z.string().min(1, "City is required"),
    vehicleType: z.string().min(1, "Vehicle type is required"),
});

// Lead data with metadata
interface HaulerLead {
    id: string;
    name: string;
    phone: string;
    city: string;
    vehicleType: string;
    submittedAt: string;
    status: "pending" | "contacted" | "converted" | "rejected";
    source: "website";
    userAgent?: string;
}

// Storage path for leads (MVP: JSON file)
const LEADS_FILE = path.join(process.cwd(), "data", "hauler-leads.json");

// Ensure data directory exists
async function ensureDataDir() {
    const dataDir = path.dirname(LEADS_FILE);
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }
}

// Read existing leads
async function getLeads(): Promise<HaulerLead[]> {
    try {
        const data = await fs.readFile(LEADS_FILE, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// Save leads
async function saveLeads(leads: HaulerLead[]) {
    await ensureDataDir();
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

// Generate unique ID
function generateId(): string {
    return `hauler_lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * POST /api/leads/hauler
 * Capture hauler callback request leads
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validationResult = haulerLeadSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Validation failed",
                    errors: validationResult.error.errors.map((e) => ({
                        field: e.path.join("."),
                        message: e.message,
                    })),
                },
                { status: 400 }
            );
        }

        const data = validationResult.data;

        // Check for duplicate phone number (recent submissions)
        const existingLeads = await getLeads();
        const recentDuplicate = existingLeads.find(
            (lead) =>
                lead.phone === data.phone &&
                new Date(lead.submittedAt).getTime() > Date.now() - 24 * 60 * 60 * 1000 // Within 24 hours
        );

        if (recentDuplicate) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Request already received. We'll call you soon!",
                    duplicate: true,
                },
                { status: 200 }
            );
        }

        // Create new lead
        const newLead: HaulerLead = {
            id: generateId(),
            name: data.name,
            phone: data.phone,
            city: data.city,
            vehicleType: data.vehicleType,
            submittedAt: new Date().toISOString(),
            status: "pending",
            source: "website",
            userAgent: request.headers.get("user-agent") || undefined,
        };

        // Save lead
        existingLeads.push(newLead);
        await saveLeads(existingLeads);

        // Log for debugging
        console.log("[Hauler Lead] New submission:", {
            id: newLead.id,
            name: newLead.name,
            city: newLead.city,
            vehicleType: newLead.vehicleType,
            submittedAt: newLead.submittedAt,
        });

        return NextResponse.json({
            success: true,
            message: "Lead captured successfully",
            leadId: newLead.id,
        });
    } catch (error) {
        console.error("[Hauler Lead] Error processing submission:", error);

        return NextResponse.json(
            {
                success: false,
                message: "An error occurred. Please try again.",
            },
            { status: 500 }
        );
    }
}

/**
 * GET /api/leads/hauler
 * Retrieve leads (admin only - would need auth in production)
 */
export async function GET(request: NextRequest) {
    // In production, add authentication check here
    const authHeader = request.headers.get("x-api-key");

    // Simple API key check for MVP
    if (authHeader !== process.env.ADMIN_API_KEY && process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const leads = await getLeads();

        return NextResponse.json({
            success: true,
            count: leads.length,
            leads: leads.sort(
                (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
            ),
        });
    } catch (error) {
        console.error("[Hauler Lead] Error fetching leads:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch leads" },
            { status: 500 }
        );
    }
}
