import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path",
        destination: "http://localhost:8001/api/:path*",
      },
    ];
  },
};

export default nextConfig;
