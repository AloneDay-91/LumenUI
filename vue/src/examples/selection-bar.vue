<script setup lang="ts">
import { computed, ref } from "vue"
import { Archive, Tag, Trash2 } from "@lucide/vue"

import { Checkbox } from "@/components/ui/checkbox"
import { SelectionBar, SelectionBarAction } from "@/components/ui/selection-bar"

const files = [
  { id: "1", name: "Q4 report.pdf", size: "2.4 MB" },
  { id: "2", name: "Brand guidelines.fig", size: "18 MB" },
  { id: "3", name: "Invoices 2026.xlsx", size: "640 KB" },
  { id: "4", name: "Launch video.mp4", size: "6.4 MB" },
  { id: "5", name: "Contract draft.docx", size: "92 KB" },
]

const selected = ref<string[]>(["1", "3"])
const all = computed(() => selected.value.length === files.length)
const allState = computed(() => (all.value ? true : selected.value.length > 0 ? "indeterminate" : false))

function toggleAll(on: boolean | "indeterminate") {
  selected.value = on === true ? files.map((file) => file.id) : []
}
function toggle(id: string, on: boolean | "indeterminate") {
  selected.value = on === true ? [...selected.value, id] : selected.value.filter((item) => item !== id)
}
</script>

<template>
  <div class="relative w-full max-w-md pb-16">
    <ul class="m-0 flex list-none flex-col p-0 text-xs">
      <li class="flex items-center gap-3 border-b border-border px-2 py-2 text-muted-foreground">
        <Checkbox aria-label="Select all files" :model-value="allState" @update:model-value="toggleAll" />
        Name
        <span class="ms-auto">Size</span>
      </li>
      <li v-for="file in files" :key="file.id" class="flex items-center gap-3 border-b border-border px-2 py-2">
        <Checkbox
          :aria-label="`Select ${file.name}`"
          :model-value="selected.includes(file.id)"
          @update:model-value="(on) => toggle(file.id, on)"
        />
        {{ file.name }}
        <span class="ms-auto font-mono text-[11px] text-muted-foreground">{{ file.size }}</span>
      </li>
    </ul>
    <SelectionBar position="absolute" :count="selected.length" @clear="selected = []">
      <SelectionBarAction>
        <Tag data-icon="inline-start" />
        Tag
      </SelectionBarAction>
      <SelectionBarAction>
        <Archive data-icon="inline-start" />
        Archive
      </SelectionBarAction>
      <SelectionBarAction variant="destructive" @click="selected = []">
        <Trash2 data-icon="inline-start" />
        Delete
      </SelectionBarAction>
    </SelectionBar>
  </div>
</template>
