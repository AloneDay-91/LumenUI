<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { MenubarSeparator, type MenubarSeparatorProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<MenubarSeparatorProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
</script>

<template>
  <MenubarSeparator
    data-slot="dropdown-menu-separator"
    v-bind="delegated"
    :class="cn('-mx-1 my-1 h-px bg-border/50', props.class)"
  />
</template>
