import type { Metadata } from "next";
import { Space_Grotesk, Inter, Geist_Mono, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "500"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["300", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pranav Auti — Engineer",
  description:
    "MS CS at Stevens Institute of Technology. Building AI, Web3, and full-stack production systems. AvaxPay, FinSight AI, FlashBet, MaternaSense.",
  keywords: ["Pranav Auti", "Stevens", "Web3", "AI", "FinTech", "Full Stack", "Solidity", "Next.js"],
  authors: [{ name: "Pranav Auti" }],
  metadataBase: new URL("https://iampranavdev.vercel.app"),
  openGraph: {
    title: "Pranav Auti — Engineer",
    description: "Building production systems at the intersection of AI, Web3, and software engineering.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable} ${barlowCondensed.variable}`}
    >
      <body>
        <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] btn-primary">
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
