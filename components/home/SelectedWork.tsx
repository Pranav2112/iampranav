import Link from "next/link";
import styles from "./home.module.css";
import { WORK, type Work } from "@/content/work";
import { LedgerSlice, SafeToSpendCard } from "@/components/work/atlas/AtlasMaterial";
import Topology from "@/components/work/netforge/Topology";
import MailTrace from "@/components/work/mailguard/MailTrace";
import KyushuMap from "@/components/work/argus/KyushuMap";

function Facts({ w }: { w: Work }) {
  return (
    <dl className={styles.facts}>
      <dt>Status</dt>
      <dd>{w.status}</dd>
      <dt>Stack</dt>
      <dd>{w.stack}</dd>
    </dl>
  );
}

function View({ w }: { w: Work }) {
  return (
    <Link href={`/work/${w.slug}`} className={styles.view}>
      View {w.name} <span aria-hidden>→</span>
    </Link>
  );
}

export default function SelectedWork() {
  const { atlas, netforge, mailguard, argus } = WORK;
  return (
    <section id="work" aria-labelledby="work-title" className={styles.section}>
      <div className={styles.wrap}>
        <h2 id="work-title" className={styles.sectionTitle}>
          Selected work
        </h2>
      </div>

      <article aria-labelledby="atlas-title" className={`${styles.wrap} ${styles.grid} ${styles.atlas}`}>
        <div className={styles.atlasHead}>
          <h3 id="atlas-title" className={`${styles.projectName} ${styles.atlasName}`}>
            {atlas.name}
          </h3>
          <p className={styles.lede}>
            {atlas.line} The goal is to answer one question: can I spend this without messing up rent or my card
            payment?
          </p>
          <Facts w={atlas} />
          <View w={atlas} />
        </div>

        <div className={styles.atlasSees}>
          <p className={styles.colLabel}>
            What you see <span>· designed, not yet computed</span>
          </p>
          <SafeToSpendCard compact />
        </div>

        <div className={styles.atlasTrue}>
          <p className={styles.colLabel}>
            What has to be true underneath <span>· built</span>
          </p>
          <LedgerSlice />
        </div>

        <div className={styles.lists}>
          <div className={styles.built}>
            <h4 className={styles.colLabel}>Built</h4>
            <ul>
              <li>Money stored as exact decimals. It never passes through a float.</li>
              <li>Corrections are void-and-replace. Nothing in the ledger is erased.</li>
              <li>Idempotent writes, so a retried request can&apos;t post twice.</li>
              <li>Recurring bills and income with month-end and business-day rules.</li>
              <li>About 800 API tests, Playwright and accessibility checks, all in CI.</li>
            </ul>
          </div>
          <div className={styles.notBuilt}>
            <h4 className={styles.colLabel}>Not built yet</h4>
            <ul>
              <li>Forecasting and the safe-to-spend calculation</li>
              <li>Recommendations</li>
              <li>Deployment</li>
            </ul>
          </div>
        </div>
      </article>

      <article aria-labelledby="netforge-title" className={`${styles.wrap} ${styles.grid} ${styles.netforge}`}>
        <div className={styles.netHead}>
          <h3 id="netforge-title" className={`${styles.projectName} ${styles.netName}`}>
            {netforge.name}
          </h3>
          <p className={styles.lede}>{netforge.line}</p>
          <div className={styles.foundation}>
            <p>Built in Phase 0: the machine the lab will run on.</p>
            <p className={styles.chain}>
              <span>macOS</span>
              <span>Colima VM, 4 vCPU / 6 GiB</span>
              <span>Docker</span>
              <span>make doctor · CI</span>
            </p>
            <p className={styles.muted} style={{ marginTop: 12 }}>
              Field note T-001: Colima silently rewrote the global Docker context. Found, fixed and verified.
            </p>
          </div>
          <Facts w={netforge} />
          <View w={netforge} />
        </div>
        <figure className={styles.netDrawing}>
          <Topology />
          <figcaption className={styles.legend}>
            <span>Planned: routers, eBGP sessions, /31 links</span>
          </figcaption>
        </figure>
      </article>

      <div className={`${styles.wrap} ${styles.grid} ${styles.pair}`}>
        <article aria-labelledby="mailguard-title" className={styles.mailguard}>
          <h3 id="mailguard-title" className={`${styles.projectName} ${styles.smallName}`}>
            {mailguard.name}
          </h3>
          <p className={styles.lede}>{mailguard.line}</p>
          <div className={styles.mailMaterial}>
            <MailTrace />
          </div>
          <Facts w={mailguard} />
          <View w={mailguard} />
        </article>

        <article aria-labelledby="argus-title" className={styles.argus}>
          <h3 id="argus-title" className={`${styles.projectName} ${styles.smallName}`}>
            {argus.name}
          </h3>
          <p className={styles.lede}>{argus.line} Not a production insurance tool.</p>
          <div className={styles.argusMap}>
            <KyushuMap
              crop={{ x: 330, y: 250, w: 1750, h: 1400 }}
              title="Kyushu: the 2026 M6.8 epicentre, the Aisin and Renesas plants near it, and the Toyota plant they supply" />
          </div>
          <Facts w={argus} />
          <View w={argus} />
        </article>
      </div>
    </section>
  );
}
