<script setup lang="ts">
import { ref } from "vue"

import { Suggestion, Suggestions } from "@/components/ui/suggestion"

const prompts = ["Summarise this page", "Show me an example", "What changed in 1.1?", "Compare with shadcn"]
const picked = ref<string | null>(null)
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <Suggestions>
      <Suggestion v-for="text in prompts" :key="text" :suggestion="text" @select="picked = $event" />
    </Suggestions>
    <p class="m-0 text-xs text-muted-foreground">{{ picked ? `Sent: ${picked}` : "Nothing sent yet." }}</p>
  </div>
</template>
