import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import styles from "@/components/site/page.module.css";
import a from "@/components/work/atlas/atlas.module.css";
import c from "@/components/work/atlas/case.module.css";
import { CaseHeader, NextProject } from "@/components/work/CaseParts";
import { LedgerSlice, SafeToSpendCard, UP_NEXT } from "@/components/work/atlas/AtlasMaterial";
import { WORK } from "@/content/work";

const work = WORK.atlas;

export const metadata: Metadata = pageMeta(
  "Atlas",
  "Atlas is personal finance software built ledger-first: exact decimal money, void-and-replace corrections, idempotent writes and recurrence, with forecasting still to come.",
  "/work/atlas",
);

const PAIRS: { sees: React.ReactNode; true: React.ReactNode; built: boolean }[] = [
  {
    sees: (
      <span className={`${a.ui} ${a.card} ${c.chip}`}>
        <span className={a.muted}>Available</span> <strong>$550</strong>
      </span>
    ),
    true: "Balances are sums of exact decimals. Voided and pending rows don't count toward what's posted.",
    built: true,
  },
  {
    sees: (
      <span className={`${a.ui} ${a.card} ${c.chip}`}>
        <span className={a.muted}>Oct 1</span> Rent <strong>−$240</strong>
      </span>
    ),
    true: "A recurring bill lands on a real date: clamped to the end of short months, moved off weekends, and still identified by the date it was scheduled for.",
    built: true,
  },
  {
    sees: (
      <span className={`${a.ui} ${a.card} ${c.chip}`}>
        Edit transaction <span className={a.muted}>−$54.20 → −$45.20</span>
      </span>
    ),
    true: "A financial edit voids the original and links a replacement. History is never rewritten.",
    built: true,
  },
  {
    sees: (
      <span className={`${a.ui} ${a.card} ${c.chip}`}>
        Save <span className={a.muted}>tapped twice on a slow connection</span>
      </span>
    ),
    true: "The retry carries the same idempotency key, so it replays the first result instead of posting again.",
    built: true,
  },
  {
    sees: (
      <span className={`${a.ui} ${a.card} ${c.chip}`}>
        <span className={a.muted}>Safe to spend</span> <strong>$126</strong>
      </span>
    ),
    true: "Projecting income, bills and a buffer forward to the next paycheck. The engine's interfaces exist; the calculations don't yet.",
    built: false,
  },
];

const RECURRENCE = [
  { nominal: "Sat, Jan 31", effective: "Fri, Jan 30", why: "weekend, moved earlier" },
  { nominal: "Sat, Feb 28", effective: "Fri, Feb 27", why: "clamped to month end, then moved earlier" },
  { nominal: "Tue, Mar 31", effective: "Tue, Mar 31", why: "" },
  { nominal: "Thu, Apr 30", effective: "Thu, Apr 30", why: "clamped to month end" },
  { nominal: "Sun, May 31", effective: "Fri, May 29", why: "weekend, moved earlier" },
];

const CI = [
  "API: ruff, import contracts, mypy --strict, pytest against PostgreSQL 16",
  "Web and packages: prettier, eslint, tsc, vitest, verified build",
  "Web end-to-end: Playwright, axe accessibility checks, visual comparisons",
  "End-to-end smoke test against real Clerk sign-in",
  "Generated API types are checked for freshness",
  "Secret scan",
];

const NOT_BUILT = [
  "Safe-to-spend and the cash-flow forecast",
  "Paycheck allocation",
  "Affordability of a specific purchase",
  "Risk assessment and recommendations",
  "Goal scheduling",
  "Credit utilization and payment optimization",
];

export default function AtlasPage() {
  return (
    <main id="main" className={styles.main}>
      <CaseHeader
        work={work}
        lede="Personal finance software, built ledger-first. It's meant to answer one question: can I spend this without messing up rent or my card payment? That answer is only as good as the ledger underneath it."
        aside={
          <>
            <SafeToSpendCard />
            <p className={`${styles.small} ${styles.muted}`} style={{ marginTop: 10 }}>
              Atlas&apos;s Home screen, in its preview scenario. Sample data, not a real account.
            </p>
          </>
        }
      />

      <section aria-labelledby="layers" className={styles.section}>
        <h2 id="layers" className={styles.h2}>
          What you see, and what has to be true underneath
        </h2>
        <div className={`${styles.grid} ${styles.split}`}>
          <div className={styles.splitText}>
            <div className={styles.prose}>
              <p>
                The interface is designed down to the copy. Every number on it is a promise about the data below,
                so I built the data first: accounts, transactions, transfers, card payments and statements, bills,
                income and goals.
              </p>
              <p>
                The engine that turns all of that into a recommendation is the next phase. Until it exists, screens that
                depend on it say so.
              </p>
            </div>
          </div>
          <div className={styles.splitMaterial} style={{ display: "grid", gap: 16, justifyItems: "start" }}>
            <div className={`${a.ui} ${a.card}`} style={{ width: "100%", maxWidth: 420 }}>
              <p className={a.overline}>Up next</p>
              {UP_NEXT.map((u) => (
                <div key={u.what} className={a.row}>
                  <span>
                    <span className={a.muted}>{u.when}</span> · {u.what}
                  </span>
                  <span className={u.income ? a.positive : undefined}>{u.amount}</span>
                </div>
              ))}
            </div>
            <p className={`${styles.small} ${styles.muted}`}>
              &ldquo;Assumes Paycheck on Oct 9 (+$636, expected).&rdquo; The forecast that would produce this list
              is not built; the list is part of the preview.
            </p>
          </div>
        </div>

        <div className={c.pairs}>
          <div className={c.pair} aria-hidden style={{ paddingBlock: "14px 0", borderBottom: 0 }}>
            <span className={`${c.sees} ${c.colHead}`}>On screen</span>
            <span className={c.arrow} />
            <span className={`${c.true} ${c.colHead}`}>Has to be true</span>
            <span className={`${c.state} ${c.colHead}`}>Status</span>
          </div>
          <ul aria-label="Interface elements and the guarantees behind them">
            {PAIRS.map((p, i) => (
              <li key={i} className={c.pair}>
                <span className={c.sees}>{p.sees}</span>
                <span className={c.arrow} aria-hidden>
                  →
                </span>
                <p className={c.true}>{p.true}</p>
                <span className={`${c.state} ${p.built ? "" : c.stateNot}`}>{p.built ? "Built" : "Not built yet"}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="decisions" className={styles.section}>
        <h2 id="decisions" className={styles.h2}>
          Decisions
        </h2>

        <div className={`${styles.grid} ${styles.decision}`}>
          <h3>Money never touches a float</h3>
          <div>
            <div className={styles.prose}>
              <p>
                Amounts are stored as <code>NUMERIC(19, 4)</code> and come back as Python <code>Decimal</code>, exactly.
                The ledger tests assert balances to the ten-thousandth of a dollar, including a posting of a hundredth of a
                cent, which binary floating point can&apos;t represent exactly.
              </p>
            </div>
            <div style={{ marginTop: 28, maxWidth: 520 }}>
              <LedgerSlice />
            </div>
          </div>
        </div>

        <div className={`${styles.grid} ${styles.decision}`}>
          <h3>Corrections are void-and-replace</h3>
          <div>
            <div className={styles.prose}>
              <p>
                Deleting a transaction voids it in place. A financial change, like a corrected amount, voids the
                original with reason <code>replaced</code> and writes a new row pointing back at it. A unique index makes sure a
                row can be superseded only once.
              </p>
            </div>
            <div className={`${a.ui} ${a.card}`} style={{ marginTop: 24, padding: 8, maxWidth: 620 }}>
              <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Corrected transaction rows">
                <table className={c.uiTable}>
                  <caption className={styles.srOnly}>A corrected transaction: the original is voided and a replacement supersedes it</caption>
                  <thead>
                    <tr>
                      <th scope="col">Row</th>
                      <th scope="col">Amount</th>
                      <th scope="col">void_reason</th>
                      <th scope="col">supersedes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={c.voided}>
                      <td>t1</td>
                      <td>−54.2000</td>
                      <td className={c.mono}>replaced</td>
                      <td className={c.mono}>·</td>
                    </tr>
                    <tr>
                      <td>t2</td>
                      <td>−45.2000</td>
                      <td className={c.mono}>·</td>
                      <td className={c.mono}>t1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className={`${styles.small} ${styles.muted}`} style={{ marginTop: 10 }}>
              Illustrative rows.
            </p>
          </div>
        </div>

        <div className={`${styles.grid} ${styles.decision}`}>
          <h3>A retried write can&apos;t post twice</h3>
          <div>
            <div className={styles.prose}>
              <p>
                Every financial write takes an <code>Idempotency-Key</code>. The key is claimed with an{" "}
                <code>INSERT … ON CONFLICT DO NOTHING</code> on <code>(user, key)</code> before the change happens, so
                concurrent duplicates wait instead of racing. Keys and request fingerprints are never logged.
              </p>
            </div>
            <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Idempotency responses" style={{ marginTop: 24 }}>
              <table className={styles.table} style={{ maxWidth: 680 }}>
                <caption className={styles.srOnly}>How Atlas answers repeated requests</caption>
                <thead>
                  <tr>
                    <th scope="col">Request</th>
                    <th scope="col">Response</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>First request with key k</td>
                    <td>The write happens</td>
                  </tr>
                  <tr>
                    <td>Same key, same request</td>
                    <td>
                      The first response, replayed, with <code className={styles.code}>Idempotent-Replayed: true</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Same key, different request</td>
                    <td>409, refused: the key was reused</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className={`${styles.grid} ${styles.decision}`}>
          <h3>Recurrence keeps two dates</h3>
          <div>
            <div className={styles.prose}>
              <p>
                A bill due on the 31st has a nominal date, which is its identity, and an effective date, which is when
                money actually moves. Generation seeks straight to the requested window instead of walking forward
                from the first occurrence, with two days of padding so a weekend shift across the window edge isn&apos;t
                lost.
              </p>
            </div>
            <div className={`${a.ui} ${a.card}`} style={{ marginTop: 24, padding: 8, maxWidth: 620 }}>
              <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Recurrence dates">
                <table className={c.uiTable}>
                  <caption className={styles.srOnly}>
                    Monthly on the 31st, moved to the previous business day, January to May 2026
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Nominal</th>
                      <th scope="col">Effective</th>
                      <th scope="col">Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECURRENCE.map((r) => (
                      <tr key={r.nominal}>
                        <td>{r.nominal}</td>
                        <td className={r.nominal !== r.effective ? c.shift : undefined}>{r.effective}</td>
                        <td className={a.muted}>{r.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className={`${styles.small} ${styles.muted}`} style={{ marginTop: 10 }}>
              Monthly on the 31st, previous business day, 2026.
            </p>
          </div>
        </div>

        <div className={`${styles.grid} ${styles.decision}`}>
          <h3>Identity and the browser</h3>
          <div className={styles.prose}>
            <p>
              Sign-in is handled by Clerk. The web app runs under a strict, nonce-based Content Security Policy, which
              has its own end-to-end test.
            </p>
          </div>
        </div>

        <div className={`${styles.grid} ${styles.decision}`}>
          <h3>Testing and CI</h3>
          <div>
            <div className={styles.prose}>
              <p>
                About 800 API tests run against a real PostgreSQL, not a mock. About 100 Playwright tests cover the web
                app, including accessibility checks with axe. Each pull request runs:
              </p>
            </div>
            <ul className={c.ci}>
              {CI.map((j) => (
                <li key={j}>{j}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="not-built" className={styles.section}>
        <h2 id="not-built" className={styles.h2}>
          Not built yet
        </h2>
        <div className={`${styles.grid} ${styles.split}`}>
          <div className={styles.splitText}>
            <p className={styles.prose}>
              The decision engine is the next phase. Its functions are stubbed out and raise{" "}
              <code className={styles.code}>NotImplementedError</code>, and every screen that depends on them carries a
              &ldquo;Preview data&rdquo; label.
            </p>
          </div>
          <ul className={`${styles.list} ${styles.planned} ${styles.splitMaterial}`}>
            {NOT_BUILT.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="status" className={styles.section}>
        <h2 id="status" className={styles.h2}>
          Status
        </h2>
        <div className={styles.prose} style={{ marginTop: 20 }}>
          <p>
            The financial data layer is done, verified and frozen. Recurrence and a deterministic snapshot for the
            engine to read from are in progress. Atlas is private and not deployed, so there&apos;s no public code or
            demo yet.
          </p>
        </div>
      </section>

      <NextProject work={work} />
    </main>
  );
}
