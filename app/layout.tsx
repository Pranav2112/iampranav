import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import styles from "@/components/site/site.module.css";
import { SITE } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Atlas's own interface face, used only inside Atlas material.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

// MailGuard's own interface face, used only inside MailGuard material.
const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-sans",
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Pranav Auti — Software Engineer", template: "%s — Pranav Auti" },
  description: SITE.description,
  authors: [{ name: "Pranav Auti", url: SITE.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Pranav Auti",
    url: "/",
    title: "Pranav Auti — Software Engineer",
    description: SITE.description,
  },
  twitter: { card: "summary_large_image", title: "Pranav Auti — Software Engineer", description: SITE.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#e9e9e6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable} ${geist.variable} ${geistMono.variable}`}>
      <body>
        <a href="#main" className={styles.skip}>
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
