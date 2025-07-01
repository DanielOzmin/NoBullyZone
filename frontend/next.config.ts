import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['nobullyzone.s3.eu-north-1.amazonaws.com'],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5153/api/:path*",
      },
    ]
  }
}

export default nextConfig;
