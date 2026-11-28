<script setup lang="ts">
import { PreviewCard, PreviewCardContent, PreviewCardTrigger } from "@/components/ui/preview-card"
</script>

<template>
  <p class="text-sm">
    Discover
    <PreviewCard>
      <PreviewCardTrigger href="https://reka-ui.com" class="underline underline-offset-4">Reka UI</PreviewCardTrigger>
      <PreviewCardContent>
        <p class="text-sm font-medium">Reka UI</p>
        <p class="mt-1 text-sm text-muted-foreground">Accessible, unstyled Vue components.</p>
      </PreviewCardContent>
    </PreviewCard>.
  </p>
</template>
