import n from "./netforge.module.css";
import { PHASES } from "./plan";

/** Phase 0 is done; the other twelve are drawn dashed. */
export default function Progress() {
  const planned = PHASES.filter((p) => !p.done).length;
  return (
    <div>
      <p className={n.progressBig} aria-hidden>
        Phase 0<span> complete</span>
      </p>
      <p className={n.srOnly}>
        Phase 0, the foundation, is complete. Phases 1 to {planned} are planned.
      </p>
      <ol className={n.ruler} aria-hidden>
        {PHASES.map((p) => (
          <li key={p.n} className={p.done ? n.done : undefined} />
        ))}
      </ol>
      <p className={n.progressNote}>
        The foundation for a {planned}-phase build. No network exists yet; building it starts in
        Phase 1.
      </p>
    </div>
  );
}
