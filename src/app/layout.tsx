import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { ShowcaseProvider } from "@/contexts/ShowcaseContext";
import { homepageMessage } from "@/data/marketing";
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
    default: homepageMessage.title,
    template: "%s | CropFresh",
  },
  description: homepageMessage.description,
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
    title: homepageMessage.title,
    description: homepageMessage.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CropFresh product vision for farms, buyers, and delivery partners",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: homepageMessage.title,
    description: homepageMessage.description,
    images: ["/og-image.png"],
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
  themeColor: "#FAF8EF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
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
        <AuthProvider>
          <ShowcaseProvider>
            {children}
          </ShowcaseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
