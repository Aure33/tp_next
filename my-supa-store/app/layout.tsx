import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { CartProvider } from "@/context/CartContext";
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
  title: "My Supa Store",
  description: "La meilleure boutique",
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
        <CartProvider>
          <Navigation />
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
