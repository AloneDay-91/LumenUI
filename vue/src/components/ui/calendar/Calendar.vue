<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
  RangeCalendarNext,
  RangeCalendarPrev,
  RangeCalendarRoot,
  useForwardPropsEmits,
  type CalendarRootProps,
  type DateRange,
  type RangeCalendarRootProps,
} from "reka-ui"
import { DateFormatter, getLocalTimeZone, isSameDay, isSameMonth, type DateValue } from "@internationalized/date"
import { ChevronLeft, ChevronRight } from "@lucide/vue"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import CalendarDayButton from "./CalendarDayButton.vue"
import type { CalendarClassNames, CalendarDayModifiers, CalendarMode } from "."

type SharedRootProps = Omit<CalendarRootProps, "modelValue" | "defaultValue" | "multiple"> &
  Pick<RangeCalendarRootProps, "allowNonContiguousRanges" | "maximumDays" | "isDateHighlightable" | "fixedDate">

interface Props extends SharedRootProps {
  /** One day, several days, or a range. */
  mode?: CalendarMode
  /** A DateValue in single mode, DateValue[] in multiple mode, a DateRange in range mode. */
  modelValue?: DateValue | DateValue[] | DateRange | null
  defaultValue?: DateValue | DateValue[] | DateRange
  showOutsideDays?: boolean
  /** "around": previous and next sit on either side of the caption. "after": both after it. */
  navLayout?: "around" | "after"
  /** Text under the grid; the `footer` slot takes markup instead. */
  footer?: string
  classNames?: CalendarClassNames
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  mode: "single",
  showOutsideDays: true,
  navLayout: "around",
})

const emits = defineEmits<{
  "update:modelValue": [value: DateValue | DateValue[] | DateRange | undefined]
  "update:placeholder": [date: DateValue]
  "update:startValue": [date: DateValue | undefined]
  "update:validModelValue": [date: DateRange]
}>()

defineSlots<{
  /** Replaces the day button. Render one root element: the cell trigger's attributes and handlers are merged onto it. */
  day?: (props: { day: DateValue; month: DateValue; dayValue: string; modifiers: CalendarDayModifiers }) => unknown
  footer?: () => unknown
}>()

const range = computed(() => props.mode === "range")

const delegated = computed(() => {
  const {
    class: _class,
    classNames: _classNames,
    mode: _mode,
    showOutsideDays: _showOutsideDays,
    navLayout: _navLayout,
    footer: _footer,
    weekdayFormat: _weekdayFormat,
    allowNonContiguousRanges,
    maximumDays,
    isDateHighlightable,
    fixedDate,
    ...rest
  } = props
  return {
    ...rest,
    ...(range.value ? { allowNonContiguousRanges, maximumDays, isDateHighlightable, fixedDate } : {}),
  }
})
const forwardedRaw = useForwardPropsEmits(delegated, emits)
// Root is CalendarRoot or RangeCalendarRoot depending on `mode`: the union of their
// props does not type-check against either, so bind it loosely.
// useForwardProps only keeps the props the parent set, so the values computed here
// (weekdayFormat, multiple) are added after it.
const forwarded = computed(
  () =>
    ({
      ...forwardedRaw.value,
      // DayPicker shows two-letter weekdays ("Su"): ask Reka for the short form and cut it.
      weekdayFormat: props.weekdayFormat ?? "short",
      ...(range.value ? {} : { multiple: props.mode === "multiple" }),
    }) as Record<string, unknown>
)

const parts = computed(() =>
  range.value
    ? {
        Root: RangeCalendarRoot,
        Prev: RangeCalendarPrev,
        Next: RangeCalendarNext,
        Grid: RangeCalendarGrid,
        GridHead: RangeCalendarGridHead,
        GridBody: RangeCalendarGridBody,
        GridRow: RangeCalendarGridRow,
        HeadCell: RangeCalendarHeadCell,
        Cell: RangeCalendarCell,
        CellTrigger: RangeCalendarCellTrigger,
      }
    : {
        Root: CalendarRoot,
        Prev: CalendarPrev,
        Next: CalendarNext,
        Grid: CalendarGrid,
        GridHead: CalendarGridHead,
        GridBody: CalendarGridBody,
        GridRow: CalendarGridRow,
        HeadCell: CalendarHeadCell,
        Cell: CalendarCell,
        CellTrigger: CalendarCellTrigger,
      }
)

const around = computed(() => props.navLayout === "around")
const c = computed(() => props.classNames ?? {})

const captionFormatter = computed(
  () => new DateFormatter(props.locale ?? "en", { month: "long", year: "numeric" })
)
function caption(month: DateValue) {
  return captionFormatter.value.format(month.toDate(getLocalTimeZone()))
}

function weekday(label: string) {
  return props.weekdayFormat ? label : label.slice(0, 2)
}

function isRange(value: unknown): value is DateRange {
  return typeof value === "object" && value !== null && "start" in value
}

function modifiersFor(
  day: DateValue,
  month: DateValue,
  current: unknown,
  cell: { selected: boolean; today: boolean; disabled: boolean; unavailable: boolean }
): CalendarDayModifiers {
  const modifiers: CalendarDayModifiers = {
    selected: cell.selected,
    today: cell.today,
    outside: !isSameMonth(day, month),
    disabled: cell.disabled,
    unavailable: cell.unavailable,
  }
  if (range.value && isRange(current) && current.start) {
    const { start, end } = current
    // One end picked: that day is both start and end, as in DayPicker.
    modifiers.range_start = isSameDay(day, start)
    modifiers.range_end = end ? isSameDay(day, end) : modifiers.range_start
    modifiers.range_middle = Boolean(end && day.compare(start) > 0 && day.compare(end) < 0)
    modifiers.selected = modifiers.range_start || modifiers.range_end || modifiers.range_middle
  }
  return modifiers
}

function dayClass(day: DateValue, month: DateValue, current: unknown) {
  const m = modifiersFor(day, month, current, { selected: false, today: false, disabled: false, unavailable: false })
  return cn(
    "size-8 p-0 text-center align-middle",
    c.value.day,
    m.range_start &&
      cn(
        "range-start [&:not(.range-end)]:bg-[linear-gradient(to_right,transparent_50%,var(--muted)_50%)]",
        c.value.range_start
      ),
    m.range_end &&
      cn(
        "range-end [&:not(.range-start)]:bg-[linear-gradient(to_left,transparent_50%,var(--muted)_50%)]",
        c.value.range_end
      ),
    m.range_middle && cn("bg-muted", c.value.range_middle),
    m.outside && !props.showOutsideDays && cn("invisible", c.value.hidden)
  )
}

const navButtonClass = "aria-disabled:pointer-events-none aria-disabled:opacity-40 disabled:opacity-40"
</script>

<template>
  <component
    :is="parts.Root"
    v-slot="{ grid, weekDays, modelValue: current }"
    data-slot="calendar"
    v-bind="forwarded"
    :class="cn('w-fit', c.root, 'w-fit text-foreground', props.class)"
  >
    <div :class="cn('flex flex-col gap-4 sm:flex-row', c.months)">
      <div
        v-for="(month, index) in grid"
        :key="month.value.toString()"
        :class="cn('relative flex w-fit flex-col gap-2', c.month)"
      >
        <component
          :is="parts.Prev"
          v-if="around && index === 0"
          as-child
        >
          <Button
            variant="outline"
            size="icon-sm"
            :class="cn(navButtonClass, 'absolute top-0 left-0', c.button_previous)"
          >
            <ChevronLeft />
          </Button>
        </component>
        <div :class="cn('flex h-7 items-center justify-center', c.month_caption)">
          <span role="status" aria-live="polite" :class="cn('text-sm font-medium', c.caption_label)">
            {{ caption(month.value) }}
          </span>
        </div>
        <component
          :is="parts.Next"
          v-if="around && index === grid.length - 1"
          as-child
        >
          <Button
            variant="outline"
            size="icon-sm"
            :class="cn(navButtonClass, 'absolute top-0 right-0', c.button_next)"
          >
            <ChevronRight />
          </Button>
        </component>
        <div v-if="!around && index === grid.length - 1" :class="cn('flex items-center justify-end gap-1', c.nav)">
          <component :is="parts.Prev" as-child>
            <Button variant="outline" size="icon-sm" :class="cn(navButtonClass, c.button_previous)">
              <ChevronLeft />
            </Button>
          </component>
          <component :is="parts.Next" as-child>
            <Button variant="outline" size="icon-sm" :class="cn(navButtonClass, c.button_next)">
              <ChevronRight />
            </Button>
          </component>
        </div>

        <component :is="parts.Grid" data-slot="calendar-grid" :class="cn('w-max border-collapse', c.month_grid)">
          <component :is="parts.GridHead">
            <component :is="parts.GridRow" :class="c.weekdays">
              <component
                :is="parts.HeadCell"
                v-for="label in weekDays"
                :key="label"
                :class="cn('size-8 p-0 text-center text-xs font-medium text-muted-foreground', c.weekday)"
              >
                {{ weekday(label) }}
              </component>
            </component>
          </component>
          <component :is="parts.GridBody">
            <component
              :is="parts.GridRow"
              v-for="(week, weekIndex) in month.rows"
              :key="`week-${weekIndex}`"
              :class="c.week"
            >
              <component
                :is="parts.Cell"
                v-for="day in week"
                :key="day.toString()"
                :date="day"
                :class="dayClass(day, month.value, current)"
              >
                <component :is="parts.CellTrigger" v-slot="cell" :day="day" :month="month.value" as-child>
                  <slot
                    name="day"
                    :day="day"
                    :month="month.value"
                    :day-value="cell.dayValue"
                    :modifiers="modifiersFor(day, month.value, current, cell)"
                  >
                    <CalendarDayButton
                      :modifiers="modifiersFor(day, month.value, current, cell)"
                      :class="c.day_button"
                    >
                      {{ cell.dayValue }}
                    </CalendarDayButton>
                  </slot>
                </component>
              </component>
            </component>
          </component>
        </component>
      </div>
    </div>
    <div v-if="$slots.footer || footer" role="status" aria-live="polite" :class="cn('pt-2 text-xs text-muted-foreground', c.footer)">
      <slot name="footer">{{ footer }}</slot>
    </div>
  </component>
</template>
