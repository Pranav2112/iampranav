import styles from "./mail.module.css";
import { MESSAGES, evaluate } from "./rules";

/** One synthetic newsletter through MailGuard's rule gate: the rule fires, the model is not called. */
export default function MailTrace() {
  const m = MESSAGES[0];
  const a = evaluate(m);
  const rule = a.fired[0];
  return (
    <figure className={`${styles.mg} ${styles.trace}`} aria-label="A synthetic newsletter passing through MailGuard's rules">
      <div className={styles.msg}>
        <p className={styles.dim}>From: {m.from}</p>
        <p className={styles.dim}>Subject: {m.subject}</p>
        <p style={{ overflowWrap: "anywhere" }}>{m.headers?.[0]}</p>
      </div>
      <div className={styles.step}>
        <p className={`${styles.name} ${styles.mono}`}>{rule.name}</p>
        <p className={styles.dim}>rule fired</p>
      </div>
      <div className={styles.step}>
        <p className={styles.name}>
          {a.category} · importance {String(rule.adjustment).replace("-", "−")}
        </p>
        <p className={`${styles.dim} ${styles.mono}`}>force_skip_ai</p>
      </div>
      <div className={`${styles.step} ${styles.skipped}`}>
        <p className={`${styles.dim} ${styles.struck}`}>model</p>
        <p className={styles.dim}>not called</p>
      </div>
      <figcaption className={styles.dim} style={{ fontSize: 13, marginTop: 8 }}>
        Synthetic message.
      </figcaption>
    </figure>
  );
}
