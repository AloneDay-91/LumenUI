<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
</script>

<template>
  <Card size="sm" variant="secondary" class="h-32 w-56 overflow-hidden py-0">
    <ScrollArea class="h-32">
      <CardContent class="py-3">
        <p class="text-sm leading-6">
          Inter, Fraunces, JetBrains Mono. Semantic tokens, pills, warm paper. Copy-paste, not a
          library. Reka UI for behavior. CVA for variants. The chrome stays Lumen.
        </p>
      </CardContent>
    </ScrollArea>
  </Card>
</template>
