<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Brain } from "@lucide/vue"
import type { AcceptableValue } from "reka-ui"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { defaultEfforts, type EffortOption, type ModelOption } from "."

/**
 * Two small menus for the composer toolbar: which model runs, and how hard
 * it thinks. The effort menu hides for models that do not reason.
 */
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    models: ModelOption[]
    efforts?: EffortOption[]
    showEffort?: boolean
    labels?: { model?: string; effort?: string }
  }>(),
  { efforts: () => defaultEfforts, showEffort: true, labels: () => ({}) }
)

/** v-model:model — the selected model value. */
const model = defineModel<string>("model", { required: true })
/** v-model:effort — the effort menu only shows when this is bound. */
const effort = defineModel<string>("effort")

const labelFor = (options: { value: string; label: string }[], value: string | undefined) =>
  options.find((option) => option.value === value)?.label ?? value

const modelLabel = computed(() => labelFor(props.models, model.value))
const effortLabel = computed(() => labelFor(props.efforts, effort.value))

function onModel(value: AcceptableValue) {
  if (value) model.value = String(value)
}
function onEffort(value: AcceptableValue) {
  if (value) effort.value = String(value)
}
</script>

<template>
  <div data-slot="model-selector" :class="cn('flex items-center gap-1', props.class)">
    <Select :model-value="model" @update:model-value="onModel">
      <SelectTrigger
        size="sm"
        :aria-label="labels.model ?? 'Model'"
        class="border-transparent bg-transparent hover:bg-muted dark:bg-transparent"
      >
        <SelectValue>{{ modelLabel }}</SelectValue>
      </SelectTrigger>
      <SelectContent position="popper" align="start" class="w-auto min-w-56">
        <SelectItem v-for="option in models" :key="option.value" :value="option.value">
          <span class="flex flex-col gap-0.5">
            <span>{{ option.label }}</span>
            <span v-if="option.description" class="text-[11px] whitespace-normal text-muted-foreground">
              {{ option.description }}
            </span>
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
    <Select v-if="showEffort && effort !== undefined" :model-value="effort" @update:model-value="onEffort">
      <SelectTrigger
        size="sm"
        :aria-label="labels.effort ?? 'Reasoning effort'"
        class="border-transparent bg-transparent text-muted-foreground hover:bg-muted dark:bg-transparent"
      >
        <Brain aria-hidden="true" class="size-3.5" />
        <SelectValue>{{ effortLabel }}</SelectValue>
      </SelectTrigger>
      <SelectContent position="popper" align="start">
        <SelectItem v-for="option in efforts" :key="option.value" :value="option.value">
          {{ option.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
