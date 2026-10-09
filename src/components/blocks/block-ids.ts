import { dashboardBlockMeta } from "@/lib/dashboard-blocks"

const lumenPreviewIds = [
  "site-hero",
  "site-header",
  "landing-hero",
  "painting",
  "split",
  "band",
  "copy-paste",
  "form-states",
  "tokens",
  "component-index",
  "installation",
  "site-footer",
]

export const blockPreviewIds: string[] = [
  ...lumenPreviewIds,
  ...dashboardBlockMeta.map((block) => block.id),
]
