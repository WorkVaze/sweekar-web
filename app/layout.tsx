import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GoogleAnalytics, MetaPixel } from "@/lib/analytics";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sweekaarproductions.com";
const siteName = "Sweekaar Productions";
const title = "Sweekaar Productions | Cinema. Theatre. Human Stories.";
const description =
  "Sweekaar Productions is a Mumbai-based cinema and theatre production house founded by Indira Baikerikar, crafting emotionally driven stories rooted in resilience, transformation, and authentic human connection.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Sweekaar Productions",
  },
  description,
  keywords: [
    "Sweekaar Productions",
    "cinema production house Mumbai",
    "theatre production house",
    "film production company India",
    "Indira Baikerikar",
    "story development",
    "stage productions",
    "creative collaborations",
  ],
  authors: [{ name: "Sweekaar Productions" }],
  creator: "Sweekaar Productions",
  publisher: "Sweekaar Productions",
  applicationName: siteName,
  category: "Arts & Entertainment",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName,
    title,
    description,
    images: [
      {
        url: "/hero.png",
        width: 1689,
        height: 931,
        alt: "Sweekaar Productions — Cinema. Theatre. Human Stories.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/hero.png"],
  },
  formatDetection: {
    email: true,
    telephone: false,
    address: true,
  },
  verification: {
    // Fill in once available:
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "facebook-domain-verification": process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION ?? "",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/sweekaar-logo.png`,
  image: `${siteUrl}/hero.png`,
  description,
  founder: {
    "@type": "Person",
    name: "Indira Baikerikar",
  },
  email: "hello@sweekaarproductions.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  sameAs: [],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
        <GoogleAnalytics />
        <MetaPixel />
      </body>
    </html>
  );
}
