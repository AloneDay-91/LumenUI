<script setup lang="ts">
import { CopyButton } from "@/components/ui/copy-button"

const command = "npx @aloneday/lumenui@latest add copy-button"
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <CopyButton :value="command" />
    <CopyButton :value="command" variant="outline">Copy command</CopyButton>
  </div>
</template>
