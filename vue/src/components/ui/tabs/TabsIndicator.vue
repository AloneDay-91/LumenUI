<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { TabsIndicator, type TabsIndicatorProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<TabsIndicatorProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
</script>

<template>
  <!-- Position and size come from tabs.css, fed by --reka-tabs-indicator-*. -->
  <TabsIndicator
    data-slot="tabs-indicator"
    v-bind="delegated"
    :class="
      cn(
        'rounded-4xl bg-background ring-1 ring-foreground/5 dark:ring-foreground/10',
        'group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:bg-(--tabs-line) group-data-[variant=line]/tabs-list:ring-0 group-data-[variant=line]/tabs-list:shadow-none',
        props.class,
      )
    "
  />
</template>
