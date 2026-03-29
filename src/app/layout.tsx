import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import PageFade from "@/components/transitions/PageFade";
import PageTransition from "@/components/transitions/PageTransition";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import BackToTopButton from "@/components/ui/BackToTopButton";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shigoshots.com'),
  title: {
    default: 'ShigoShots — Photography',
    template: '%s | ShigoShots'
  },
  description:
    "Professional photography portfolio — portraits, weddings, editorial and fine art photography based in Lagos, Nigeria.",
  keywords: [
    "photography",
    "portrait photography",
    "wedding photography",
    "editorial photography",
    "fine art photography",
    "commercial photography",
    "Lagos Nigeria",
    "photography portfolio",
    "professional photographer"
  ],
  authors: [
    {
      name: "ShigoShots",
      url: "https://shigoshots.com"
    }
  ],
  creator: "ShigoShots",
  publisher: "ShigoShots",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "ShigoShots — Photography",
    description:
      "Professional photography portfolio — portraits, weddings, editorial and fine art photography based in Lagos, Nigeria.",
    type: "website",
    url: "https://shigoshots.com",
    siteName: "ShigoShots",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ShigoShots — Photography",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShigoShots — Photography",
    description: "Professional photography portfolio — portraits, weddings, editorial and fine art photography",
    images: ["/og-image.jpg"],
    creator: "@shigoshots",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ShigoShots",
  },
  other: {
    'X-DNS-Prefetch-Control': 'on',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'ShigoShots',
    jobTitle: 'Professional Photographer',
    url: 'https://shigoshots.com',
    sameAs: [
      'https://instagram.com/shigoshots',
      'https://twitter.com/shigoshots',
    ],
    description: 'Professional photography portfolio — portraits, weddings, editorial and fine art photography based in Lagos, Nigeria',
    image: '/og-image.jpg',
    email: 'hello@shigoshots.com',
    areaServed: 'Worldwide',
    expertise: [
      'Portrait Photography',
      'Wedding Photography',
      'Editorial Photography',
      'Commercial Photography',
      'Fine Art Photography',
      'Documentary Photography',
    ],
  }

  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${montserrat.variable} h-full antialiased`}
      style={{
        background: "#080808",
      }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          id="structured-data"
        />
      </head>
      <body className="relative min-h-screen bg-black text-text overflow-x-hidden">
        {/* Fallback for when JavaScript is disabled - restore default cursor */}
        <noscript>
          <style>{`body { cursor: auto !important; }`}</style>
        </noscript>
        <ScrollProgressBar />
        <Navbar />
        {/* Grain noise overlay */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4' seed='1' /%3E%3C/filter%3E%3Crect width='100' height='100' fill='%23ffffff' filter='url(%23noise)' /%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
          aria-hidden="true"
        />
        <PageFade>
          <PageTransition>{children}</PageTransition>
        </PageFade>
        <BackToTopButton />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
