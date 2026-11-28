<script setup lang="ts">
import { ComparisonSlider } from "@/components/ui/comparison-slider"
</script>

<template>
  <ComparisonSlider class="aspect-video max-w-xl" before-label="Light" after-label="Dark">
    <template #before>
      <img src="/images/lumen-showcase-poster.jpg" alt="Lumen in light mode" />
    </template>
    <template #after>
      <img src="/images/lumen-showcase-dark-poster.jpg" alt="Lumen in dark mode" />
    </template>
  </ComparisonSlider>
</template>
