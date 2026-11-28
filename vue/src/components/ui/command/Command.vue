<script setup lang="ts">
import { computed, nextTick, onMounted, provide, reactive, ref, watch, type HTMLAttributes } from "vue"
import { ListboxRoot, useForwardProps, type ListboxRootProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { commandContextKey, defaultCommandFilter, type CommandFilter, type CommandItemEntry } from "./context"

const props = withDefaults(
  defineProps<
    Omit<ListboxRootProps, "modelValue" | "defaultValue" | "multiple" | "selectionBehavior"> & {
      /** The highlighted item's value, like cmdk's `value`. Can be bound with `v-model`. */
      modelValue?: string
      /** Scores each item against the search. Return 0 to hide it. */
      filter?: CommandFilter
      /** Set to false to filter items yourself (async search). */
      shouldFilter?: boolean
      class?: HTMLAttributes["class"]
    }
  >(),
  { highlightOnHover: true, shouldFilter: true, modelValue: undefined, filter: undefined },
)
const emit = defineEmits<{ "update:modelValue": [value: string] }>()

const delegated = computed(() => {
  const { class: _class, modelValue: _modelValue, filter: _filter, shouldFilter: _shouldFilter, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)

const listbox = ref<InstanceType<typeof ListboxRoot> | null>(null)
const search = ref("")
const items = reactive(new Map<string, CommandItemEntry>())

const scores = computed(() => {
  const map = new Map<string, number>()
  const filter = props.filter ?? defaultCommandFilter
  for (const [id, entry] of items) {
    map.set(id, !props.shouldFilter || !search.value ? 1 : filter(entry.value, search.value, entry.keywords))
  }
  return map
})

const isItemVisible = (id: string) => {
  const entry = items.get(id)
  return !!entry && (entry.forceMount || (scores.value.get(id) ?? 0) > 0)
}

const visibleCount = computed(() => [...items.keys()].filter(isItemVisible).length)

provide(commandContextKey, {
  search,
  shouldFilter: computed(() => props.shouldFilter),
  register: (id, entry) => items.set(id, entry),
  unregister: (id) => items.delete(id),
  isItemVisible,
  isGroupVisible: (groupId) => [...items].some(([id, entry]) => entry.groupId === groupId && isItemVisible(id)),
  visibleCount,
})

// cmdk keeps the first match highlighted while typing and on open.
watch(search, () => listbox.value?.highlightFirstItem())
onMounted(() =>
  nextTick(() => {
    if (props.modelValue !== undefined) listbox.value?.highlightItem(props.modelValue)
    else listbox.value?.highlightFirstItem()
  }),
)
watch(
  () => props.modelValue,
  (value) => {
    if (value !== undefined) listbox.value?.highlightItem(value)
  },
)

function onHighlight(payload: { value: unknown } | undefined) {
  if (payload && typeof payload.value === "string" && payload.value !== props.modelValue) {
    emit("update:modelValue", payload.value)
  }
}
</script>

<template>
  <ListboxRoot
    ref="listbox"
    data-slot="command"
    v-bind="forwarded"
    :class="cn('flex h-full w-full flex-col overflow-hidden rounded-2xl bg-popover text-popover-foreground', props.class)"
    @highlight="onHighlight"
  >
    <slot />
  </ListboxRoot>
</template>
