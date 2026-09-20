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
      {
        source: "/docs/themes",
        destination: "/docs/styles",
        permanent: false,
      },
      {
        source: "/themes",
        destination: "/docs/styles",
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
