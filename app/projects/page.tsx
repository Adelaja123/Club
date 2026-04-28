import { Metadata } from "next";
import { ProjectsPageContent } from "./projects-page-content";

export const metadata: Metadata = {
  title: "Projects | Oluwagbotemi Adelaja - Full Stack Developer",
  description:
    "Explore my portfolio of web applications, platforms, and digital solutions. Full stack projects built with Next.js, React, TypeScript, and more.",
  alternates: {
    canonical: "https://oluwagbotemi.space/projects",
  },
  openGraph: {
    title: "Projects | Oluwagbotemi Adelaja - Full Stack Developer",
    description:
      "Explore my portfolio of web applications, platforms, and digital solutions.",
    type: "website",
    url: "https://oluwagbotemi.space/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
