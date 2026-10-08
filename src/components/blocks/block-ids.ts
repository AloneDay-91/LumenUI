export const blockPreviewIds = [
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
] as const

export type BlockPreviewId = (typeof blockPreviewIds)[number]
