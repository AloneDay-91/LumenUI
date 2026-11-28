<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { injectTabsRootContext, TabsList, type TabsListProps } from "reka-ui"

import { cn } from "@/lib/utils"
import type { TabsListVariant, TabsTone } from "."

import "./tabs.css"

const props = withDefaults(
  defineProps<
    TabsListProps & {
      class?: HTMLAttributes["class"]
      variant?: TabsListVariant
      color?: TabsTone
      highContrast?: boolean
    }
  >(),
  { variant: "pill", highContrast: false }
)

const root = injectTabsRootContext()
const delegated = computed(() => {
  const { class: _class, variant: _variant, color: _color, highContrast: _hc, ...rest } = props
  return rest
})
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    v-bind="delegated"
    :data-variant="variant"
    :data-color="color"
    :data-orientation="root.orientation.value"
    :data-high-contrast="highContrast ? 'true' : undefined"
    :class="
      cn(
        'group/tabs-list relative z-1 flex w-fit',
        variant === 'pill' && 'gap-0.5 rounded-4xl bg-muted p-0.5',
        variant === 'line' && 'gap-1 border-b border-border',
        'data-[orientation=vertical]:flex-col',
        variant === 'line' && 'data-[orientation=vertical]:border-r data-[orientation=vertical]:border-b-0',
        props.class,
      )
    "
  >
    <slot />
  </TabsList>
</template>
