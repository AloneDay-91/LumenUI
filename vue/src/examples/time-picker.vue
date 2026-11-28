<script setup lang="ts">
import { ref } from "vue"

import { TimePicker } from "@/components/ui/time-picker"

const time = ref("14:30")
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <TimePicker v-model="time" aria-label="Meeting time" />
    <p class="m-0 font-mono text-xs text-muted-foreground">value: {{ time }}</p>
  </div>
</template>
