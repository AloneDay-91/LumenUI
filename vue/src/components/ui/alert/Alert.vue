<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { alertVariants, type AlertVariantProps } from "."

const props = defineProps<{
  class?: HTMLAttributes["class"]
  variant?: AlertVariantProps["variant"]
  role?: string
}>()
</script>

<template>
  <div
    data-slot="alert"
    :data-variant="variant ?? 'default'"
    :role="role ?? (variant === 'destructive' ? 'alert' : 'status')"
    :class="cn(alertVariants({ variant }), props.class)"
  >
    <slot />
  </div>
</template>
