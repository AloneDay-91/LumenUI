<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { injectNavigationMenuContext } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
const menu = injectNavigationMenuContext()
const open = computed(() => !!menu.modelValue.value)
</script>

<template>
  <div
    data-slot="navigation-menu-popup"
    :data-state="open ? 'open' : 'closed'"
    :class="
      cn(
        'relative z-10 w-full overflow-hidden border-b border-transparent bg-background text-foreground duration-150 data-[state=open]:border-border data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-1 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
