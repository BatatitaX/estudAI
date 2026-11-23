import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) return [];
  return [
    "",
    "ferramentas",
    "estudai-plus",
    "calculadora-media",
    "quanto-preciso-tirar",
    "pomodoro",
    "contador-de-dias",
    "calculadora-porcentagem",
    "regra-de-tres",
    "conversores",
    "ajuda",
    "privacidade",
    "termos",
  ].map((path) => ({
    url: base.replace(/\/$/, "") + "/" + path,
    changeFrequency: "monthly" as const,
    priority: path ? 0.7 : 1,
  }));
}
