<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { MenubarRoot, useForwardPropsEmits, type MenubarRootEmits, type MenubarRootProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<MenubarRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<MenubarRootEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <MenubarRoot
    v-slot="slotProps"
    data-slot="menubar"
    v-bind="forwarded"
    :class="cn('flex h-9 items-center gap-0.5 rounded-4xl border border-border bg-background p-1', props.class)"
  >
    <slot v-bind="slotProps" />
  </MenubarRoot>
</template>
