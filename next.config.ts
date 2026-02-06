import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: "export", // Enable static export for GitHub Pages
  basePath: isProd ? "/monolith" : undefined, // Only use basePath in production
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
