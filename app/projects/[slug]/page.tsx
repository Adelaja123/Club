import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";
import { CaseStudyContent } from "./case-study-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const projectUrl = `https://oluwagbotemi.space/projects/${slug}`;
  
  return {
    title: `${project.title} | Oluwagbotemi Adelaja`,
    description: project.overview,
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.description,
      type: "article",
      url: projectUrl,
      images: [project.image],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyContent project={project} />;
}
