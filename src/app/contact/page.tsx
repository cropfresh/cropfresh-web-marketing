import { Navbar, Footer } from "@/components/sections";
import {
    ContactHero,
    ContactInfo,
    ContactForm,
    ContactFAQ,
    ContactPartner,
    ContactSupport,
} from "@/components/sections";

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main>
                <ContactHero />
                <ContactInfo />
                <ContactForm />
                <ContactFAQ />
                <ContactPartner />
                <ContactSupport />
            </main>
            <Footer />
        </>
    );
}
