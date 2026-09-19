import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/exemples",
        destination: "/examples",
        permanent: false,
      },
      {
        source: "/docs/examples",
        destination: "/examples",
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
