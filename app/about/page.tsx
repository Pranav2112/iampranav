import type { Metadata } from "next";
import Image from "next/image";
import styles from "@/components/site/page.module.css";
import { EDUCATION, EXPERIENCE } from "@/content/about";
import { CONTACT, pageMeta } from "@/lib/site";
import { RESUME_PDF } from "@/lib/resume";

export const metadata: Metadata = pageMeta(
  "About",
  "Pranav Auti is an MS Computer Science student at Stevens Institute of Technology, interested in backend systems, infrastructure and networking, and product engineering.",
  "/about",
);

export default function AboutPage() {
  return (
    <main id="main" className={styles.main}>
      <header className={`${styles.head} ${styles.grid}`} style={{ rowGap: 32 }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <h1 className={styles.title}>About</h1>
        </div>
        <div className={`${styles.prose} ${styles.aboutText}`}>
          <p>
            I&apos;m Pranav, a software engineer and MS Computer Science student at Stevens Institute of Technology in
            Hoboken, New Jersey.
          </p>
          <p>
            I like product work, but the part I keep coming back to is underneath it: how money is stored so it
            can&apos;t drift, what happens when a request is retried, how a packet finds another path when a link
            fails, when a rule is better than a model.
          </p>
          <p className={styles.muted}>
            I&apos;m looking for software engineering internships in backend and full-stack work, infrastructure and
            networking, or data and ML systems.
          </p>
        </div>
        <div className={styles.aboutPortrait}>
          <Image
            src="/pranav-auti.jpg"
            alt="Pranav Auti"
            width={428}
            height={530}
            sizes="280px"
            style={{ width: "100%", height: "auto", filter: "grayscale(1) contrast(1.05)" }}
          />
        </div>
      </header>

      <section aria-labelledby="experience" className={styles.section}>
        <h2 id="experience" className={styles.h2}>
          Experience
        </h2>
        {EXPERIENCE.map((r) => (
          <div key={r.title} className={`${styles.grid} ${styles.entry}`}>
            <h3 className={styles.entryName} style={{ fontSize: 18 }}>
              {r.title}
            </h3>
            <p className={styles.entryBody}>{r.summary}</p>
            <div className={styles.entryMeta}>
              <p>{r.org}</p>
              <p>
                {r.place} · {r.dates}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section aria-labelledby="education" className={styles.section}>
        <h2 id="education" className={styles.h2}>
          Education
        </h2>
        {EDUCATION.map((e) => (
          <div key={e.degree} className={`${styles.grid} ${styles.entry}`}>
            <h3 className={styles.entryName} style={{ fontSize: 18 }}>
              {e.degree}
            </h3>
            <p className={styles.entryBody}>{e.school}</p>
            <p className={styles.entryMeta}>{e.dates}</p>
          </div>
        ))}
      </section>

      <section id="resume" aria-labelledby="resume-title" className={styles.section} style={{ scrollMarginTop: 24 }}>
        <h2 id="resume-title" className={styles.h2}>
          Résumé
        </h2>
        <div className={styles.prose} style={{ marginTop: 20 }}>
          {RESUME_PDF ? (
            <p>
              <a href={RESUME_PDF} className={styles.link}>
                Download my résumé (PDF)
              </a>
            </p>
          ) : (
            <p>
              My current résumé is available by email:{" "}
              <a href={`mailto:${CONTACT.email}?subject=R%C3%A9sum%C3%A9`} className={styles.link}>
                {CONTACT.email}
              </a>
              .
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
