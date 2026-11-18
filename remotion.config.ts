// Remotion Studio and CLI renders for the Lumen showcase video (`npm run studio`).
import path from "node:path"

import { Config } from "@remotion/cli/config"
import { enableTailwind } from "@remotion/tailwind-v4"

Config.setEntryPoint("src/remotion/index.ts")

Config.overrideWebpackConfig((config) => {
  const withTailwind = enableTailwind(config)
  return {
    ...withTailwind,
    resolve: {
      ...withTailwind.resolve,
      // The same `@/` alias as tsconfig, so the scenes import Lumen exactly as the site does.
      alias: {
        ...(withTailwind.resolve?.alias as Record<string, string> | undefined),
        "@": path.join(process.cwd(), "src"),
      },
    },
  }
})
