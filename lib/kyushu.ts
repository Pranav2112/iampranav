/*
 * Kyushu in the projected space of content/geo/kyushu.json (Natural Earth 10m coastline; see its `source`).
 * The coastline itself is served as public/kyushu-land.svg (scripts/build-kyushu-land.mjs) so it is
 * cached once instead of being inlined into every page and client bundle.
 */
export const VIEW_W = 2445.8;
export const VIEW_H = 3200;

export type Pt = { x: number; y: number };

export const EVENT_2026 = { x: 1034.8, y: 1495.7, mag: 6.8 };
export const EVENT_2016 = { x: 1142.2, y: 1309.4, mag: 7 };

// City-level approximations, from ARGUS's data/entities.json.
const FACILITIES = {
  "aisin-kumamoto": { x: 1104.8, y: 1300 },
  "renesas-kawajiri": { x: 1104.8, y: 1300 },
  "toyota-kyushu-miyata": { x: 1071.1, y: 380 },
  "nissan-kyushu": { x: 1332.6, y: 330 },
  "tsmc-kumamoto": { x: 1206, y: 1230 },
  "sony-kumamoto": { x: 1180.7, y: 1220 },
  "tel-kyushu": { x: 1155.4, y: 1210 },
  "honda-kumamoto": { x: 1239.8, y: 1220 },
  "fcc-uki": { x: 1079.5, y: 1450 },
  "giken-kogyo": { x: 1172.3, y: 1220 },
  "daihatsu-kyushu": { x: 1526.5, y: 530 },
} satisfies Record<string, Pt>;

export type FacilityId = keyof typeof FACILITIES;
export const facility = (id: FacilityId): Pt => FACILITIES[id];
