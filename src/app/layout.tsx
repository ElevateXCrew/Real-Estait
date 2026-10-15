import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meridian — Real Estate, Construction & Property Development",
  description:
    "Meridian is a premium real estate and construction company offering property sales, rentals, management, residential and commercial construction, architecture, renovation, and turnkey development services.",
  keywords: [
    "real estate",
    "construction",
    "property development",
    "architecture",
    "renovation",
    "property management",
    "commercial real estate",
  ],
  authors: [{ name: "Meridian Group" }],
  openGraph: {
    title: "Meridian — Real Estate & Construction",
    description:
      "Building better spaces. Creating lasting value. Premium real estate and construction services.",
    siteName: "Meridian",
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
        className={`${jakarta.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
