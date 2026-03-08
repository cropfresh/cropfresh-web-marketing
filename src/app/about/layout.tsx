import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About CropFresh | Our Mission & Story",
    description: "Learn about CropFresh's mission to bridge the gap between farmers and buyers through AI-powered technology. Fair prices, zero waste, and direct farm-to-fork supply chain.",
    openGraph: {
        title: "About CropFresh | Our Mission & Story",
        description: "Learn about CropFresh's mission to bridge the gap between farmers and buyers through AI-powered technology.",
        type: "website",
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
