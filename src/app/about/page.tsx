import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutStory } from "@/components/sections/AboutStory";
import { AboutValuePillars } from "@/components/sections/AboutValuePillars";
import { AboutImpact } from "@/components/sections/AboutImpact";
import { AboutTeam } from "@/components/sections/AboutTeam";
import { AboutCTA } from "@/components/sections/AboutCTA";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <AboutHero />
            <AboutStory />
            <AboutValuePillars />
            <AboutImpact />
            <AboutTeam />
            <AboutCTA />
            <Footer />
        </main>
    );
}
