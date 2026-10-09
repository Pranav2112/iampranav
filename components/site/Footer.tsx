import Link from "next/link";
import { CONTACT } from "@/lib/site";
import { RESUME_HREF } from "@/lib/resume";
import styles from "./site.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerLinks}>
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        <a href={CONTACT.github}>GitHub</a>
        <a href={CONTACT.linkedin}>LinkedIn</a>
        <Link href={RESUME_HREF}>Résumé</Link>
        <Link href="/archive">Archive</Link>
        <Link href="/lab">Lab</Link>
      </p>
      <p className={styles.footerMeta}>Pranav Auti · Hoboken, NJ</p>
    </footer>
  );
}
