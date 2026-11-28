<script setup lang="ts">
import { ref } from "vue"
import { AlignCenter, AlignLeft, AlignRight } from "@lucide/vue"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const alignment = ref(["center"])
const formatting = ref(["bold"])
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-4">
    <ToggleGroup v-model="alignment" aria-label="Alignment">
      <ToggleGroupItem value="left" aria-label="Left"><AlignLeft /></ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Center"><AlignCenter /></ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Right"><AlignRight /></ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup v-model="formatting" multiple aria-label="Formatting">
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>
