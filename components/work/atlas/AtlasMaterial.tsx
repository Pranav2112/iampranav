import styles from "./atlas.module.css";

/*
 * Atlas "maya" preview scenario, rendered with Atlas's own tokens and type.
 * Sample data: Atlas itself labels these screens "Preview data" until its engine exists.
 */

export const BREAKDOWN = [
  { label: "Available", amount: "$550" },
  { label: "Reserved before Oct 9", amount: "−$324" },
  { label: "Rent (Oct 1)", amount: "−$240", sub: true },
  { label: "Phone (Oct 5)", amount: "−$84", sub: true },
  { label: "Minimum buffer", amount: "−$100" },
];

export const UP_NEXT = [
  { when: "Thursday", what: "Rent", amount: "−$240" },
  { when: "Oct 5", what: "Phone", amount: "−$84" },
  { when: "Oct 9", what: "Paycheck", amount: "+$636", income: true },
  { when: "Oct 10", what: "Discover payment", amount: "−$140" },
];

export function PreviewTag() {
  return <span className={styles.preview}>Preview scenario · sample data</span>;
}

/** The headline of Atlas's Home screen. */
export function SafeToSpendCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${styles.ui} ${styles.card}`}>
      <PreviewTag />
      <p className={styles.overline} style={{ marginTop: 16 }}>
        Safe to spend
      </p>
      <p className={styles.amount} style={{ marginTop: 6, fontSize: compact ? 44 : undefined }}>
        $126
      </p>
      <p className={styles.callout} style={{ marginTop: 10 }}>
        You&apos;re covered until October 9.
      </p>
      <p className={styles.foot} style={{ marginTop: 4 }}>
        $550 available · $424 protected
      </p>
      {!compact && (
        <div style={{ marginTop: 16 }}>
          {BREAKDOWN.map((r) => (
            <div key={r.label} className={`${styles.row} ${r.sub ? styles.sub : ""}`}>
              <span>{r.label}</span>
              <span>{r.amount}</span>
            </div>
          ))}
          <div className={`${styles.row} ${styles.total}`}>
            <span>Safe to spend</span>
            <span>$126</span>
          </div>
        </div>
      )}
    </div>
  );
}

const LEDGER_ROWS: { i: string; f: string; note?: string; out?: boolean }[] = [
  { i: "−999", f: "", note: "void, not posted", out: true },
  { i: "−12", f: ".34", note: "pending, not posted", out: true },
  { i: "1000", f: ".0000", note: "opening balance" },
  { i: "−54", f: ".2000" },
  { i: "−0", f: ".0001" },
];

/**
 * The posted balance assertion from Atlas's transactions repository tests
 * (apps/api/tests/test_transactions_repository.py).
 */
export function LedgerSlice({ notes = true }: { notes?: boolean }) {
  return (
    <figure className={styles.ledger}>
      <div className={styles.grid}>
        {LEDGER_ROWS.map((r) => (
          <div key={r.i + r.f} className={`${styles.lrow} ${r.out ? styles.out : ""}`}>
            <span className={styles.int}>{r.i}</span>
            <span className={styles.frac}>{r.f}</span>
            <span className={styles.note}>{notes ? r.note : null}</span>
          </div>
        ))}
        <div className={styles.lrow}>
          <span className={`${styles.int} ${styles.big}`}>945</span>
          <span className={`${styles.big} ${styles.bigFrac}`}>.7999</span>
        </div>
      </div>
      <span className={styles.rule} />
      <figcaption>
        <code className={styles.assert}>assert on_day[account].posted == Decimal(&quot;945.7999&quot;)</code>
      </figcaption>
    </figure>
  );
}
