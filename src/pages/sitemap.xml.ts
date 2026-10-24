import type { APIRoute } from "astro";
import { guides } from "../data/guides";

const PATHS = ["/", "/compare/", "/guides/", ...guides.map((guide) => `/guides/${guide.slug}/`)];

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error("sitemap.xml needs `site` set in astro.config.mjs");
  const urls = PATHS.map((path) => `  <url><loc>${new URL(path, site)}</loc></url>`).join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
