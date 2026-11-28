export { default as Calendar } from "./Calendar.vue"
export { default as CalendarDayButton } from "./CalendarDayButton.vue"

/** What a day is, as CalendarDayButton draws it. Mirrors React DayPicker's `modifiers`. */
export type CalendarDayModifiers = {
  selected?: boolean
  today?: boolean
  outside?: boolean
  disabled?: boolean
  unavailable?: boolean
  range_start?: boolean
  range_end?: boolean
  range_middle?: boolean
}

export type CalendarMode = "single" | "multiple" | "range"

/** Same keys as React DayPicker's `classNames`, for the parts this Calendar renders. */
export type CalendarClassNames = Partial<
  Record<
    | "root"
    | "months"
    | "month"
    | "month_caption"
    | "caption_label"
    | "nav"
    | "button_previous"
    | "button_next"
    | "month_grid"
    | "weekdays"
    | "weekday"
    | "week"
    | "day"
    | "day_button"
    | "range_start"
    | "range_end"
    | "range_middle"
    | "hidden"
    | "footer",
    string
  >
>
