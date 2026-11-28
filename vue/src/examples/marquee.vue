<script setup lang="ts">
import { Marquee } from "@/components/ui/marquee"

const names = ["Acme", "Globex", "Initech", "Umbrella", "Hooli", "Stark", "Wayne", "Soylent"]
</script>

<template>
  <Marquee class="w-full" aria-label="Customers">
    <span
      v-for="name in names"
      :key="name"
      class="font-serif text-lg font-medium whitespace-nowrap text-muted-foreground"
    >
      {{ name }}
    </span>
  </Marquee>
</template>
