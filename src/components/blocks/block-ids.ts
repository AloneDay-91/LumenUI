import { dashboardBlockMeta } from "@/lib/dashboard-blocks"
import { lumenBlockMeta } from "@/lib/lumen-blocks"

export const blockPreviewIds: string[] = [
  ...lumenBlockMeta.map((block) => block.id),
  ...dashboardBlockMeta.map((block) => block.id),
]
