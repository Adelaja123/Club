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
      destination: "https://oluwagbotemi.space/:path*",
      permanent: true,
      has: [{ type: "host", value: "www.oluwagbotemi.space" }],
    },
  ],
};

export default nextConfig;
