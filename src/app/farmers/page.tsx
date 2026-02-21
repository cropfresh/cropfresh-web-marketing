import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FarmerHero } from "@/components/sections/FarmerHero";
import { FarmerBenefits } from "@/components/sections/FarmerBenefits";
import { FarmerGetStarted } from "@/components/sections/FarmerGetStarted";
import { FarmerTestimonial } from "@/components/sections/FarmerTestimonial";
import { FarmerDownload } from "@/components/sections/FarmerDownload";
import { FarmerCallbackForm } from "@/components/sections/FarmerCallbackForm";

export default function FarmersPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <FarmerHero />
            <FarmerBenefits />
            <FarmerGetStarted />
            <FarmerTestimonial />
            <FarmerDownload />
            <FarmerCallbackForm />
            <Footer />
        </main>
    );
}
