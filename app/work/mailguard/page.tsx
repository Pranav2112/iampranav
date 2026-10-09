import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import styles from "@/components/site/page.module.css";
import { CaseHeader, NextProject } from "@/components/work/CaseParts";
import Simulator from "@/components/work/mailguard/Simulator";
import MailTrace from "@/components/work/mailguard/MailTrace";
import { WORK } from "@/content/work";

const work = WORK.mailguard;

export const metadata: Metadata = pageMeta(
  "MailGuard",
  "MailGuard is rule-first email triage for Gmail: deterministic rules run on every message and decide when a model call is unnecessary.",
  "/work/mailguard",
);

const ADRS = [
  ["0001", "Keep Google sign-in separate from the Gmail permission"],
  ["0002", "No Redis or Celery in the MVP; a job table in the database"],
  ["0003", "Rules run first and gate the model"],
  ["0004", "One interface for model providers"],
  ["0005", "Refresh tokens encrypted at rest"],
  ["0006", "Don't keep raw email bodies indefinitely"],
  ["0007", "Idempotent ingestion with two layers of unique constraints"],
  ["0008", "Sync with Gmail's history API; push notifications only trigger it"],
  ["0009", "Web Push notifications"],
  ["0010", "How the daily digest is generated"],
  ["0011", "Personalization from user feedback"],
];

export default function MailGuardPage() {
  return (
    <main id="main" className={styles.main}>
      <CaseHeader
        work={work}
        lede="An intelligence layer on top of Gmail that answers: what actually matters, and what do I need to do about it? Deterministic rules run first, and a model only sees the messages the rules can't settle."
        aside={<MailTrace />}
      >
        <dt>Evidence</dt>
        <dd>337 backend tests · 11 architecture decision records</dd>
      </CaseHeader>

      <section aria-labelledby="why" className={styles.section}>
        <h2 id="why" className={styles.h2}>
          Why rules first
        </h2>
        <div style={{ marginTop: 28 }}>
          <div className={styles.prose}>
            <p>
              Sending every email to a language model costs money and time, and shows private mail to a vendor that
              didn&apos;t need to see it. A large share of any inbox is obviously low-value anyway: promotions,
              newsletters, notifications.
            </p>
            <p>
              So a rule engine runs on every message. Where it&apos;s confident a message is low-value, it scores the
              message itself and the model is never called. Everything else goes to the model, whose answer is
              treated as one input, not the verdict.
            </p>
            <p>
              The rules are deliberately lopsided. A rule that says &ldquo;this needs the model&rdquo; beats any rule
              that says &ldquo;skip it&rdquo;, because a missed security alert is a worse failure than one unnecessary
              model call.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="flow" className={styles.section}>
        <h2 id="flow" className={styles.h2}>
          One message through the pipeline
        </h2>
        <p className={`${styles.prose} ${styles.muted}`} style={{ marginTop: 16 }}>
          These are MailGuard&apos;s real rules, weights and gate, ported to run in your browser. Finance extraction is
          left out. Pick a message.
        </p>
        <Simulator />
      </section>

      <section aria-labelledby="how" className={styles.section}>
        <h2 id="how" className={styles.h2}>
          How it&apos;s built
        </h2>
        <div className={`${styles.grid} ${styles.decision}`}>
          <h3>Rules are small, separate evaluators</h3>
          <div className={styles.prose}>
            <p>
              Each signal is an independent function that can be tested on its own, not one long conditional. Every
              message stores which signals fired, so the interface can show why something was scored the way it was.
            </p>
          </div>
        </div>
        <div className={`${styles.grid} ${styles.decision}`}>
          <h3>One function decides the score</h3>
          <div className={styles.prose}>
            <p>
              The priority engine is the only place a score is computed. It combines the rule adjustment, the
              model&apos;s importance and urgency when the model ran, and feedback-derived sender and category
              preferences. The model&apos;s own number is never shown on its own.
            </p>
          </div>
        </div>
        <div className={`${styles.grid} ${styles.decision}`}>
          <h3>The model sits behind an interface</h3>
          <div className={styles.prose}>
            <p>
              OpenAI is the first provider, behind an <code>AIProvider</code> interface. Its output is validated
              against a schema on every response.
            </p>
          </div>
        </div>
        <div className={`${styles.grid} ${styles.decision}`}>
          <h3>Ingestion is idempotent</h3>
          <div className={styles.prose}>
            <p>
              Gmail&apos;s push notifications arrive at least once, not exactly once, and a scheduled fallback sync can
              race them. Two database-level unique constraints handle it: one drops a notification that was already
              processed, one makes a message land once however it was fetched. No check-then-insert anywhere.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="adrs" className={styles.section}>
        <h2 id="adrs" className={styles.h2}>
          Decision records
        </h2>
        <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Decision records" style={{ marginTop: 16 }}>
          <table className={styles.table}>
            <caption className={styles.srOnly}>MailGuard&apos;s architecture decision records</caption>
            <tbody>
              {ADRS.map(([n, t]) => (
                <tr key={n}>
                  <td className={styles.code} style={{ width: "5em" }}>
                    {n}
                  </td>
                  <td>{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="status" className={styles.section}>
        <h2 id="status" className={styles.h2}>
          Status
        </h2>
        <div className={styles.prose} style={{ marginTop: 20 }}>
          <p>
            Built through its deployment phase: the deployment guide, scheduled jobs and container image are done.
            It hasn&apos;t been deployed yet: that needs cloud accounts, a domain and a configured Google OAuth consent
            screen. The repository is private.
          </p>
          <p className={styles.muted}>
            Stack: FastAPI, SQLAlchemy and Alembic on PostgreSQL; a Next.js front end; the Gmail API over OAuth.
          </p>
        </div>
      </section>

      <NextProject work={work} />
    </main>
  );
}
