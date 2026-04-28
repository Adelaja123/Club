import { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/projects";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = ["/", "/about", "/projects"];
  const projectRoutes = getAllProjectSlugs().map((slug) => `/projects/${slug}`);

  return [...routes, ...projectRoutes].map((path) => ({
    url: getSiteUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/projects/") ? 0.7 : 0.8,
  }));
}
