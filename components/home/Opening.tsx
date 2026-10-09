import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";
import { CONTACT } from "@/lib/site";
import { RESUME_HREF } from "@/lib/resume";
import { SafeToSpendCard } from "@/components/work/atlas/AtlasMaterial";
import KyushuMap from "@/components/work/argus/KyushuMap";

const ARGUS_TILE = { x: 760, y: 1000, w: 760, h: 570 };

export default function Opening() {
  return (
    <section aria-labelledby="name" className={`${styles.wrap} ${styles.grid} ${styles.opening}`}>
      <div className={styles.intro}>
        <h1 id="name" className={styles.name}>
          Pranav Auti
        </h1>
        <p className={styles.role}>
          Software engineer and MS Computer Science student at Stevens Institute of Technology. Looking for
          internships in backend and full-stack engineering, infrastructure and networking, and data and ML.
        </p>
        <p className={styles.statement}>
          I like building the part where an idea stops being a diagram and starts behaving like a real system.
        </p>
        <ul className={styles.actions}>
          <li>
            <a href="#work" className={`${styles.link} ${styles.primary}`}>
              Selected work
            </a>
          </li>
          <li>
            <a href={RESUME_HREF} className={styles.link}>
              Résumé
            </a>
          </li>
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
            <a href={`mailto:${CONTACT.email}`} className={styles.link}>
              Email
            </a>
          </li>
        </ul>
      </div>

      <div className={styles.portrait}>
        <Image
          src="/pranav-auti.jpg"
          alt="Pranav Auti"
          width={428}
          height={530}
          priority
          sizes="(max-width: 599px) 104px, (max-width: 999px) 30vw, 300px"
        />
      </div>

      <Link href="/work/netforge" className={styles.net} aria-label="NetForge: the planned link between routers R1 and R2, 10.0.12.0/31">
        <span>R1 · 10.0.12.0</span>
        <span className={styles.netLine} aria-hidden />
        <span>10.0.12.1 · R2</span>
        <span className={styles.netCaption}>NetForge · a planned /31 link between two routers</span>
      </Link>

      <div className={styles.rail}>
        <Link href="/work/atlas" className={`${styles.piece} ${styles.pieceAtlas}`} aria-label="Atlas: safe-to-spend preview screen, sample data">
          <SafeToSpendCard compact />
          <span className={styles.cap}>Atlas · preview screen with sample data</span>
        </Link>

        <Link href="/work/mailguard" className={`${styles.piece} ${styles.pieceMail}`} aria-label="MailGuard: a rule catches a synthetic newsletter and the model call is skipped">
          <span className={styles.mailFlow}>
            <span>digest@newsletter.example.com</span>
            <span className={styles.mailRule}>unsubscribe_or_bulk_header</span>
            <span className={styles.mailSkipped}>model call</span>
          </span>
          <span className={styles.cap}>MailGuard · a rule decides, the model is skipped</span>
        </Link>

        <Link href="/work/argus" className={`${styles.piece} ${styles.pieceArgus}`} aria-label="ARGUS: the 2026 Kyushu earthquake and nearby supplier plants">
          <span className={styles.argusTile} style={{ display: "block" }}>
            <KyushuMap crop={ARGUS_TILE} labels="event" title="Kumamoto, Japan: the 2026 epicentre and nearby supplier plants" />
          </span>
          <span className={styles.cap}>ARGUS · Kyushu, M6.8, and the plants around it</span>
        </Link>
      </div>
    </section>
  );
}
