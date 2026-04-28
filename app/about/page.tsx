import { Metadata } from "next";
import { AboutPageContent } from "./about-page-content";
import { getSiteUrl } from "@/lib/site";

const aboutUrl = getSiteUrl("/about");

export const metadata: Metadata = {
  title: "About | Oluwagbotemi Adelaja - Full Stack Developer",
  description:
    "Learn more about Oluwagbotemi Adelaja, a full-stack developer with 5+ years of experience building digital solutions with Next.js, React, TypeScript, and more.",
  alternates: {
    canonical: aboutUrl,
  },
  openGraph: {
    title: "About | Oluwagbotemi Adelaja - Full Stack Developer",
    description:
      "Learn more about Oluwagbotemi Adelaja, a full-stack developer passionate about creating exceptional digital experiences.",
    type: "website",
    url: aboutUrl,
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
