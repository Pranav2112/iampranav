import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import styles from "@/components/site/page.module.css";
import { ARCHIVE } from "@/content/archive";

export const metadata: Metadata = pageMeta(
  "Archive",
  "Smaller and earlier projects by Pranav Auti: Job Tracker, FinSight AI, MaternaSense, AvaxPay and FlashBet.",
  "/archive",
);

export default function ArchivePage() {
  return (
    <main id="main" className={styles.main}>
      <header className={styles.head}>
        <h1 className={styles.title}>Archive</h1>
        <p className={styles.lede}>Smaller projects, hackathon builds and things I made to learn something.</p>
      </header>

      <ul className={styles.section} aria-label="Projects">
        {ARCHIVE.map((p) => (
          <li key={p.name} className={`${styles.grid} ${styles.entry}`}>
            <h2 className={styles.entryName}>{p.name}</h2>
            <div className={styles.entryBody}>
              <p>{p.summary}</p>
              {p.note && <p className={`${styles.small} ${styles.muted}`} style={{ marginTop: 6 }}>{p.note}</p>}
            </div>
            <div className={styles.entryMeta}>
              <p>
                {p.kind} · {p.year}
              </p>
              <p>{p.stack}</p>
              <a href={p.code} className={styles.link} style={{ display: "inline-flex", minHeight: 44, alignItems: "center" }}>
                Code on GitHub<span className={styles.srOnly}> for {p.name}</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
