<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
const model = defineModel<string>()
</script>

<template>
  <textarea
    v-model="model"
    data-slot="textarea"
    :class="
      cn(
        'flex field-sizing-content min-h-16 w-full resize-none rounded-2xl border border-border bg-transparent px-3 py-3 text-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 disabled:bg-input/50 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        props.class,
      )
    "
  />
</template>
