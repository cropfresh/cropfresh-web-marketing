import { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
    title: "CropFresh Blog | Agricultural Insights & Farming Tips",
    description: "Discover the latest insights on agricultural technology, farming best practices, and success stories from the CropFresh community.",
    openGraph: {
        title: "CropFresh Blog",
        description: "Discover the latest insights on agricultural technology, farming best practices, and success stories from the CropFresh community.",
        type: "website",
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-green-500/30">
            {/* Ambient background */}
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-900/10 via-slate-950 to-slate-950 -z-10" />
            <div className="fixed inset-0 pointer-events-none bg-[url('/grid.svg')] opacity-[0.02] -z-10" />

            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
