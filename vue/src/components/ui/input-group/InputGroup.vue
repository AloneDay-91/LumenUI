<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const groupClassName = [
  "group/input-group relative flex h-8 w-full min-w-0 items-center rounded-2xl border border-border bg-transparent transition-colors",
  "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30",
  "has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20",
  "has-disabled:pointer-events-none has-disabled:opacity-50",
  "[&_[data-slot=input]]:h-full [&_[data-slot=input]]:min-w-0 [&_[data-slot=input]]:flex-1",
  "[&_[data-slot=input]]:rounded-none [&_[data-slot=input]]:border-0 [&_[data-slot=input]]:bg-transparent",
  "[&_[data-slot=input]]:shadow-none [&_[data-slot=input]]:focus-visible:border-transparent [&_[data-slot=input]]:focus-visible:ring-0",
  // The group owns the fill and the rings. Without the dark, disabled, and invalid
  // overrides, the Input painted its own layer over the group's and the text area
  // read as a second colour next to the icon.
  "dark:[&_[data-slot=input]]:bg-transparent dark:[&_[data-slot=input]]:disabled:bg-transparent",
  "[&_[data-slot=input]]:aria-invalid:border-transparent [&_[data-slot=input]]:aria-invalid:ring-0",
  "dark:[&_[data-slot=input]]:aria-invalid:border-transparent dark:[&_[data-slot=input]]:aria-invalid:ring-0",
]

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="input-group" role="group" :class="cn(groupClassName, props.class)">
    <slot />
  </div>
</template>
