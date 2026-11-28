<script setup lang="ts">
import { computed } from "vue"

import { Button } from "@/components/ui/button"
import type { PaginationLinkProps } from "."

const props = withDefaults(defineProps<PaginationLinkProps>(), { as: "button", size: "icon-sm" })

const delegated = computed(() => {
  const { isActive: _isActive, variant: _variant, ...rest } = props
  return rest
})
</script>

<template>
  <Button
    data-slot="pagination-link"
    :aria-current="isActive ? 'page' : undefined"
    v-bind="delegated"
    :variant="variant ?? (isActive ? 'secondary' : 'ghost')"
  >
    <slot />
  </Button>
</template>
