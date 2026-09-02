import type { Metadata } from "next";
import { Manrope, Marcellus } from "next/font/google";
import { BUSINESS } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${BUSINESS.name} — ${BUSINESS.tagline}`,
    template: `%s | ${BUSINESS.name}`,
  },
  description: `${BUSINESS.name} serves authentic Greek cuisine in Scarborough. Fresh Greek favourites for dine-in, takeout, and catering at ${BUSINESS.address.shortLocation}. Call ${BUSINESS.phone}.`,
  keywords: [
    "Greek restaurant Scarborough",
    "authentic Greek cuisine Scarborough",
    "Greek takeout Scarborough",
    "Greek catering Scarborough",
    "Greek food near Steeles and Middlefield",
    "Greek Mansion Restaurant",
    "souvlaki Scarborough",
    "gyro Scarborough",
  ],
  metadataBase: new URL(BUSINESS.website),
  openGraph: {
    title: `${BUSINESS.name} — ${BUSINESS.tagline}`,
    description: `Fresh Greek favourites for dine-in, takeout, and catering at ${BUSINESS.address.shortLocation}. Call ${BUSINESS.phone}.`,
    url: BUSINESS.website,
    siteName: BUSINESS.name,
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/images/food/hero-hq.jpg",
        width: 2880,
        height: 2304,
        alt: "Greek Mansion Restaurant — Authentic Greek cuisine spread",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.name} — ${BUSINESS.tagline}`,
    description: `Fresh Greek favourites for dine-in, takeout, and catering in Scarborough.`,
    images: ["/images/food/hero-hq.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: BUSINESS.website,
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: BUSINESS.name,
  url: BUSINESS.website,
  telephone: BUSINESS.phone,
  image: `${BUSINESS.website}images/food/hero-hq.jpg`,
  logo: `${BUSINESS.website}images/logo/logo-icon.png`,
  servesCuisine: "Greek",
  menu: `${BUSINESS.website}menu`,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: BUSINESS.address.postalCode,
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.8235,
    longitude: -79.2648,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${marcellus.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]" style={{ fontFamily: "'Manrope', sans-serif" }}>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileBottomBar />
      </body>
    </html>
  );
}
