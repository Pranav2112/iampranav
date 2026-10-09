// Writes public/kyushu-land.svg from content/geo/kyushu.json.
// Keeps closed rings only (Kyushu and its islands); the clipped Honshu fragment is open and dropped.
import { readFileSync, writeFileSync } from "node:fs";

const geo = JSON.parse(readFileSync(new URL("../content/geo/kyushu.json", import.meta.url), "utf8"));
const [, , w, h] = geo.viewBox;
const land = geo.d
  .split(/(?=M)/)
  .filter((s) => {
    const n = s.match(/-?[\d.]+/g);
    return !!n && n[0] === n[n.length - 2] && n[1] === n[n.length - 1];
  })
  .join("");

writeFileSync(
  new URL("../public/kyushu-land.svg", import.meta.url),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><path fill="#1a2029" d="${land}"/></svg>\n`,
);
