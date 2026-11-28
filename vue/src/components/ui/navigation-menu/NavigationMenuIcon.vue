<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { injectNavigationMenuContext, injectNavigationMenuItemContext, Primitive, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"

/** Goes inside NavigationMenuTrigger, e.g. around a ChevronDown; turns over while its panel is open. */
const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>(), {
  as: "span",
})

const menu = injectNavigationMenuContext()
const item = injectNavigationMenuItemContext()
const open = computed(() => menu.modelValue.value === item.value)
</script>

<template>
  <Primitive
    data-slot="navigation-menu-icon"
    aria-hidden="true"
    :as="as"
    :as-child="asChild"
    :data-state="open ? 'open' : 'closed'"
    :class="cn('ml-1 inline-flex size-3 transition duration-200 data-[state=open]:rotate-180', props.class)"
  >
    <slot />
  </Primitive>
</template>
