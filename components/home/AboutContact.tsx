import Link from "next/link";
import styles from "./home.module.css";
import { EDUCATION, EXPERIENCE } from "@/content/about";
import { CONTACT } from "@/lib/site";
import { RESUME_HREF } from "@/lib/resume";

export function AboutShort() {
  return (
    <section aria-labelledby="about-title" className={`${styles.wrap} ${styles.section}`}>
      <h2 id="about-title" className={styles.sectionTitle}>
        About
      </h2>
      <div className={`${styles.grid} ${styles.about}`}>
        <div className={styles.aboutText}>
          <p>
            I&apos;m in the MS Computer Science program at Stevens. I&apos;m most interested in the layer under the
            interface: how data is stored, how requests fail and retry, how packets find a path.
          </p>
          <p className={styles.muted}>
            I&apos;ve also led a six-person development team and interned as a software developer at Skopus AI.
          </p>
          <Link href="/about" className={styles.view}>
            More about me <span aria-hidden>→</span>
          </Link>
        </div>
        <div className={styles.roles}>
          {EXPERIENCE.map((r) => (
            <div key={r.title}>
              <p className={styles.roleTitle}>{r.title}</p>
              <p>{r.org}</p>
              <p className={styles.label}>{r.dates}</p>
            </div>
          ))}
          <div>
            <p className={styles.roleTitle}>{EDUCATION[0].degree}</p>
            <p>{EDUCATION[0].school}</p>
            <p className={styles.label}>{EDUCATION[0].dates}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className={`${styles.wrap} ${styles.section}`}>
      <h2 id="contact-title" className={styles.sectionTitle}>
        Contact
      </h2>
      <div className={styles.contact}>
        <a href={`mailto:${CONTACT.email}`} className={`${styles.email} ${styles.link}`}>
          {CONTACT.email}
        </a>
        <ul className={styles.contactLinks}>
          <li>
            <a href={CONTACT.github} className={styles.link} rel="me">
              GitHub
            </a>
          </li>
          <li>
            <a href={CONTACT.linkedin} className={styles.link} rel="me">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={RESUME_HREF} className={styles.link}>
              Résumé
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
