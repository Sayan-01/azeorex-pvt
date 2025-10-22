import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      { protocol: "https", hostname: "o3w1jifi2x.ufs.sh" },
      { protocol: "https", hostname: "ik.imagekit.io"}
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false
};

export default nextConfig;
