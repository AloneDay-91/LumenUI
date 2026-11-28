<script setup lang="ts">
import { Stack } from "@/components/ui/stack"
</script>

<template>
  <Stack gap="sm" class="w-48">
    <div v-for="label in ['One', 'Two', 'Three']" :key="label" class="rounded-xl bg-muted px-3 py-2 text-xs text-muted-foreground">
      {{ label }}
    </div>
  </Stack>
</template>
