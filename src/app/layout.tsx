import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "STRYKER | AI Financial Intelligence Platform",
  description:
    "AI-driven regulatory signal extraction and investment intelligence. Analyze 10-K, 10-Q, 8-K filings with NLP to generate structured investment signals.",
  keywords: [
    "AI",
    "Financial Intelligence",
    "NLP",
    "SEC Filings",
    "Investment Signals",
    "Regulatory Analysis",
  ],
  authors: [{ name: "Naitik Joshi", url: "https://naitik.online" }],
  openGraph: {
    title: "STRYKER | AI Financial Intelligence Platform",
    description: "Transform regulatory disclosures into actionable investment signals",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
