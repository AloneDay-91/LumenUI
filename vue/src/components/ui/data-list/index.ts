export { default as DataList } from "./DataList.vue"
export { default as DataListItem } from "./DataListItem.vue"
export { default as DataListLabel } from "./DataListLabel.vue"
export { default as DataListValue } from "./DataListValue.vue"

export type DataListOrientation = "horizontal" | "vertical"
export type DataListSize = "sm" | "default" | "lg"
export type DataListAlign = "start" | "center" | "end" | "baseline" | "stretch"
export type DataListColor = "gray" | "indigo" | "cyan" | "orange" | "crimson"

export const labelColorClass = {
  gray: {
    soft: "text-muted-foreground",
    contrast: "text-foreground",
  },
  indigo: {
    soft: "text-indigo-ink",
    contrast: "text-indigo-ink-strong",
  },
  cyan: {
    soft: "text-cyan-ink",
    contrast: "text-cyan-ink-strong",
  },
  orange: {
    soft: "text-orange-ink",
    contrast: "text-orange-ink-strong",
  },
  crimson: {
    soft: "text-crimson-ink",
    contrast: "text-crimson-ink-strong",
  },
} satisfies Record<DataListColor, { soft: string; contrast: string }>

export const itemAlignClass = {
  start: "group-data-[orientation=horizontal]/data-list:items-start",
  center: "group-data-[orientation=horizontal]/data-list:items-center",
  end: "group-data-[orientation=horizontal]/data-list:items-end",
  baseline: "group-data-[orientation=horizontal]/data-list:items-baseline",
  stretch: "group-data-[orientation=horizontal]/data-list:items-stretch",
} satisfies Record<DataListAlign, string>
