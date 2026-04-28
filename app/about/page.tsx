import { Metadata } from "next";
import { AboutPageContent } from "./about-page-content";

export const metadata: Metadata = {
  title: "About | Oluwagbotemi Adelaja - Full Stack Developer",
  description:
    "Learn more about Oluwagbotemi Adelaja, a full-stack developer with 5+ years of experience building digital solutions with Next.js, React, TypeScript, and more.",
  alternates: {
    canonical: "https://oluwagbotemi.space/about",
  },
  openGraph: {
    title: "About | Oluwagbotemi Adelaja - Full Stack Developer",
    description:
      "Learn more about Oluwagbotemi Adelaja, a full-stack developer passionate about creating exceptional digital experiences.",
    type: "website",
    url: "https://oluwagbotemi.space/about",
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
