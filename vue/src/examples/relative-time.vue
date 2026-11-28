<script setup lang="ts">
import { RelativeTime } from "@/components/ui/relative-time"

const now = Date.now()
const dates = [
  ["Just now", now - 5_000],
  ["Minutes", now - 7 * 60_000],
  ["Hours", now - 5 * 3_600_000],
  ["Yesterday", now - 26 * 3_600_000],
  ["Weeks", now - 15 * 86_400_000],
  ["Future", now + 3 * 86_400_000],
] as const
</script>

<template>
  <dl class="m-0 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-xs">
    <template v-for="[label, date] in dates" :key="label">
      <dt class="text-muted-foreground">{{ label }}</dt>
      <dd class="m-0"><RelativeTime :date="date" /></dd>
    </template>
  </dl>
</template>
