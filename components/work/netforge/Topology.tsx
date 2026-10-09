import { LINKS, ROUTERS, VIEW, hostPoint, type LinkId, type RouterId } from "./plan";

const ACCENT = "#f2b84b";

/**
 * The planned v1 topology. Every link is dashed because none of it runs yet.
 * `selected` highlights a router (and its links) or a single link; `down` marks a link as failed.
 */
export default function Topology({
  selected,
  down,
  title = "Planned NetForge topology: four routers, each its own AS, connected by five /31 links.",
}: {
  selected?: RouterId | LinkId | null;
  down?: LinkId | null;
  title?: string;
}) {
  const routerOn = (r: RouterId) => selected === r || (!!selected && selected.includes("-") && selected.split("-").includes(r));
  const linkOn = (id: LinkId) => selected === id || (!!selected && !selected.includes("-") && id.split("-").includes(selected));

  return (
    <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} width="100%" role="img" aria-label={title} style={{ display: "block", overflow: "visible" }}>
      <style>{`@media (max-width: 599px) { .nf-sub { font-size: 21px } .nf-r { font-size: 26px } .nf-as, .nf-h { font-size: 19px } }`}</style>
      {(Object.keys(ROUTERS) as RouterId[]).map((r) => {
        const p = ROUTERS[r];
        const h = hostPoint(r);
        return (
          <g key={`h-${r}`} opacity={0.6}>
            <line x1={p.x} y1={p.y} x2={h.x} y2={h.y} stroke="currentColor" strokeWidth={1} strokeDasharray="3 4" />
            <circle cx={h.x} cy={h.y} r={5} fill="none" stroke="currentColor" />
            <text className="nf-h" x={h.x + 12} y={h.y + 4} fontSize={12} fill="currentColor">
              {p.host}
            </text>
          </g>
        );
      })}

      {LINKS.map((l) => {
        const a = ROUTERS[l.a];
        const b = ROUTERS[l.b];
        const on = linkOn(l.id);
        const isDown = down === l.id;
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const vertical = a.x === b.x;
        const diagonal = a.x !== b.x && a.y !== b.y;
        return (
          <g key={l.id}>
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={isDown ? "#e5484d" : on ? ACCENT : "currentColor"}
              strokeWidth={on || isDown ? 2 : 1.25}
              strokeDasharray="7 6"
              opacity={on || isDown || !selected ? 1 : 0.45}
            />
            {isDown && (
              <g transform={`translate(${mx} ${my})`} stroke="#e5484d" strokeWidth={2}>
                <line x1={-7} y1={-7} x2={7} y2={7} />
                <line x1={-7} y1={7} x2={7} y2={-7} />
              </g>
            )}
            <text
              className="nf-sub"
              x={vertical ? mx - 12 : diagonal ? mx - 22 : mx}
              y={vertical ? my + 4 : diagonal ? my + 30 : my - 12}
              fontSize={13}
              textAnchor={vertical || diagonal ? "end" : "middle"}
              fill={on ? ACCENT : "currentColor"}
              opacity={on || !selected ? 0.9 : 0.45}
              style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
            >
              {l.subnet}
            </text>
          </g>
        );
      })}

      {(Object.keys(ROUTERS) as RouterId[]).map((r) => {
        const p = ROUTERS[r];
        const on = routerOn(r);
        const top = p.y < 200;
        const right = p.x > 300;
        return (
          <g key={r}>
            <rect
              x={p.x - 13}
              y={p.y - 13}
              width={26}
              height={26}
              fill={on ? ACCENT : "var(--bg)"}
              stroke={on ? ACCENT : "currentColor"}
              strokeWidth={1.5}
            />
            <text
              x={right ? p.x + 24 : p.x - 24}
              y={top ? p.y - 2 : p.y + 2}
              className="nf-r"
              fontSize={16}
              fontWeight={600}
              textAnchor={right ? "start" : "end"}
              fill="currentColor"
            >
              {r}
            </text>
            <text
              x={right ? p.x + 24 : p.x - 24}
              y={top ? p.y + 15 : p.y + 19}
              className="nf-as"
              fontSize={12}
              textAnchor={right ? "start" : "end"}
              fill="currentColor"
              opacity={0.7}
            >
              AS{p.asn}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
