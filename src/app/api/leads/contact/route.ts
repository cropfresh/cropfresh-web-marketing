import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";

// Validation schema matching the frontend
const contactLeadSchema = z.object({
    inquiryType: z.enum([
        "general",
        "farmer_support",
        "buyer_support",
        "partnership",
        "press_media",
        "careers",
    ]),
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
        .optional()
        .or(z.literal("")),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

// Lead data with metadata
interface ContactLead {
    id: string;
    inquiryType: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    submittedAt: string;
    status: "pending" | "contacted" | "resolved" | "rejected";
    source: "website";
    userAgent?: string;
}

// Storage path for leads (MVP: JSON file)
const LEADS_FILE = path.join(process.cwd(), "data", "contact-leads.json");

// In-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
        return false;
    }

    if (entry.count >= RATE_LIMIT_MAX) {
        return true;
    }

    entry.count++;
    return false;
}

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
async function getLeads(): Promise<ContactLead[]> {
    try {
        const data = await fs.readFile(LEADS_FILE, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// Save leads
async function saveLeads(leads: ContactLead[]) {
    await ensureDataDir();
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

// Generate unique ID
function generateId(): string {
    return `contact_lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * POST /api/leads/contact
 * Capture contact form submissions
 */
export async function POST(request: NextRequest) {
    try {
        // Rate limit check
        const ip =
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            request.headers.get("x-real-ip") ||
            "unknown";

        if (isRateLimited(ip)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Too many submissions. Please try again later.",
                },
                { status: 429 }
            );
        }

        const body = await request.json();

        // Validate input
        const validationResult = contactLeadSchema.safeParse(body);
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

        // Check for duplicate (same email + inquiry type within 24 hours)
        const existingLeads = await getLeads();
        const recentDuplicate = existingLeads.find(
            (lead) =>
                lead.email === data.email &&
                lead.inquiryType === data.inquiryType &&
                new Date(lead.submittedAt).getTime() >
                Date.now() - 24 * 60 * 60 * 1000
        );

        if (recentDuplicate) {
            return NextResponse.json(
                {
                    success: true,
                    message:
                        "Your inquiry has already been received. We'll respond within 24 hours.",
                    duplicate: true,
                },
                { status: 200 }
            );
        }

        // Create new lead
        const newLead: ContactLead = {
            id: generateId(),
            inquiryType: data.inquiryType,
            name: data.name,
            email: data.email,
            phone: data.phone || undefined,
            message: data.message,
            submittedAt: new Date().toISOString(),
            status: "pending",
            source: "website",
            userAgent: request.headers.get("user-agent") || undefined,
        };

        // Save lead
        existingLeads.push(newLead);
        await saveLeads(existingLeads);

        // Log for debugging
        console.log("[Contact Lead] New submission:", {
            id: newLead.id,
            inquiryType: newLead.inquiryType,
            name: newLead.name,
            submittedAt: newLead.submittedAt,
        });

        return NextResponse.json({
            success: true,
            message: "Thank you! We'll respond within 24 hours.",
            leadId: newLead.id,
        });
    } catch (error) {
        console.error("[Contact Lead] Error processing submission:", error);

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
 * GET /api/leads/contact
 * Retrieve leads (admin only - would need auth in production)
 */
export async function GET(request: NextRequest) {
    const authHeader = request.headers.get("x-api-key");

    if (
        authHeader !== process.env.ADMIN_API_KEY &&
        process.env.NODE_ENV === "production"
    ) {
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
                (a, b) =>
                    new Date(b.submittedAt).getTime() -
                    new Date(a.submittedAt).getTime()
            ),
        });
    } catch (error) {
        console.error("[Contact Lead] Error fetching leads:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch leads" },
            { status: 500 }
        );
    }
}
