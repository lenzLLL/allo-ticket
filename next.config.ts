import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "glad-meerkat-32.convex.cloud", protocol: "https" },
      { hostname: "glad-meerkat-32.convex.cloud", protocol: "https" },
    ],
  },
};

export default nextConfig;
