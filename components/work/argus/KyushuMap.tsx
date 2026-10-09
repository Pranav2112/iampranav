import { EVENT_2016, EVENT_2026, VIEW_H, VIEW_W, facility, type FacilityId } from "@/lib/kyushu";
import { COLORS, PLANTS } from "./data";

type Box = { x: number; y: number; w: number; h: number };

/** Kumamoto to Fukuoka: the event, the plants around it and the Toyota plant they supply. */
export const CROP: Box = { x: 640, y: 180, w: 1120, h: 1500 };

/**
 * Kyushu in ARGUS's own colours. Lines use non-scaling strokes so the crop can change
 * without the drawing getting heavier or lighter.
 */
export default function KyushuMap({
  crop = CROP,
  selected = null,
  show2016 = false,
  labels = "key",
  title,
}: {
  crop?: Box;
  selected?: FacilityId | null;
  show2016?: boolean;
  labels?: "key" | "event" | "none";
  title: string;
}) {
  const aisin = facility("aisin-kumamoto");
  const toyota = facility("toyota-kyushu-miyata");
  const unit = crop.w / 600;
  const text = (size: number) => ({ fontSize: size * unit, fill: COLORS.ink });

  return (
    <svg
      viewBox={`${crop.x} ${crop.y} ${crop.w} ${crop.h}`}
      width="100%"
      role="img"
      aria-label={title}
      style={{ display: "block", background: COLORS.bg }}
      preserveAspectRatio="xMidYMid slice"
    >
      <image href="/kyushu-land.svg" x={0} y={0} width={VIEW_W} height={VIEW_H} />

      {show2016 && (
        <g>
          <circle cx={EVENT_2016.x} cy={EVENT_2016.y} r={18 * unit} fill="none" stroke={COLORS.dim} strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
          <text x={EVENT_2016.x + 24 * unit} y={EVENT_2016.y - 14 * unit} {...text(12)} fill={COLORS.dim}>
            Kumamoto 2016 · M7.0
          </text>
        </g>
      )}

      <circle cx={EVENT_2026.x} cy={EVENT_2026.y} r={60 * unit} fill={COLORS.accent} opacity={0.12} />
      <circle cx={EVENT_2026.x} cy={EVENT_2026.y} r={30 * unit} fill="none" stroke={COLORS.accent} strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
      <circle cx={EVENT_2026.x} cy={EVENT_2026.y} r={6 * unit} fill={COLORS.accent} />

      <line
        x1={aisin.x}
        y1={aisin.y}
        x2={toyota.x}
        y2={toyota.y}
        stroke={COLORS.ink}
        strokeWidth={selected === "aisin-kumamoto" || selected === "renesas-kawajiri" || selected === "toyota-kyushu-miyata" ? 2 : 1.25}
        vectorEffect="non-scaling-stroke"
      />

      {PLANTS.map((p) => {
        const pt = facility(p.id);
        const on = selected === p.id;
        return (
          <circle
            key={p.id}
            cx={pt.x}
            cy={pt.y}
            r={(on ? 9 : 6) * unit}
            fill={on ? COLORS.review : COLORS.bg}
            stroke={COLORS.review}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}

      {labels === "event" && (
        <g>
          <text x={EVENT_2026.x + 44 * unit} y={EVENT_2026.y + 8 * unit} {...text(22)}>
            M6.8 · July 2026
          </text>
          <text x={aisin.x + 60 * unit} y={facility("tsmc-kumamoto").y - 30 * unit} {...text(18)} fill={COLORS.dim}>
            Kumamoto plants
          </text>
        </g>
      )}

      {selected && labels === "key" && !["aisin-kumamoto", "renesas-kawajiri", "toyota-kyushu-miyata"].includes(selected) && (
        <text
          x={facility(selected).x + 18 * unit}
          y={facility(selected).y + 26 * unit}
          {...text(14)}
          fill={COLORS.review}
          fontWeight={600}
        >
          {PLANTS.find((p) => p.id === selected)?.short}
        </text>
      )}

      {labels === "key" && (
        <g>
          <text x={toyota.x + 16 * unit} y={toyota.y + 5 * unit} {...text(14)}>
            Toyota Kyushu (Miyata)
          </text>
          <text x={aisin.x - 16 * unit} y={aisin.y + 5 * unit} textAnchor="end" {...text(14)}>
            Aisin · Renesas
          </text>
          <text x={EVENT_2026.x + 40 * unit} y={EVENT_2026.y + 6 * unit} {...text(14)}>
            M6.8 · Kyushu 2026
          </text>
          <text
            x={(aisin.x + toyota.x) / 2 - 12 * unit}
            y={(aisin.y + toyota.y) / 2}
            textAnchor="end"
            {...text(12)}
            fill={COLORS.dim}
          >
            parts · public, verified
          </text>
        </g>
      )}
    </svg>
  );
}
