<script setup lang="ts">
import { Container } from "@/components/ui/container"
</script>

<template>
  <div class="w-full rounded-2xl bg-muted/50 py-4">
    <Container size="sm">
      <div class="rounded-xl bg-background px-3 py-6 text-center text-xs text-muted-foreground ring-1 ring-foreground/5">
        size="sm" · max-w-2xl
      </div>
    </Container>
  </div>
</template>
