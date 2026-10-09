import Link from "next/link";
import styles from "@/components/site/page.module.css";
import { nextWork, type Work } from "@/content/work";

export function CaseHeader({
  work,
  lede,
  aside,
  children,
}: {
  work: Work;
  lede: string;
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className={`${styles.head} ${styles.grid} ${styles.caseHead}`}>
      <div className={styles.caseText}>
      <Link href="/#work" className={styles.back}>
        ← Selected work
      </Link>
      <h1 className={styles.title}>{work.name}</h1>
      <p className={styles.lede}>{lede}</p>
      <dl className={styles.facts}>
        <dt>Status</dt>
        <dd>{work.status}</dd>
        <dt>Stack</dt>
        <dd>{work.stack}</dd>
        <dt>Code</dt>
        <dd>
          {work.code ? (
            <a href={work.code} className={styles.link}>
              {work.code.replace("https://", "")}
            </a>
          ) : (
            "Private repository"
          )}
        </dd>
        {children}
      </dl>
      </div>
      {aside && <div className={styles.caseAside}>{aside}</div>}
    </header>
  );
}

export function NextProject({ work }: { work: Work }) {
  const next = nextWork(work.slug);
  return (
    <nav aria-label="Next project" className={styles.next}>
      <div>
        <p className={styles.muted}>Next project</p>
        <Link href={`/work/${next.slug}`} className={styles.nextLink}>
          {next.name} <span aria-hidden>→</span>
        </Link>
      </div>
      <Link href="/#work" className={styles.back}>
        Back to selected work
      </Link>
    </nav>
  );
}
