import type { MetadataRoute } from "next";

const URL_SITIO = "https://duch-technologies-web.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: URL_SITIO, changeFrequency: "monthly", priority: 1 },
    { url: `${URL_SITIO}/privacidad`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
