import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

// Display font - Outfit for headlines
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Body font - Inter for text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// SEO Metadata
export const metadata: Metadata = {
  title: {
    default: "CropFresh - Farm-Fresh Produce, Direct to You",
    template: "%s | CropFresh",
  },
  description:
    "CropFresh connects farmers directly with buyers. Quality-verified produce, AI-powered pricing, instant payments, and full traceability from farm to fork.",
  keywords: [
    "CropFresh",
    "farm to fork",
    "fresh produce",
    "farmers marketplace",
    "agricultural technology",
    "agritech",
    "Karnataka",
    "India",
    "direct from farmers",
  ],
  authors: [{ name: "CropFresh" }],
  creator: "CropFresh",
  publisher: "CropFresh",
  metadataBase: new URL("https://cropfresh.in"),

  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://cropfresh.in",
    siteName: "CropFresh",
    title: "CropFresh - Farm-Fresh Produce, Direct to You",
    description:
      "AI-powered agriculture marketplace connecting farmers with buyers. Quality verified, instant payments, full traceability.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CropFresh - Rewriting the Code of Agriculture",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "CropFresh - Farm-Fresh Produce, Direct to You",
    description:
      "AI-powered agriculture marketplace connecting farmers with buyers.",
    images: ["/og-image.png"],
    creator: "@cropfresh",
  },

  // Additional SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Manifest
  manifest: "/site.webmanifest",
};

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0F172A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${outfit.variable} ${inter.variable} antialiased bg-[var(--color-background)] text-[var(--color-text-primary)]`}
      >
        {children}
      </body>
    </html>
  );
}
