import type { HTMLAttributes } from "vue"
import type { DateValue } from "@internationalized/date"
import type { DateRange } from "reka-ui"

export { default as DatePicker } from "./DatePicker.vue"

export type DatePickerProps = {
  /** One day (a DateValue) or a range (a DateRange: { start, end }). */
  mode?: "single" | "range"
  modelValue?: DateValue | DateRange
  defaultValue?: DateValue | DateRange
  placeholder?: string
  disabled?: boolean
  id?: string
  class?: HTMLAttributes["class"]
}
