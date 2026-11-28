<script setup lang="ts">
import { computed, inject, watch, type HTMLAttributes } from "vue"
import { Search } from "@lucide/vue"
import { ListboxFilter, useForwardProps, type ListboxFilterProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { commandContextKey } from "./context"

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<
    Omit<ListboxFilterProps, "modelValue"> & {
      /** The search text. Can be bound with `v-model`. */
      modelValue?: string
      class?: HTMLAttributes["class"]
    }
  >(),
  { modelValue: undefined },
)
const emit = defineEmits<{ "update:modelValue": [value: string] }>()

const context = inject(commandContextKey)!

watch(
  () => props.modelValue,
  (value) => {
    if (value !== undefined) context.search.value = value
  },
  { immediate: true },
)

const delegated = computed(() => {
  const { class: _class, modelValue: _modelValue, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)

function onUpdate(value: string) {
  context.search.value = value
  emit("update:modelValue", value)
}
</script>

<template>
  <div
    data-slot="command-input-wrapper"
    class="flex h-11 items-center gap-2 border-b border-foreground/5 px-3 dark:border-foreground/10"
  >
    <Search class="size-4 shrink-0 text-muted-foreground" />
    <ListboxFilter
      data-slot="command-input"
      v-bind="{ ...$attrs, ...forwarded }"
      :model-value="context.search.value"
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
      :class="
        cn(
          'h-full w-full min-w-0 bg-transparent text-xs outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:opacity-50',
          props.class,
        )
      "
      @update:model-value="onUpdate"
    />
  </div>
</template>
