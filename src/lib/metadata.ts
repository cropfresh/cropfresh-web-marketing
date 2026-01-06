import type { Metadata } from "next";

/**
 * Base site configuration for SEO
 */
export const siteConfig = {
    name: "CropFresh",
    description:
        "CropFresh connects farmers directly with buyers. Quality-verified produce, AI-powered pricing, instant payments, and full traceability from farm to fork.",
    url: "https://cropfresh.in",
    ogImage: "/og-image.png",
    links: {
        twitter: "https://twitter.com/cropfresh",
        instagram: "https://instagram.com/cropfresh",
        linkedin: "https://linkedin.com/company/cropfresh",
    },
    creator: "CropFresh",
    keywords: [
        "CropFresh",
        "farm to fork",
        "fresh produce",
        "farmers marketplace",
        "agricultural technology",
        "agritech",
        "Karnataka",
        "India",
    ],
};

/**
 * Generate page-specific metadata with defaults
 */
export function generatePageMetadata({
    title,
    description,
    image,
    noIndex = false,
}: {
    title: string;
    description?: string;
    image?: string;
    noIndex?: boolean;
}): Metadata {
    const pageDescription = description ?? siteConfig.description;
    const pageImage = image ?? siteConfig.ogImage;

    return {
        title,
        description: pageDescription,
        openGraph: {
            title,
            description: pageDescription,
            images: [
                {
                    url: pageImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: pageDescription,
            images: [pageImage],
        },
        robots: noIndex
            ? { index: false, follow: false }
            : { index: true, follow: true },
    };
}

/**
 * Generate canonical URL for a page
 */
export function getCanonicalUrl(path: string): string {
    return `${siteConfig.url}${path}`;
}

/**
 * Structured data for Organization (JSON-LD)
 */
export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CropFresh",
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
        siteConfig.links.twitter,
        siteConfig.links.instagram,
        siteConfig.links.linkedin,
    ],
    description: siteConfig.description,
    foundingDate: "2025",
    address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressRegion: "Karnataka",
    },
};
