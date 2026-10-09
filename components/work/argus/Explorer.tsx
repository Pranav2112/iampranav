"use client";

import { useState } from "react";
import styles from "./argus.module.css";
import KyushuMap from "./KyushuMap";
import { EDGES, ORIGIN_TEXT, PLANTS } from "./data";
import type { FacilityId } from "@/lib/kyushu";

export default function Explorer() {
  const [sel, setSel] = useState<FacilityId>("aisin-kumamoto");
  const [memory, setMemory] = useState(false);
  const plant = PLANTS.find((p) => p.id === sel)!;
  const edges = EDGES.filter((e) => e.from === sel);

  return (
    <div className={styles.explorer}>
      <div className={styles.mapCol}>
        <div className={styles.map}>
          <KyushuMap
            selected={sel}
            show2016={memory}
            title={`Kyushu, with the 2026 M6.8 epicentre${memory ? " and the 2016 Kumamoto epicentre" : ""}. Selected: ${plant.name}.`}
          />
        </div>
        <label className={styles.toggle}>
          <input type="checkbox" checked={memory} onChange={(e) => setMemory(e.target.checked)} />
          <span>Show the 2016 Kumamoto earthquake and the links it exposed</span>
        </label>
      </div>

      <div className={styles.side}>
        <fieldset className={styles.plants}>
          <legend className={styles.legend}>Tracked plants in Kyushu</legend>
          {PLANTS.map((p) => (
            <label key={p.id} className={styles.plant}>
              <input type="radio" name="plant" value={p.id} checked={sel === p.id} onChange={() => setSel(p.id)} />
              <span>{p.short}</span>
            </label>
          ))}
        </fieldset>

        <div className={styles.panel} aria-live="polite">
          <h3 className={styles.panelTitle}>{plant.name}</h3>
          {edges.length === 0 ? (
            <p className={styles.dim}>No dependency edges recorded from this plant.</p>
          ) : (
            <ul className={styles.edges}>
              {edges.map((e) => (
                <li key={e.to + e.label} className={memory && e.memory2016 ? styles.remembered : undefined}>
                  <p className={styles.edgeTo}>→ {e.to}</p>
                  <p className={styles.dim}>{e.label}</p>
                  <p className={styles.badges}>
                    <span className={`${styles.badge} ${styles[e.origin]}`}>{ORIGIN_TEXT[e.origin]}</span>
                    {memory && e.memory2016 && <span className={`${styles.badge} ${styles.memory}`}>Seen in 2016</span>}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
