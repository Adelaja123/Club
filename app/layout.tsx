import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navigation } from "@/components/navigation";
import "./globals.css";

const baseUrl = "https://oluwagbotemi.space";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Full Stack Developer in Lagos Nigeria | Oluwagbotemi Adelaja",
  description:
    "Full Stack Developer in Lagos, Nigeria. Specialized in Next.js, React, TypeScript and even Advanced HTML 5 and CSS 3. Award-winning developer crafting exceptional digital experiences, scalable architectures, and intuitive user interfaces.",
  keywords: [
    "full stack developer Lagos",
    "Next.js developer Nigeria",
    "React developer Lagos",
    "web developer",
    "Next.js",
    "React",
    "TypeScript",
    "software engineer Nigeria",
    "HTML and CSS expert",
  ],
  authors: [{ name: "Oluwagbotemi Adelaja" }],
  openGraph: {
    title: "Full Stack Developer in Lagos Nigeria | Oluwagbotemi Adelaja",
    description:
      "Full Stack Developer in Lagos, Nigeria. Specialized in Next.js, React, and TypeScript. Award-winning developer crafting exceptional digital experiences.",
    type: "website",
    url: `${baseUrl}/`,
    siteName: "Oluwagbotemi Adelaja - Full Stack Developer",
    locale: "en_NG",
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
    title: "Full Stack Developer in Lagos Nigeria | Oluwagbotemi Adelaja",
    description:
      "Full Stack Developer in Lagos, Nigeria. Specialized in Next.js, React, and TypeScript.",
    creator: "@oluwagbotemi",
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
    jobTitle: "Full Stack Developer",
    description:
      "Full Stack Developer in Lagos, Nigeria. Specialized in Next.js, React, TypeScript and even Advanced HTML 5 and CSS 3",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    sameAs: [
      "https://github.com/Adelaja123",
      "https://linkedin.com/in/oluwagbotemi-adelaja",
      "https://x.com/gbotemi8054",
      "https://www.instagram.com/oluwagbotemi.io?igsh=bWtheXFpbWVjZdN2",
    ],
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
        <Navigation />
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
