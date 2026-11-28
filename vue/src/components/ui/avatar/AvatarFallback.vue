<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { AvatarFallback, useForwardProps, type AvatarFallbackProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<AvatarFallbackProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <AvatarFallback
    data-slot="avatar-fallback"
    v-bind="forwarded"
    :class="cn('flex size-full items-center justify-center text-[37.5cqi] leading-none font-medium text-muted-foreground', props.class)"
  >
    <slot />
  </AvatarFallback>
</template>
