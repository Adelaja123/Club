export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  color: string;
  metrics: {
    users: string;
    growth: string;
  };
  // Extended fields for case studies
  image: string;
  overview: string;
  services: string[];
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  year: string;
  duration: string;
  challenge?: string;
  solution?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "financeflow",
    title: "FinanceFlow",
    category: "Web Application",
    description:
      "A comprehensive financial management platform with real-time analytics, automated reporting, and AI-powered insights for modern businesses.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    color: "bg-amber-50",
    metrics: { users: "50K+", growth: "+180%" },
    image: "/projects/financeflow.jpg",
    overview:
      "FinanceFlow is a comprehensive financial management platform designed to help modern businesses track expenses, manage budgets, and gain actionable insights through AI-powered analytics. The platform features real-time dashboards, automated reporting, and seamless Stripe integration for payment processing.",
    services: ["Full Stack Development", "UI/UX Design", "API Architecture"],
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS", "Prisma"],
    repoUrl: "https://github.com/Adelaja123/financeflow",
    year: "2024",
    duration: "3 months",
    challenge:
      "The client needed a unified platform to replace multiple disconnected financial tools, requiring seamless data migration and real-time synchronization across departments.",
    solution:
      "Built a modular architecture with microservices for each financial function, implementing real-time WebSocket connections for live updates and a robust API layer for third-party integrations.",
    featured: true,
  },
  {
    id: 2,
    slug: "medconnect",
    title: "MedConnect",
    category: "Healthcare Platform",
    description:
      "Secure telemedicine platform connecting patients with healthcare providers, featuring end-to-end encryption and HIPAA compliance.",
    tags: ["Next.js", "WebRTC", "Redis", "Docker"],
    color: "bg-sky-50",
    metrics: { users: "100K+", growth: "+320%" },
    image: "/projects/medconnect.jpg",
    overview:
      "MedConnect is a secure telemedicine platform that bridges the gap between patients and healthcare providers. Built with privacy-first architecture, it enables video consultations, secure messaging, prescription management, and medical record sharing while maintaining full HIPAA compliance.",
    services: ["Full Stack Development", "Security Architecture", "DevOps"],
    techStack: ["Next.js", "WebRTC", "Redis", "Docker", "PostgreSQL", "Socket.io"],
    repoUrl: "https://github.com/Adelaja123/medconnect",
    year: "2024",
    duration: "4 months",
    challenge:
      "Healthcare regulations demanded rigorous security measures while maintaining a seamless user experience for both technical and non-technical users.",
    solution:
      "Implemented end-to-end encryption for all communications, role-based access control, and automated compliance auditing. Designed an intuitive interface that abstracts complexity while ensuring data integrity.",
    featured: true,
  },
  {
    id: 3,
    slug: "taskflow-pro",
    title: "TaskFlow Pro",
    category: "Productivity App",
    description:
      "An intelligent project management tool with AI-powered task prioritization, team collaboration features, and advanced analytics.",
    tags: ["React", "Node.js", "MongoDB", "OpenAI"],
    color: "bg-emerald-50",
    metrics: { users: "25K+", growth: "+150%" },
    image: "/projects/taskflow.jpg",
    overview:
      "TaskFlow Pro revolutionizes project management by combining traditional task tracking with AI-powered insights. The platform learns from team behavior to suggest optimal task assignments, predict bottlenecks, and automate routine workflows.",
    services: ["Full Stack Development", "AI Integration", "UX Research"],
    techStack: ["React", "Node.js", "MongoDB", "OpenAI API", "Express", "Tailwind CSS"],
    repoUrl: "https://github.com/Adelaja123/taskflow-pro",
    year: "2023",
    duration: "2.5 months",
    challenge:
      "Creating an AI system that provides genuinely useful suggestions without being intrusive or overwhelming users with automation.",
    solution:
      "Developed a contextual AI layer that learns from user interactions and team patterns, offering suggestions at appropriate moments while allowing full manual control.",
  },
  {
    id: 4,
    slug: "ecotrack",
    title: "EcoTrack",
    category: "Sustainability Platform",
    description:
      "Carbon footprint tracking and sustainability reporting platform for enterprises, with automated ESG compliance monitoring.",
    tags: ["Next.js", "Python", "AWS", "D3.js"],
    color: "bg-green-50",
    metrics: { users: "15K+", growth: "+200%" },
    image: "/projects/ecotrack.jpg",
    overview:
      "EcoTrack helps enterprises measure, report, and reduce their environmental impact. The platform aggregates data from multiple sources to provide comprehensive sustainability metrics, automated ESG reporting, and actionable recommendations for carbon reduction.",
    services: ["Full Stack Development", "Data Visualization", "API Integration"],
    techStack: ["Next.js", "Python", "AWS Lambda", "D3.js", "PostgreSQL", "Tailwind CSS"],

    year: "2023",
    duration: "3 months",
    challenge:
      "Integrating with diverse data sources including IoT sensors, utility providers, and supply chain systems while ensuring data accuracy.",
    solution:
      "Built a flexible data ingestion pipeline with validation layers and normalization algorithms, enabling seamless integration with any data source through standardized APIs.",
  },
  {
    id: 5,
    slug: "artistry-marketplace",
    title: "Artistry",
    category: "E-commerce Platform",
    description:
      "A curated marketplace for digital artists featuring NFT integration, commission management, and creator analytics.",
    tags: ["Next.js", "Solidity", "IPFS", "Stripe"],
    color: "bg-purple-50",
    metrics: { users: "30K+", growth: "+280%" },
    image: "/projects/artistry.jpg",
    overview:
      "Artistry is a premium marketplace connecting digital artists with collectors worldwide. The platform combines traditional e-commerce with Web3 capabilities, allowing artists to sell digital works, accept commissions, and mint NFTs—all from a unified dashboard.",
    services: ["Full Stack Development", "Smart Contract Development", "Payment Integration"],
    techStack: ["Next.js", "Solidity", "IPFS", "Stripe", "Ethereum", "Tailwind CSS"],
    repoUrl: "https://github.com/Adelaja123/artistry",

    year: "2024",
    duration: "4 months",
    challenge:
      "Creating a seamless experience that bridges traditional payment methods with cryptocurrency transactions for a diverse user base.",
    solution:
      "Implemented a hybrid payment system with automatic conversion and unified transaction history, abstracting blockchain complexity for mainstream users while providing advanced features for crypto-native collectors.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
