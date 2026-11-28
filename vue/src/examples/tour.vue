<script setup lang="ts">
import { ref } from "vue"
import { Button } from "@/components/ui/button"
import { Tour, type TourStep } from "@/components/ui/tour"

const steps: TourStep[] = [
  {
    target: "[data-tour='search']",
    title: "Search everything",
    description: "Components, guides, and tokens. Press ⌘K from anywhere.",
  },
  {
    target: "[data-tour='create']",
    title: "Start a project",
    description: "Pick a template; you can change every token later in Customize.",
  },
  {
    target: "[data-tour='invite']",
    title: "Invite your team",
    description: "Teammates see the same tokens and the same components.",
  },
]

const open = ref(false)
</script>

<template>
  <div class="flex w-full max-w-md flex-col items-center gap-6">
    <div class="flex w-full items-center gap-2 rounded-2xl border border-border p-2">
      <Button
        data-tour="search"
        variant="secondary"
        size="sm"
        class="flex-1 justify-start text-muted-foreground"
      >
        Search…
      </Button>
      <Button data-tour="create" size="sm">New project</Button>
      <Button data-tour="invite" variant="outline" size="sm">Invite</Button>
    </div>
    <Button variant="outline" @click="open = true">Start the tour</Button>
    <Tour v-model:open="open" :steps="steps" />
  </div>
</template>
