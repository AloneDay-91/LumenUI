<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { buttonGroupVariants, type ButtonGroupVariantProps } from "."

const props = withDefaults(
  defineProps<{ orientation?: ButtonGroupVariantProps["orientation"]; class?: HTMLAttributes["class"] }>(),
  { orientation: "horizontal" }
)
</script>

<template>
  <div
    data-slot="button-group"
    role="group"
    :data-orientation="orientation"
    :class="cn(buttonGroupVariants({ orientation }), props.class)"
  >
    <slot />
  </div>
</template>
