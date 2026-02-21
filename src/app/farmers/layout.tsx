import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "For Farmers - Join CropFresh & Earn More",
    description:
        "Join 500+ farmers earning more with CropFresh. Get fair prices, instant UPI payments, free quality verification, and list crops using voice in Kannada or English.",
    keywords: [
        "farmers",
        "CropFresh",
        "sell produce",
        "fair prices",
        "instant payment",
        "UPI",
        "Karnataka farmers",
        "agriculture marketplace",
        "voice listing",
        "Kannada",
    ],
    openGraph: {
        title: "For Farmers - Join CropFresh & Earn More",
        description:
            "Join 500+ farmers earning more with CropFresh. Get fair prices, instant UPI payments, free quality verification.",
        type: "website",
        url: "https://cropfresh.in/farmers",
        images: [
            {
                url: "/images/farmers-og.png",
                width: 1200,
                height: 630,
                alt: "CropFresh for Farmers",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "For Farmers - Join CropFresh & Earn More",
        description:
            "Join 500+ farmers earning more with CropFresh. Get fair prices, instant UPI payments.",
        images: ["/images/farmers-og.png"],
    },
};

export default function FarmersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
