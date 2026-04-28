import { Metadata } from "next";
import { ProjectsPageContent } from "./projects-page-content";
import { getSiteUrl } from "@/lib/site";

const projectsUrl = getSiteUrl("/projects");

export const metadata: Metadata = {
  title: "Projects | Oluwagbotemi Adelaja - Full Stack Developer",
  description:
    "Explore my portfolio of web applications, platforms, and digital solutions. Full stack projects built with Next.js, React, TypeScript, and more.",
  alternates: {
    canonical: projectsUrl,
  },
  openGraph: {
    title: "Projects | Oluwagbotemi Adelaja - Full Stack Developer",
    description:
      "Explore my portfolio of web applications, platforms, and digital solutions.",
    type: "website",
    url: projectsUrl,
  },
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
