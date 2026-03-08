import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | CropFresh",
    description:
        "Get in touch with CropFresh for support, partnerships, investment opportunities, or general inquiries. We're here to help farmers, buyers, and haulers.",
    openGraph: {
        title: "Contact Us | CropFresh",
        description:
            "Get in touch with CropFresh for support, partnerships, investment opportunities, or general inquiries.",
        type: "website",
        url: "https://cropfresh.in/contact",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
