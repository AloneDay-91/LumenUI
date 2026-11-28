<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Check } from "@lucide/vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

const indicatorClassName = [
  "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
  "group-data-[status=complete]/step:border-foreground group-data-[status=complete]/step:bg-foreground group-data-[status=complete]/step:text-background",
  "group-data-[status=current]/step:border-foreground group-data-[status=current]/step:bg-background group-data-[status=current]/step:text-foreground group-data-[status=current]/step:ring-2 group-data-[status=current]/step:ring-foreground/15",
  "group-data-[status=upcoming]/step:border-border group-data-[status=upcoming]/step:bg-background group-data-[status=upcoming]/step:text-muted-foreground",
]
</script>

<template>
  <div data-slot="stepper-indicator" :class="cn(indicatorClassName, props.class)">
    <span class="group-data-[status=complete]/step:hidden"><slot /></span>
    <Check class="hidden size-3.5 group-data-[status=complete]/step:block" />
  </div>
</template>
