import type { Metadata } from "next"

import { ThemePreview } from "@/components/theme/ThemePreview"

export const metadata: Metadata = {
  title: "Customize",
  description: "Tune colors, type, radius, and shadow, then export a preset for the CLI.",
}

export default function CustomizePage() {
  return <ThemePreview />
}
