<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Check, CircleAlert, Circle } from "@lucide/vue"

import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import type { TraceStatus } from "./context"

/** Small status mark: an empty ring, a Spinner, a jade check, a crimson alert. */
const props = defineProps<{ status: TraceStatus; class?: HTMLAttributes["class"] }>()

const base = computed(() => cn("size-3.5 shrink-0", props.class))
</script>

<template>
  <Spinner v-if="status === 'running'" :role="undefined" :aria-label="undefined" aria-hidden="true" :class="base" />
  <Check v-else-if="status === 'done'" aria-hidden="true" :class="cn(base, 'text-jade-ink')" />
  <CircleAlert v-else-if="status === 'error'" aria-hidden="true" :class="cn(base, 'text-crimson-ink')" />
  <Circle v-else aria-hidden="true" :class="cn(base, 'text-muted-foreground/60')" />
</template>
