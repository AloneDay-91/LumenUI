<script setup lang="ts">
import { ref } from "vue"

import { toneNames, toneSwatches } from "./data"

defineProps<{ tone: number; label: string }>()
const emit = defineEmits<{ change: [tone: number] }>()

const open = ref(false)

function pick(i: number) {
  emit("change", i)
  open.value = false
}
</script>

<template>
  <div class="relative">
    <button
      type="button"
      :aria-label="`${label}: ${toneNames[tone]}`"
      :aria-expanded="open"
      class="flex size-8 items-center justify-center rounded-full outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30"
      @click="open = !open"
    >
      <span class="size-4 rounded-full ring-1 ring-foreground/10" :style="{ backgroundColor: toneSwatches[tone] }" />
    </button>
    <div
      v-if="open"
      role="radiogroup"
      :aria-label="label"
      class="absolute end-0 top-9 z-20 flex gap-1 rounded-full bg-popover p-1 shadow-lg ring-1 ring-foreground/5"
      @keydown.esc="open = false"
    >
      <button
        v-for="(swatch, i) in toneSwatches"
        :key="swatch"
        type="button"
        role="radio"
        :aria-checked="tone === i"
        :aria-label="toneNames[i]"
        class="flex size-6 items-center justify-center rounded-full outline-none aria-checked:ring-2 aria-checked:ring-ring focus-visible:ring-3 focus-visible:ring-ring/40"
        @click="pick(i)"
      >
        <span class="size-4 rounded-full ring-1 ring-foreground/10" :style="{ backgroundColor: swatch }" />
      </button>
    </div>
  </div>
</template>
