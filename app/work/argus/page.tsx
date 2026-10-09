import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import styles from "@/components/site/page.module.css";
import g from "@/components/work/argus/argus.module.css";
import { CaseHeader, NextProject } from "@/components/work/CaseParts";
import Explorer from "@/components/work/argus/Explorer";
import { WORK } from "@/content/work";

const work = WORK.argus;

export const metadata: Metadata = pageMeta(
  "ARGUS",
  "ARGUS is a hackathon prototype that traces how an earthquake travels through supplier relationships to the businesses that depend on them.",
  "/work/argus",
);

const RULES = [
  {
    name: "Quotes or nothing",
    text: "A model extracts claims from news articles. A claim is rejected unless its evidence quote appears in the article word for word (after whitespace and case normalization), or if it states a dollar amount, percentage, duration or probability. Rejections are counted in the interface.",
  },
  {
    name: "CONFIRMED / REPORTED",
    text: "A claim is confirmed if its source is tier 1 or 2, or if two or more independent publishers report the same plant and claim type. Otherwise it stays reported.",
  },
  {
    name: "PUBLIC_VERIFIED / INFERRED",
    text: "A real supplier link is verified only when some claim names both sides. Otherwise it's drawn as inferred, with a dashed line.",
  },
  {
    name: "CONFLICTING",
    text: "If an article's magnitude disagrees with the USGS, it's flagged and the USGS value is used.",
  },
  {
    name: "Three hops",
    text: "From the affected plants, a breadth-first search follows supplier links up to three hops to the insured accounts downstream.",
  },
  {
    name: "Dependency memory",
    text: "A link is marked as seen in 2016 when its upstream plant has a disruption claim from the 2016 Kumamoto earthquakes.",
  },
];

export default function ArgusPage() {
  return (
    <main id="main" data-world="argus" className={styles.main}>
      <CaseHeader
        work={work}
        lede="When an earthquake hits a region full of factories, the question for an insurer isn't only what was damaged. It's which insured businesses depend on a supplier that was. ARGUS is a hackathon prototype that traces that path."
        aside={
          <ol className={g.events}>
            <li>
              <p className={g.eventYear}>2016</p>
              <p>Kumamoto earthquakes, M7.0. Aisin and Renesas plants halt, and Toyota suspends domestic assembly lines for lack of their parts.</p>
            </li>
            <li>
              <p className={g.eventYear}>2026</p>
              <p>Kyushu earthquake, M6.8, from the USGS feed. ARGUS flags the links that broke last time.</p>
            </li>
          </ol>
        }
      >
        <dt>Scope</dt>
        <dd>A prototype, not a production insurance platform. Every insured account in it is synthetic.</dd>
      </CaseHeader>

      <section aria-labelledby="map" className={styles.section}>
        <h2 id="map" className={styles.h2}>
          Kyushu, 2026
        </h2>
        <p className={`${styles.prose} ${styles.muted}`} style={{ marginTop: 16 }}>
          The M6.8 Kyushu earthquake of July 2026, from the USGS feed, and the plants ARGUS tracks around it. Plant
          positions are approximate, to the city. Select a plant to see who depends on it.
        </p>
        <Explorer />
      </section>

      <section aria-labelledby="evidence" className={styles.section}>
        <h2 id="evidence" className={styles.h2}>
          The evidence model
        </h2>
        <p className={styles.h2big}>Every claim has to point at the sentence it came from.</p>
        <ul className={g.rules}>
          {RULES.map((r) => (
            <li key={r.name}>
              <p className={g.ruleName}>{r.name}</p>
              <p className={g.ruleText}>{r.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="built" className={styles.section}>
        <h2 id="built" className={styles.h2}>
          What was built
        </h2>
        <div className={`${styles.prose}`} style={{ marginTop: 20 }}>
          <p>
            A Next.js and TypeScript app with a live USGS feed of M4.5+ earthquakes, claim extraction from articles,
            the blast-radius search with unit tests, and a replay that steps through sources one at a time and shows
            which claim changed each tier.
          </p>
          <p>
            It also handles recovery: a separate Taiwan 2024 example walks an account from REVIEW NOW to MONITOR to
            RESOLVED as verified restart reports arrive.
          </p>
          <p className={styles.muted}>
            Built at a hackathon. The supplier links between real companies come from public reporting; the
            insured accounts downstream of them are invented for the demo.
          </p>
        </div>
      </section>

      <NextProject work={work} />
    </main>
  );
}
