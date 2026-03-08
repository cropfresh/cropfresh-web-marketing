import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'For Buyers - Source Quality Produce | CropFresh',
    description:
        'Source quality-graded, fresh agricultural produce with CropFresh. Benefit from transparent AISP pricing, same-day delivery, and full digital twin traceability for restaurants, retailers, and food processors.',
    keywords: [
        'produce buyers',
        'B2B agriculture',
        'CropFresh',
        'wholesale fruits and vegetables',
        'restaurant supply',
        'retailer fresh produce',
        'quality graded',
        'traceability',
        'transparent pricing',
    ],
    openGraph: {
        title: 'For Buyers - Source Quality Produce | CropFresh',
        description:
            'Source quality-graded, fresh agricultural produce with CropFresh. Benefit from transparent AISP pricing and same-day delivery.',
        type: 'website',
        url: 'https://cropfresh.in/buyers',
        images: [
            {
                url: '/images/buyers-og.png',
                width: 1200,
                height: 630,
                alt: 'CropFresh for Buyers',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'For Buyers - Source Quality Produce | CropFresh',
        description:
            'Source quality-graded, fresh agricultural produce with CropFresh. Benefit from transparent AISP pricing and same-day delivery.',
        images: ['/images/buyers-og.png'],
    },
};

export default function BuyersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
