export { default as Heatmap } from "./Heatmap.vue"

export type HeatmapValue = { date: Date | string; value: number }

export type HeatmapLabels = {
  /** Tooltip of a day: "3 contributions on Monday, 24 November". */
  value?: (value: number, date: Date) => string
  /** Summary read by screen readers. */
  summary?: (total: number, days: number) => string
  less?: string
  more?: string
}
