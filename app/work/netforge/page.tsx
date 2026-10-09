import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import styles from "@/components/site/page.module.css";
import n from "@/components/work/netforge/netforge.module.css";
import { CaseHeader, NextProject } from "@/components/work/CaseParts";
import Explorer from "@/components/work/netforge/Explorer";
import Progress from "@/components/work/netforge/Progress";
import { LINKS, PHASES, ROUTERS, addressOn, type RouterId } from "@/components/work/netforge/plan";
import { WORK } from "@/content/work";

const work = WORK.netforge;

export const metadata: Metadata = pageMeta(
  "NetForge",
  "NetForge is a network automation lab in progress: a dedicated Linux VM and tooling are built; four FRRouting routers running eBGP are planned.",
  "/work/netforge",
);

const BUILT = [
  "A dedicated Colima VM for the lab (4 vCPU, 6 GiB), started and stopped with make vm-up and make vm-down",
  "make doctor: checks Python, the Docker daemon, the Linux kernel and the VM's size before anything runs",
  "make check: formatting, lint, type-checking and unit tests; 10 tests so far",
  "CI on Ubuntu 24.04, with shell scripts checked by shellcheck",
  "Three architecture decision records",
];

const DECISIONS = [
  {
    t: "A separate VM for measurements",
    d: "Convergence and latency numbers are sensitive to CPU contention, and my default VM already runs other projects. The lab gets its own VM profile, selected per command, so results don't depend on unrelated workloads.",
  },
  {
    t: "containerlab, not Docker Compose",
    d: "A link failure should look like a real one to the routing stack: loss of carrier. With Compose a failure means disconnecting a network, which removes the interface instead. containerlab wires veth pairs directly between containers, so a failure is a link going down on one side. Phase 1 builds a small topology by hand first, so I understand what containerlab automates.",
  },
  {
    t: "Measure inside the VM",
    d: "Each docker exec round trip adds tens of milliseconds of variable latency. So the CLI only drives nodes, and timing comes from inside the lab: high-rate probes, route-monitor events and FRR logs, all on the VM's one clock. Every result records the VM size, kernel and architecture.",
  },
  {
    t: "/31 links and one AS per router",
    d: "A two-router link needs no network or broadcast address. With an AS per router every session is eBGP between neighbours, so no IGP is needed until Phase 11. R1 has two equal-length paths to R4, which makes BGP tie-breaking and ECMP visible.",
  },
];

export default function NetForgePage() {
  return (
    <main id="main" data-world="night" className={styles.main}>
      <CaseHeader
        work={work}
        lede="A lab for learning how networks route, fail and recover, by building the network myself: FRRouting routers in containers, eBGP between them, then breaking things on purpose and measuring what happens."
        aside={<Progress />}
      >
        <dt>Progress</dt>
        <dd>Phase 0 complete; Phases 1 to 12 planned. No network exists yet.</dd>
      </CaseHeader>

      <section aria-labelledby="topology" className={styles.section}>
        <h2 id="topology" className={styles.h2}>
          The planned network
        </h2>
        <p className={`${styles.prose} ${styles.muted}`} style={{ marginTop: 16 }}>
          Four routers, each its own autonomous system, in a square with one diagonal so that any single link can fail
          and leave a path. Everything in this drawing is planned. Select a router or a link.
        </p>
        <Explorer />

        <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Planned addressing" style={{ marginTop: 48 }}>
          <table className={styles.table}>
            <caption className={styles.srOnly}>Planned addressing</caption>
            <thead>
              <tr>
                <th scope="col">Link</th>
                <th scope="col">Subnet</th>
                <th scope="col">Lower end</th>
                <th scope="col">Higher end</th>
              </tr>
            </thead>
            <tbody>
              {LINKS.map((l) => (
                <tr key={l.id}>
                  <td>
                    {l.a}–{l.b}
                  </td>
                  <td className={styles.code}>{l.subnet}</td>
                  <td className={styles.code}>
                    {l.a} {addressOn(l, l.a)}
                  </td>
                  <td className={styles.code}>
                    {l.b} {addressOn(l, l.b)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className={styles.table} style={{ marginTop: 32 }}>
            <caption className={styles.srOnly}>Planned routers</caption>
            <thead>
              <tr>
                <th scope="col">Router</th>
                <th scope="col">AS</th>
                <th scope="col">Loopback</th>
                <th scope="col">Host LAN</th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(ROUTERS) as RouterId[]).map((r) => (
                <tr key={r}>
                  <td>{r}</td>
                  <td className={styles.code}>{ROUTERS[r].asn}</td>
                  <td className={styles.code}>{ROUTERS[r].loopback}</td>
                  <td className={styles.code}>{ROUTERS[r].lan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="built" className={styles.section}>
        <h2 id="built" className={styles.h2}>
          Built so far, and what comes next
        </h2>
        <div className={`${styles.grid} ${styles.split}`}>
          <div className={styles.splitText}>
            <h3 className={styles.small} style={{ fontWeight: 600 }}>
              Built in Phase 0
            </h3>
            <ul className={styles.list} style={{ marginTop: 12 }}>
              {BUILT.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <ol className={n.chain} aria-label="How the lab will be driven">
              <li>Python CLI</li>
              <li className={n.sep} aria-hidden>
                →
              </li>
              <li>Docker API</li>
              <li className={n.sep} aria-hidden>
                →
              </li>
              <li>Linux VM</li>
              <li className={n.sep} aria-hidden>
                →
              </li>
              <li className={n.planned}>containerlab + FRR (planned)</li>
            </ol>
          </div>
          <div className={styles.splitMaterial}>
            <h3 className={styles.small} style={{ fontWeight: 600 }}>
              Twelve phases planned
            </h3>
            <ol className={n.phases}>
              {PHASES.map((p) => (
                <li key={p.n} className={p.done ? n.doneRow : undefined}>
                  <span>{p.n}</span>
                  <span>
                    {p.scope}
                    {p.done ? " · done" : ""}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="t-001" className={styles.section}>
        <h2 id="t-001" className={styles.h2} style={{ scrollMarginTop: 24 }}>
          Field note T-001
        </h2>
        <p className={styles.h2big}>Colima silently rewrites the global Docker context</p>
        <div className={n.note}>
          <dl>
            <dt>Symptom</dt>
            <dd>
              After creating the lab&apos;s VM profile, <code className={styles.code}>docker context show</code>{" "}
              reported <code className={styles.code}>colima-netforge</code>. Every other project&apos;s Docker commands
              would now quietly target the lab VM.
            </dd>
            <dt>Investigation</dt>
            <dd>
              <code className={styles.code}>colima start</code> switches the global context to the new profile. My
              first fix saved the context before starting and restored it after, but a cold-start test showed the
              restore never ran: the Makefile exports <code className={styles.code}>DOCKER_CONTEXT</code>, which
              overrides the global setting, so the script was reading the override. Then{" "}
              <code className={styles.code}>colima stop</code> turned out to reset the global context to{" "}
              <code className={styles.code}>default</code>.
            </dd>
            <dt>Fix</dt>
            <dd>
              A wrapper script reads and writes the global context with{" "}
              <code className={styles.code}>DOCKER_CONTEXT</code> removed from its environment, around both start and
              stop.
            </dd>
            <dt>Verified</dt>
            <dd>
              Two full down-and-up cycles starting from context <code className={styles.code}>colima</code> left it as{" "}
              <code className={styles.code}>colima</code>. A container from another project kept running throughout.
            </dd>
          </dl>
        </div>
      </section>

      <section aria-labelledby="decisions" className={styles.section}>
        <h2 id="decisions" className={styles.h2}>
          Decisions
        </h2>
        {DECISIONS.map((d) => (
          <div key={d.t} className={`${styles.grid} ${styles.decision}`}>
            <h3>{d.t}</h3>
            <div className={styles.prose}>
              <p>{d.d}</p>
            </div>
          </div>
        ))}
      </section>

      <NextProject work={work} />
    </main>
  );
}
