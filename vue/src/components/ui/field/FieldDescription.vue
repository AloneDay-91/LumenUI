<script setup lang="ts">
import { inject, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { fieldKey } from "./context"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
const field = inject(fieldKey, undefined)
</script>

<template>
  <p
    data-slot="field-description"
    :id="field?.descriptionId"
    :class="cn('text-xs text-muted-foreground', props.class)"
  >
    <slot />
  </p>
</template>
