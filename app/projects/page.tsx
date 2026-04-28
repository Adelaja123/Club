import { Metadata } from "next";
import { ProjectsPageContent } from "./projects-page-content";
import { getSiteUrl } from "@/lib/site";

const projectsUrl = getSiteUrl("/projects");
const projectsOgImage = getSiteUrl("/projects/financeflow.jpg");

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
    images: [
      {
        url: projectsOgImage,
        width: 1200,
        height: 630,
        alt: "Featured portfolio projects by Oluwagbotemi Adelaja",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Oluwagbotemi Adelaja - Full Stack Developer",
    description:
      "Explore my portfolio of web applications, platforms, and digital solutions.",
    images: [projectsOgImage],
  },
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
