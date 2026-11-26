<script setup lang="ts">
import { inject, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { fieldKey } from "./context"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
const field = inject(fieldKey, undefined)
</script>

<template>
  <label
    data-slot="field-label"
    :for="field?.controlId"
    :data-disabled="field?.disabled.value ? '' : undefined"
    :class="cn('text-xs font-medium data-disabled:opacity-50', props.class)"
  >
    <slot />
  </label>
</template>
