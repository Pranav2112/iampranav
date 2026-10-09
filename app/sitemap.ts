import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const ROUTES = ["", "/work/atlas", "/work/netforge", "/work/mailguard", "/work/argus", "/about", "/archive", "/lab"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({ url: `${SITE.url}${path}` }));
}
