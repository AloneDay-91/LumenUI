<script setup lang="ts">
import { ToolbarButton } from "reka-ui"

import { Button } from "@/components/ui/button"
import type { ButtonVariantProps } from "@/components/ui/button"

/** A button inside the bar, part of its arrow-key order. */
withDefaults(
  defineProps<{
    variant?: ButtonVariantProps["variant"]
    disabled?: boolean
    loading?: boolean
  }>(),
  { variant: "ghost" }
)
</script>

<template>
  <ToolbarButton as-child :disabled="disabled">
    <Button :variant="variant" size="sm" :disabled="disabled" :loading="loading">
      <slot />
    </Button>
  </ToolbarButton>
</template>
