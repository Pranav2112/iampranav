import type { Metadata } from "next";

export const SITE = {
  name: "Pranav Auti",
  url: "https://iampranav.vercel.app",
  description:
    "Pranav Auti, software engineer and MS Computer Science student at Stevens Institute of Technology. Atlas, NetForge, MailGuard and ARGUS: a ledger-first finance app, a routing lab, rule-first email triage and an earthquake supply-chain prototype.",
} as const;

export const CONTACT = {
  email: "pranavauti2003@gmail.com",
  github: "https://github.com/Pranav2112",
  linkedin: "https://www.linkedin.com/in/pranavauti",
} as const;

/** Per-page metadata. Open Graph is set per page because a page's object replaces the layout's. */
export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: `${title} — ${SITE.name}`,
      description,
      url: path,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: { card: "summary_large_image", title: `${title} — ${SITE.name}`, description, images: ["/opengraph-image"] },
  };
}

export const NAV = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Archive", href: "/archive" },
] as const;
