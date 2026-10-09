import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import Link from "next/link";
import styles from "@/components/site/page.module.css";

export const metadata: Metadata = pageMeta(
  "Lab",
  "Experiments and notes by Pranav Auti.",
  "/lab",
);

export default function LabPage() {
  return (
    <main id="main" className={styles.main}>
      <header className={styles.head}>
        <h1 className={styles.title}>Lab</h1>
        <p className={styles.lede}>Experiments and notes. Nothing here yet that I&apos;d stand behind.</p>
      </header>

      <div className={`${styles.section} ${styles.prose}`}>
        <p>
          The closest thing to a lab notebook right now is NetForge&apos;s troubleshooting log. Its first entry, T-001,
          is about Colima quietly rewriting the global Docker context, and you can{" "}
          <Link href="/work/netforge#t-001" className={styles.link}>
            read it on the NetForge page
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
