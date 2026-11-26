<script setup lang="ts">
import { inject, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { fieldKey } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  /** Show the message even when the Field is not invalid. */
  forceShow?: boolean
}>()
const field = inject(fieldKey, undefined)
</script>

<template>
  <p
    v-if="forceShow || !field || field.invalid.value"
    data-slot="field-error"
    :id="field?.errorId"
    aria-live="polite"
    :class="cn('text-xs text-destructive', props.class)"
  >
    <slot />
  </p>
</template>
