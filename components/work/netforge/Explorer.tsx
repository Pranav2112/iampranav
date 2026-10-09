"use client";

import { useState } from "react";
import styles from "./netforge.module.css";
import Topology from "./Topology";
import { LINKS, ROUTERS, VIEW, addressOn, linksOf, type LinkId, type RouterId } from "./plan";

type Sel = RouterId | LinkId;

/** Shortest detour between a link's two ends when that link is down (unweighted BFS). */
function detour(id: LinkId): RouterId[] | null {
  const [from, to] = id.split("-") as [RouterId, RouterId];
  const prev = new Map<RouterId, RouterId | null>([[from, null]]);
  const queue: RouterId[] = [from];
  while (queue.length) {
    const r = queue.shift()!;
    if (r === to) break;
    for (const l of linksOf(r)) {
      if (l.id === id) continue;
      const n = l.a === r ? l.b : l.a;
      if (!prev.has(n)) {
        prev.set(n, r);
        queue.push(n);
      }
    }
  }
  if (!prev.has(to)) return null;
  const path: RouterId[] = [];
  for (let r: RouterId | null = to; r; r = prev.get(r) ?? null) path.unshift(r);
  return path;
}

export default function Explorer() {
  const [sel, setSel] = useState<Sel>("R1-R2");
  const isLink = sel.includes("-");

  return (
    <div className={styles.explorer}>
      <div className={styles.drawing}>
        <Topology selected={sel} down={isLink ? (sel as LinkId) : null} />
        <div className={styles.hits} role="group" aria-label="Routers and links">
          {(Object.keys(ROUTERS) as RouterId[]).map((r) => (
            <button
              key={r}
              type="button"
              className={styles.hit}
              style={{ left: `${(ROUTERS[r].x / VIEW.w) * 100}%`, top: `${(ROUTERS[r].y / VIEW.h) * 100}%` }}
              aria-pressed={sel === r}
              onClick={() => setSel(r)}
            >
              <span className={styles.srOnly}>
                Router {r}, AS{ROUTERS[r].asn}
              </span>
            </button>
          ))}
          {LINKS.map((l) => {
            const a = ROUTERS[l.a];
            const b = ROUTERS[l.b];
            return (
              <button
                key={l.id}
                type="button"
                className={styles.hit}
                style={{ left: `${((a.x + b.x) / 2 / VIEW.w) * 100}%`, top: `${((a.y + b.y) / 2 / VIEW.h) * 100}%` }}
                aria-pressed={sel === l.id}
                onClick={() => setSel(l.id)}
              >
                <span className={styles.srOnly}>
                  Link {l.a} to {l.b}, {l.subnet}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.panel} aria-live="polite">
        {isLink ? <LinkDetail id={sel as LinkId} /> : <RouterDetail id={sel as RouterId} />}
      </div>
    </div>
  );
}

function RouterDetail({ id }: { id: RouterId }) {
  const r = ROUTERS[id];
  return (
    <>
      <p className={styles.panelKicker}>Router · planned</p>
      <h3 className={styles.panelTitle}>
        {id} <span>AS{r.asn}</span>
      </h3>
      <dl className={styles.kv}>
        <dt>Loopback</dt>
        <dd>{r.loopback}</dd>
        <dt>Host LAN</dt>
        <dd>
          {r.lan}, {r.host} at {r.hostAddr}
        </dd>
        {linksOf(id).map((l) => {
          const peer = l.a === id ? l.b : l.a;
          return (
            <div key={l.id} style={{ display: "contents" }}>
              <dt>To {peer}</dt>
              <dd>
                {addressOn(l, id)}/31, eBGP with AS{ROUTERS[peer].asn}
              </dd>
            </div>
          );
        })}
      </dl>
    </>
  );
}

function LinkDetail({ id }: { id: LinkId }) {
  const l = LINKS.find((x) => x.id === id)!;
  const path = detour(id);
  return (
    <>
      <p className={styles.panelKicker}>Link · planned</p>
      <h3 className={styles.panelTitle}>
        {l.a}–{l.b} <span>{l.subnet}</span>
      </h3>
      <dl className={styles.kv}>
        <dt>{l.a}</dt>
        <dd>{addressOn(l, l.a)}</dd>
        <dt>{l.b}</dt>
        <dd>{addressOn(l, l.b)}</dd>
        <dt>Session</dt>
        <dd>
          eBGP, AS{ROUTERS[l.a].asn} ↔ AS{ROUTERS[l.b].asn}
        </dd>
      </dl>
      <p className={styles.failure}>
        If this link fails, {l.a} still reaches {l.b} through {path ? path.join(" → ") : "nothing"}. Every single-link failure in
        this design leaves a path; measuring how long BGP takes to find it is Phase 8.
      </p>
    </>
  );
}
