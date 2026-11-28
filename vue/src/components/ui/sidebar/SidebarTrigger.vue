<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { PanelLeft, PanelRight } from "@lucide/vue"

import { Button, type ButtonVariantProps } from "@/components/ui/button"
import { useSidebar } from "./context"

/** A ghost icon Button that toggles the sidebar. The default slot replaces the panel icon. */
const props = withDefaults(
  defineProps<{
    variant?: ButtonVariantProps["variant"]
    size?: ButtonVariantProps["size"]
    class?: HTMLAttributes["class"]
  }>(),
  { variant: "ghost", size: "icon" },
)

const { toggleSidebar, side } = useSidebar()
const Icon = computed(() => (side.value === "right" ? PanelRight : PanelLeft))
</script>

<template>
  <Button data-slot="sidebar-trigger" :variant="variant" :size="size" :class="props.class" @click="toggleSidebar">
    <slot><component :is="Icon" /></slot>
    <span class="sr-only">Toggle sidebar</span>
  </Button>
</template>
