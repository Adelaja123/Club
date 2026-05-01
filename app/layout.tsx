import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navigation } from "@/components/navigation";
import { LenisProvider } from "@/components/lenis-provider";
import { PreloaderWrapper } from "@/components/preloader-wrapper";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const defaultOgImage = "/images/about-photo.jpg";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
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
    url: SITE_URL,
    siteName: "Oluwagbotemi Adelaja - Full Stack Developer",
    locale: "en_NG",
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Oluwagbotemi Adelaja portfolio preview",
      },
    ],
  },
  alternates: {
    canonical: "/",
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
    images: [defaultOgImage],
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
    url: SITE_URL,
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
        <PreloaderWrapper>
          <LenisProvider>
            <Navigation />
            {children}
            {process.env.NODE_ENV === "production" && <Analytics />}
          </LenisProvider>
        </PreloaderWrapper>
      </body>
    </html>
  );
}
