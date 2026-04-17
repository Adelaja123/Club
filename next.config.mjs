/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  redirects: async () => [
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.oluwagbotemi.space" }],
      destination: "https://oluwagbotemi.space/:path*",
      permanent: true,
    },
  ],
};

export default nextConfig;
