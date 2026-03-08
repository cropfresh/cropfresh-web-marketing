import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { AIHero } from "@/components/sections/AIHero";
import { AIChatDemo } from "@/components/sections/AIChatDemo";
import { AIArchDiagram } from "@/components/sections/AIArchDiagram";
import { PricingEngineDemo } from "@/components/sections/PricingEngineDemo";
import { AITechStack } from "@/components/sections/AITechStack";
import { AIVoiceFlow } from "@/components/sections/AIVoiceFlow";
import { AIVisionPipeline } from "@/components/sections/AIVisionPipeline";

export const metadata: Metadata = {
    title: "CropFresh AI — Experience Live Voice & Intelligence Demo",
    description:
        "Talk to the CropFresh AI in Kannada, Hindi, Telugu, Tamil, or English. Live voice demo, interactive pricing engine, and AI architecture walkthrough for investors and hackathon judges.",
    openGraph: {
        title: "CropFresh AI — Live Intelligence Demo",
        description:
            "Experience India's most advanced agri-tech AI: real-time voice, quality grading, and dynamic pricing.",
        url: "https://cropfresh.in/ai",
        siteName: "CropFresh",
        type: "website",
    },
};

export default function AIShowcasePage() {
    return (
        <main className="min-h-screen bg-[#050709] text-foreground">
            <Navbar />
            {/* Section 1: Hero */}
            <AIHero />
            {/* Section 2: Live AI Chat & Voice Demo */}
            <AIChatDemo />
            {/* Section 3: AI Architecture Diagram */}
            <AIArchDiagram />
            {/* Section 4: Interactive Pricing Engine */}
            <PricingEngineDemo />
            {/* Section 5: AI Tech Stack (bento grid) */}
            <AITechStack />
            {/* Bonus: Voice pipeline detail */}
            <AIVoiceFlow />
            {/* Bonus: Vision pipeline detail */}
            <AIVisionPipeline />
            <Footer />
        </main>
    );
}
