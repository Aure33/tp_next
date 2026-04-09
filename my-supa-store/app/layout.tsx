import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import WebVitalsLogger from "@/components/WebVitalsLogger";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const dancingScript = localFont({
  src: "../public/fonts/DancingScript.ttf",
  variable: "--font-dancing-script",
  weight: "400 700",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  manifest: "/manifest.webmanifest",
  applicationName: "My Supa Store",
  title: {
    default: "My Supa Store",
    template: "%s | My Supa Store",
  },
  description: "Catalogue premium de produits tech sélectionnés.",
  keywords: [
    "boutique tech",
    "produits électroniques",
    "accessoires",
    "audio",
    "wearables",
    "my supa store",
  ],
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
  openGraph: {
    title: "My Supa Store",
    description: "Catalogue premium de produits tech sélectionnés.",
    url: "/",
    siteName: "My Supa Store",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=1200",
        width: 1200,
        height: 630,
        alt: "My Supa Store - Catalogue produits",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/icons/icon-192.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} antialiased min-h-screen flex flex-col`}
      >
        <ServiceWorkerRegister />
        <WebVitalsLogger />
        <Navigation />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
