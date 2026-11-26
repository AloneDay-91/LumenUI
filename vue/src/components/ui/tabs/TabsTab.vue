<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { TabsTrigger, type TabsTriggerProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
</script>

<template>
  <TabsTrigger
    data-slot="tabs-tab"
    v-bind="delegated"
    :class="
      cn(
        'relative z-10 inline-flex h-7 items-center justify-center rounded-4xl px-3 text-xs font-medium whitespace-nowrap text-muted-foreground outline-none select-none',
        'hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50',
        'data-[state=active]:text-foreground',
        'group-data-[variant=line]/tabs-list:h-8 group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:px-2.5',
        'group-data-[variant=line]/tabs-list:data-[state=active]:text-(--tabs-active)',
        'data-[orientation=vertical]:w-full',
        props.class,
      )
    "
  >
    <slot />
  </TabsTrigger>
</template>
