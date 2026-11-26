<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { AvatarRoot, useForwardProps, type AvatarRootProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<AvatarRootProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <AvatarRoot
    data-slot="avatar"
    v-bind="forwarded"
    :class="cn('relative flex size-8 shrink-0 overflow-hidden rounded-full bg-muted @container', props.class)"
  >
    <slot />
  </AvatarRoot>
</template>
