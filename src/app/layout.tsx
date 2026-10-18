import type { Metadata } from "next";
import { Marcellus, Quicksand, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  title: "TS Estate & Builders — Real Estate, Construction & Property Development",
  description:
    "TS Estate & Builders is a premium real estate and construction company offering property sales, rentals, management, residential and commercial construction, architecture, renovation, and turnkey development services.",
  keywords: [
    "real estate",
    "construction",
    "property development",
    "architecture",
    "renovation",
    "property management",
    "commercial real estate",
  ],
  authors: [{ name: "TS Estate & Builders" }],
  openGraph: {
    title: "TS Estate & Builders — Real Estate & Construction",
    description:
      "Building better spaces. Creating lasting value. Premium real estate and construction services.",
    siteName: "TS Estate & Builders",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${marcellus.variable} ${quicksand.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
