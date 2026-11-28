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
    data-slot="navigation-menu-backdrop"
    role="presentation"
    :data-state="open ? 'open' : 'closed'"
    :class="
      cn(
        'pointer-events-none fixed inset-0 z-0 hidden bg-background/40 backdrop-blur-sm data-[state=open]:block',
        props.class,
      )
    "
  />
</template>
