import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";

// Validation schema matching the frontend
const buyerLeadSchema = z.object({
    businessName: z.string().min(2, "Business name must be at least 2 characters"),
    contactPerson: z.string().min(2, "Contact person must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
    businessType: z.enum(["restaurant", "retail", "food_processing", "catering", "other"]),
    monthlyVolume: z.enum(["under_50k", "50k_2l", "2l_5l", "5l_10l", "over_10l"]),
});

// Lead data with metadata
interface BuyerLead {
    id: string;
    businessName: string;
    contactPerson: string;
    email: string;
    phone: string;
    businessType: string;
    monthlyVolume: string;
    submittedAt: string;
    status: "pending" | "contacted" | "converted" | "rejected";
    source: "website";
    userAgent?: string;
}

// Storage path for leads (MVP: JSON file)
const LEADS_FILE = path.join(process.cwd(), "data", "buyer-leads.json");

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
async function getLeads(): Promise<BuyerLead[]> {
    try {
        const data = await fs.readFile(LEADS_FILE, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// Save leads
async function saveLeads(leads: BuyerLead[]) {
    await ensureDataDir();
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

// Generate unique ID
function generateId(): string {
    return `buyer_lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * POST /api/leads/buyer
 * Capture buyer demo request leads
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validationResult = buyerLeadSchema.safeParse(body);
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

        // Check for duplicate phone/email (recent submissions)
        const existingLeads = await getLeads();
        const recentDuplicate = existingLeads.find(
            (lead) =>
                (lead.phone === data.phone || lead.email === data.email) &&
                new Date(lead.submittedAt).getTime() > Date.now() - 24 * 60 * 60 * 1000 // Within 24 hours
        );

        if (recentDuplicate) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Demo request already received. We'll contact you soon!",
                    duplicate: true,
                },
                { status: 200 }
            );
        }

        // Create new lead
        const newLead: BuyerLead = {
            id: generateId(),
            businessName: data.businessName,
            contactPerson: data.contactPerson,
            email: data.email,
            phone: data.phone,
            businessType: data.businessType,
            monthlyVolume: data.monthlyVolume,
            submittedAt: new Date().toISOString(),
            status: "pending",
            source: "website",
            userAgent: request.headers.get("user-agent") || undefined,
        };

        // Save lead
        existingLeads.push(newLead);
        await saveLeads(existingLeads);

        // Log for debugging
        console.log("[Buyer Lead] New submission:", {
            id: newLead.id,
            businessName: newLead.businessName,
            businessType: newLead.businessType,
            submittedAt: newLead.submittedAt,
        });

        return NextResponse.json({
            success: true,
            message: "Lead captured successfully",
            leadId: newLead.id,
        });
    } catch (error) {
        console.error("[Buyer Lead] Error processing submission:", error);

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
 * GET /api/leads/buyer
 * Retrieve leads (admin only - would need auth in production)
 */
export async function GET(request: NextRequest) {
    const authHeader = request.headers.get("x-api-key");

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
        console.error("[Buyer Lead] Error fetching leads:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch leads" },
            { status: 500 }
        );
    }
}
