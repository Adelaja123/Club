import { MetadataRoute } from "next";
import { SITE_URL, getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: getSiteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
