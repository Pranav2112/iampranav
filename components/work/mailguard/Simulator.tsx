"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./simulator.module.css";
import { EVALUATORS, MESSAGES, evaluate } from "./rules";

const STEP = 0.32;

function Segment({ index, on, play }: { index: number; on: boolean; play: boolean }) {
  if (!on) return <span className={`${styles.seg} ${styles.segOff}`} aria-hidden />;
  return (
    <motion.span
      className={styles.seg}
      aria-hidden
      initial={play ? { scaleY: 0 } : false}
      animate={{ scaleY: 1 }}
      transition={{ duration: STEP, delay: index * STEP, ease: "linear" }}
    />
  );
}

export default function Simulator() {
  const [id, setId] = useState(MESSAGES[0].id);
  // The first render is complete and static; the path only animates after a choice, and never with reduced motion.
  const [picked, setPicked] = useState(false);
  const reduced = !!useReducedMotion();
  const play = picked && !reduced;
  const m = MESSAGES.find((x) => x.id === id)!;
  const a = evaluate(m);
  const fired = new Map(a.fired.map((s) => [s.name.split(":")[0], s]));
  const fade = (i: number) => ({
    initial: play ? { opacity: 0.25 } : false,
    animate: { opacity: 1 },
    transition: { delay: i * STEP, duration: 0.2 },
  });

  return (
    <div className={styles.sim}>
      <div className={styles.picker} role="group" aria-label="Choose a synthetic message">
        {MESSAGES.map((x) => (
          <button key={x.id} type="button" aria-pressed={x.id === id} className={styles.pick} onClick={() => {
              setPicked(true);
              setId(x.id);
            }}>
            <span className={styles.pickLabel}>{x.label}</span>
            <span className={styles.pickSubject}>{x.subject}</span>
          </button>
        ))}
        <p className={styles.note}>All four messages are synthetic.</p>
      </div>

      <ol className={styles.flow} key={id} aria-live="polite">
        <li className={styles.step}>
          <Segment index={0} on play={play} />
          <p className={styles.stepLabel}>Message</p>
          <div className={styles.mail}>
            <p>
              <span className={styles.dim}>From</span> {m.from}
            </p>
            <p>
              <span className={styles.dim}>Subject</span> {m.subject}
            </p>
            {m.headers?.map((h) => (
              <p key={h} className={styles.mono}>
                {h}
              </p>
            ))}
            {m.gmailLabels?.map((l) => (
              <p key={l}>
                <span className={styles.dim}>Gmail label</span> <span className={styles.mono}>{l}</span>
              </p>
            ))}
          </div>
        </li>

        <li className={styles.step}>
          <Segment index={1} on play={play} />
          <p className={styles.stepLabel}>Rules, in order</p>
          <ul className={styles.rules}>
            {EVALUATORS.map((e) => {
              const s = fired.get(e.name);
              return (
                <li key={e.name} className={s ? styles.fired : styles.quiet}>
                  <span className={styles.mono}>{s ? s.name : e.name}</span>
                  {s ? (
                    <span className={styles.ruleOut}>
                      {s.adjustment > 0 ? "+" : "−"}
                      {Math.abs(s.adjustment)}
                      {s.category ? ` · ${s.category}` : ""}
                      {s.forceSkipAi ? " · skip model" : ""}
                      {s.forceUseAi ? " · needs model" : ""}
                    </span>
                  ) : (
                    <span className={styles.ruleOut}>no match</span>
                  )}
                </li>
              );
            })}
          </ul>
        </li>

        <li className={styles.step}>
          <Segment index={2} on play={play} />
          <p className={styles.stepLabel}>Gate</p>
          <motion.div {...fade(2)}>
            <p className={styles.mono}>should_use_ai = any(force_use_ai) or not any(force_skip_ai)</p>
            <p className={styles.gate}>
              = {String(a.fired.some((s) => s.forceUseAi))} or not {String(a.fired.some((s) => s.forceSkipAi))} ={" "}
              <strong>{String(a.shouldUseAi)}</strong>
            </p>
            <p className={styles.reason}>{a.reason}</p>
          </motion.div>
        </li>

        <li className={`${styles.step} ${a.shouldUseAi ? "" : styles.skipped}`}>
          <Segment index={3} on={a.shouldUseAi} play={play} />
          <p className={styles.stepLabel}>Model</p>
          <motion.p {...fade(3)} className={a.shouldUseAi ? styles.called : styles.notCalled}>
            {a.shouldUseAi
              ? "Called. Returns a schema-validated analysis: summary, category, importance 0–100, urgency, action, deadline."
              : "Not called"}
          </motion.p>
        </li>

        <li className={`${styles.step} ${styles.last}`}>
          <p className={styles.stepLabel}>Priority engine</p>
          <motion.p {...fade(4)}>
            Rule adjustment <strong>{a.adjustment > 0 ? "+" : a.adjustment < 0 ? "−" : ""}{Math.abs(a.adjustment)}</strong>
            {a.category ? (
              <>
                {" "}
                · category hint <strong>{a.category}</strong>
              </>
            ) : null}
            <span className={styles.dim}>
              {" "}
              · added to {a.shouldUseAi ? "the model's importance and urgency" : "a neutral base score"}, then
              adjusted by your feedback, to give the one score you see
            </span>
          </motion.p>
        </li>
      </ol>
    </div>
  );
}
