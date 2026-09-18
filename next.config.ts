import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/docs/examples",
        destination: "/exemples",
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
