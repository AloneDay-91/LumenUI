<script setup lang="ts">
import { computed, ref, type HTMLAttributes } from "vue"
import { Plus } from "@lucide/vue"

import { Button } from "@/components/ui/button"
import { Menu, MenuCheckboxItem, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@/components/ui/menu"
import { cn } from "@/lib/utils"
import type { FilterOption } from "."

/**
 * One facet: a dashed pill while empty, then a solid pill that names what is
 * picked. Opens a menu of checkboxes that stays open while you tick.
 */
const props = withDefaults(
  defineProps<{
    label: string
    options: FilterOption[]
    /** The picked values. Bind with v-model. */
    modelValue?: string[]
    defaultValue?: string[]
    clearLabel?: string
    /** Picked labels shown in the pill before it switches to "n selected". */
    maxShown?: number
    class?: HTMLAttributes["class"]
  }>(),
  { modelValue: undefined, defaultValue: () => [], clearLabel: "Clear filter", maxShown: 2 },
)

const emit = defineEmits<{ "update:modelValue": [value: string[]] }>()

defineSlots<{
  /** Replaces an option's label in the menu and in the pill. */
  option?: (props: { option: FilterOption }) => unknown
}>()

const uncontrolled = ref<string[]>([...props.defaultValue])
const selected = computed(() => props.modelValue ?? uncontrolled.value)
const active = computed(() => selected.value.length > 0)
const picked = computed(() => props.options.filter((option) => selected.value.includes(option.value)))

function set(next: string[]) {
  if (props.modelValue === undefined) uncontrolled.value = next
  emit("update:modelValue", next)
}

function toggle(option: FilterOption, checked: boolean | "indeterminate") {
  set(checked === true ? [...selected.value, option.value] : selected.value.filter((item) => item !== option.value))
}
</script>

<template>
  <Menu>
    <MenuTrigger as-child>
      <Button
        data-slot="filter-select"
        :data-active="active ? '' : undefined"
        variant="outline"
        size="sm"
        :class="cn(!active && 'border-dashed text-muted-foreground', active && 'max-w-72', props.class)"
      >
        <Plus v-if="!active" data-icon="inline-start" aria-hidden="true" />
        <span :class="cn(active && 'text-muted-foreground')">{{ label }}</span>
        <template v-if="active">
          <span aria-hidden="true" class="h-3.5 w-px bg-border" />
          <span class="min-w-0 truncate font-medium text-foreground">
            <template v-if="picked.length > maxShown">{{ picked.length }} selected</template>
            <template v-else>
              <template v-for="(option, index) in picked" :key="option.value"
                ><template v-if="index > 0">, </template
                ><slot name="option" :option="option">{{ option.label }}</slot></template
              >
            </template>
          </span>
        </template>
      </Button>
    </MenuTrigger>
    <MenuContent align="start" class="w-auto min-w-48">
      <MenuCheckboxItem
        v-for="option in options"
        :key="option.value"
        :model-value="selected.includes(option.value)"
        @update:model-value="(checked: boolean | 'indeterminate') => toggle(option, checked)"
        @select.prevent
      >
        <span class="flex-1"><slot name="option" :option="option">{{ option.label }}</slot></span>
        <span v-if="option.count !== undefined" class="font-mono text-muted-foreground tabular-nums">
          {{ option.count }}
        </span>
      </MenuCheckboxItem>
      <template v-if="active">
        <MenuSeparator />
        <MenuItem @select="set([])">{{ clearLabel }}</MenuItem>
      </template>
    </MenuContent>
  </Menu>
</template>
