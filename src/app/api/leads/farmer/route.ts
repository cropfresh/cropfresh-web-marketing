import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";

// Validation schema matching the frontend
const farmerLeadSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
    village: z.string().min(1, "Village is required"),
    language: z.enum(["en", "kn", "hi"]),
});

// Lead data with metadata
interface FarmerLead {
    id: string;
    name: string;
    phone: string;
    village: string;
    language: string;
    submittedAt: string;
    status: "pending" | "contacted" | "converted" | "rejected";
    source: "website";
    userAgent?: string;
}

// Storage path for leads (MVP: JSON file)
const LEADS_FILE = path.join(process.cwd(), "data", "farmer-leads.json");

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
async function getLeads(): Promise<FarmerLead[]> {
    try {
        const data = await fs.readFile(LEADS_FILE, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// Save leads
async function saveLeads(leads: FarmerLead[]) {
    await ensureDataDir();
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

// Generate unique ID
function generateId(): string {
    return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * POST /api/leads/farmer
 * Capture farmer callback request leads
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validationResult = farmerLeadSchema.safeParse(body);
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
        const newLead: FarmerLead = {
            id: generateId(),
            name: data.name,
            phone: data.phone,
            village: data.village,
            language: data.language,
            submittedAt: new Date().toISOString(),
            status: "pending",
            source: "website",
            userAgent: request.headers.get("user-agent") || undefined,
        };

        // Save lead
        existingLeads.push(newLead);
        await saveLeads(existingLeads);

        // Log for debugging (in production, would send to CRM/notification service)
        console.log("[Farmer Lead] New submission:", {
            id: newLead.id,
            name: newLead.name,
            village: newLead.village,
            language: newLead.language,
            submittedAt: newLead.submittedAt,
        });

        return NextResponse.json({
            success: true,
            message: "Lead captured successfully",
            leadId: newLead.id,
        });
    } catch (error) {
        console.error("[Farmer Lead] Error processing submission:", error);

        // Don't expose internal errors
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
 * GET /api/leads/farmer
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
        console.error("[Farmer Lead] Error fetching leads:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch leads" },
            { status: 500 }
        );
    }
}
