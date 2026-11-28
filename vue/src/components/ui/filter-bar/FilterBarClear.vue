<script setup lang="ts">
import { X } from "@lucide/vue"

import { Button } from "@/components/ui/button"

/** Resets every filter. Render it only while one is active. */
</script>

<template>
  <Button data-slot="filter-bar-clear" variant="ghost" size="sm">
    <slot>Reset</slot>
    <X data-icon="inline-end" aria-hidden="true" />
  </Button>
</template>
