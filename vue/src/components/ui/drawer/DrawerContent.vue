<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Primitive, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>(), { as: "div" })
</script>

<template>
  <Primitive
    data-slot="drawer-content"
    :as="as"
    :as-child="asChild"
    :class="cn('mx-auto flex w-full max-w-lg flex-col', props.class)"
  >
    <slot />
  </Primitive>
</template>
