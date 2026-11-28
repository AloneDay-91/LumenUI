<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"

import { MessageScroller } from "@/components/ui/message-scroller"

const lines = ref(Array.from({ length: 6 }, (_, i) => `Line ${i + 1}`))
let id: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  id = setInterval(() => {
    if (lines.value.length <= 60) lines.value.push(`Line ${lines.value.length + 1}`)
  }, 900)
})
onBeforeUnmount(() => clearInterval(id))
</script>

<template>
  <MessageScroller class="h-48 w-full max-w-md rounded-2xl border border-border" aria-label="Streaming log">
    <ol class="m-0 flex list-none flex-col gap-1 p-3 font-mono text-xs text-muted-foreground">
      <li v-for="line in lines" :key="line">{{ line }}</li>
    </ol>
  </MessageScroller>
</template>
