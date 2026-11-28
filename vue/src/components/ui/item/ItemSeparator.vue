<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import type { SeparatorProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const props = defineProps<SeparatorProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
</script>

<template>
  <Separator data-slot="item-separator" v-bind="delegated" :class="cn(props.class)" />
</template>
