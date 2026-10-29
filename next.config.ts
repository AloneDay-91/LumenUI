import type { NextConfig } from "next";

// llms.txt, llms-full.txt and /md/docs read the page and component sources at request time.
const docsSources = [
  "./src/app/(docs)/**/page.tsx",
  "./src/components/docs/**/*",
  "./src/components/ui/**/*",
  "./src/lib/utils.ts",
]

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/llms.txt": docsSources,
    "/llms-full.txt": docsSources,
    "/md/**": docsSources,
  },
  async redirects() {
    return [
      {
        source: "/examples",
        destination: "/docs",
        permanent: false,
      },
      {
        source: "/exemples",
        destination: "/docs",
        permanent: false,
      },
      {
        source: "/docs/examples",
        destination: "/docs",
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
