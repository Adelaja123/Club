import { Metadata } from "next";
import { ProjectsPageContent } from "./projects-page-content";

export const metadata: Metadata = {
  title: "Projects | Oluwagbotemi Adelaja - Full Stack Developer",
  description:
    "Explore my portfolio of web applications, platforms, and digital solutions. Full stack projects built with Next.js, React, TypeScript, and more.",
  openGraph: {
    title: "Projects | Oluwagbotemi Adelaja - Full Stack Developer",
    description:
      "Explore my portfolio of web applications, platforms, and digital solutions.",
    type: "website",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
