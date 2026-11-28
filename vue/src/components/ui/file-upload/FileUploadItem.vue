<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { File as FileIcon, X } from "@lucide/vue"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatBytes } from "./utils"

const props = defineProps<{
  file: File
  removeLabel?: string
  class?: HTMLAttributes["class"]
  /** Bound with @remove. The remove button only renders when a listener is set. */
  onRemove?: () => void
}>()

const label = computed(() => props.removeLabel ?? `Remove ${props.file.name}`)

const removeClass = cn(buttonVariants({ variant: "ghost", size: "icon-xs" }), "text-muted-foreground hover:text-foreground")
</script>

<template>
  <li
    data-slot="file-upload-item"
    :class="
      cn(
        'flex items-center gap-2.5 rounded-2xl bg-card px-3 py-2 text-xs ring-1 ring-foreground/5 dark:ring-foreground/10',
        props.class,
      )
    "
  >
    <FileIcon aria-hidden="true" class="size-4 shrink-0 text-muted-foreground" />
    <span class="min-w-0 flex-1 truncate font-medium">{{ file.name }}</span>
    <span class="shrink-0 font-mono text-muted-foreground tabular-nums">{{ formatBytes(file.size) }}</span>
    <slot />
    <button v-if="onRemove" type="button" :aria-label="label" :class="removeClass" @click="onRemove()">
      <X />
    </button>
  </li>
</template>
