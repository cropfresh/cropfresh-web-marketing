import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { HaulerHero } from "@/components/sections/HaulerHero";
import { HaulerBenefits } from "@/components/sections/HaulerBenefits";
import { HaulerHowItWorks } from "@/components/sections/HaulerHowItWorks";
import { HaulerEarnings } from "@/components/sections/HaulerEarnings";
import { HaulerRequirements } from "@/components/sections/HaulerRequirements";
import { HaulerTestimonial } from "@/components/sections/HaulerTestimonial";
import { HaulerDownload } from "@/components/sections/HaulerDownload";
import { HaulerCallbackForm } from "@/components/sections/HaulerCallbackForm";

export default function HaulersPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <HaulerHero />
            <HaulerBenefits />
            <HaulerHowItWorks />
            <HaulerEarnings />
            <HaulerRequirements />
            <HaulerTestimonial />
            <HaulerDownload />
            <HaulerCallbackForm />
            <Footer />
        </main>
    );
}
