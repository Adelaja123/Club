import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const baseUrl = "https://oluwagbotemi.space";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Oluwagbotemi Adelaja | Full-Stack Developer",
  description:
    "Award-winning full-stack developer crafting exceptional digital experiences. Specializing in modern web applications, scalable architectures, and intuitive user interfaces.",
  keywords: [
    "full-stack developer",
    "web developer",
    "React",
    "Next.js",
    "TypeScript",
    "software engineer",
  ],
  authors: [{ name: "Oluwagbotemi Adelaja" }],
  openGraph: {
    title: "Oluwagbotemi Adelaja | Full-Stack Developer",
    description:
      "Award-winning full-stack developer crafting exceptional digital experiences.",
    type: "website",
    url: baseUrl,
    siteName: "Oluwagbotemi Adelaja",
  },
  alternates: {
    canonical: `${baseUrl}/`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Oluwagbotemi Adelaja | Full-Stack Developer",
    description:
      "Award-winning full-stack developer crafting exceptional digital experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Oluwagbotemi Adelaja",
    url: baseUrl,
    jobTitle: "Full-Stack Developer",
    description:
      "Award-winning full-stack developer crafting exceptional digital experiences.",
  };

  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
