<script setup lang="ts">
import { Card } from "@/components/ui/card"
import {
  Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel"

const sheets = [
  { index: "01", title: "Paper", text: "The page is the surface." },
  { index: "02", title: "Ink", text: "One black, then quieter greys." },
  { index: "03", title: "Type", text: "Inter for the UI, Fraunces as an optional heading font." },
  { index: "04", title: "Pills", text: "Actions are round. Cards are not." },
]
</script>

<template>
  <Carousel autoplay class="mx-auto max-w-sm">
    <CarouselContent>
      <CarouselItem v-for="sheet in sheets" :key="sheet.index">
        <Card class="h-full min-h-40 justify-between gap-0 px-5">
          <span class="font-mono text-xs text-muted-foreground">{{ sheet.index }}</span>
          <div class="space-y-1">
            <p class="text-sm font-medium">{{ sheet.title }}</p>
            <p class="text-xs text-muted-foreground">{{ sheet.text }}</p>
          </div>
        </Card>
      </CarouselItem>
    </CarouselContent>
    <div class="flex items-center justify-between">
      <CarouselPrevious />
      <CarouselDots />
      <CarouselNext />
    </div>
  </Carousel>
</template>
