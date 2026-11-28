<script setup lang="ts">
import { computed, ref, type HTMLAttributes } from "vue"
import { Star } from "@lucide/vue"

import { cn } from "@/lib/utils"

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    max?: number
    defaultValue?: number
    readOnly?: boolean
    name?: string
    label?: string
  }>(),
  { max: 5, defaultValue: 0, readOnly: false, label: "Rating" }
)

const emit = defineEmits<{ valueChange: [value: number] }>()

/** v-model: controlled when bound, otherwise starts at defaultValue. */
const model = defineModel<number>()
const uncontrolled = ref(props.defaultValue)
const current = computed(() => clamp(model.value ?? uncontrolled.value, 0, props.max))
const hovered = ref<number | null>(null)
const displayed = computed(() => hovered.value ?? current.value)

const starClassName =
  "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground/40 transition-colors hover:text-foreground data-active:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"

function setScore(next: number) {
  if (props.readOnly) return
  const score = clamp(next, 0, props.max)
  uncontrolled.value = score
  model.value = score
  emit("valueChange", score)
}

function onKeydown(event: KeyboardEvent) {
  if (props.readOnly) return
  switch (event.key) {
    case "ArrowRight":
    case "ArrowUp":
      event.preventDefault()
      setScore(current.value + 1)
      break
    case "ArrowLeft":
    case "ArrowDown":
      event.preventDefault()
      setScore(current.value - 1)
      break
    case "Home":
      event.preventDefault()
      setScore(1)
      break
    case "End":
      event.preventDefault()
      setScore(props.max)
      break
    default:
      break
  }
}
</script>

<template>
  <div
    data-slot="rating"
    role="radiogroup"
    :aria-label="label"
    :aria-readonly="readOnly || undefined"
    :tabindex="readOnly ? undefined : 0"
    :class="
      cn(
        'inline-flex items-center gap-0.5 outline-none focus-visible:rounded-lg focus-visible:ring-3 focus-visible:ring-ring/30',
        readOnly && 'pointer-events-none',
        props.class,
      )
    "
    @keydown="onKeydown"
    @mouseleave="hovered = null"
  >
    <input v-if="name" type="hidden" :name="name" :value="current" />
    <button
      v-for="score in max"
      :key="score"
      type="button"
      role="radio"
      :aria-checked="score === current"
      :aria-label="`${score} of ${max}`"
      :tabindex="-1"
      :disabled="readOnly"
      :data-active="score <= displayed || undefined"
      :class="starClassName"
      @mouseenter="!readOnly && (hovered = score)"
      @click="setScore(score)"
    >
      <Star class="size-4" :fill="score <= displayed ? 'currentColor' : 'none'" />
    </button>
  </div>
</template>
