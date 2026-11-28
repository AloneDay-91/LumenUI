<script setup lang="ts">
import { computed, provide } from "vue"
import {
  AutocompleteRoot,
  useForwardPropsEmits,
  type AutocompleteRootEmits,
  type AutocompleteRootProps,
} from "reka-ui"

import { autocompleteItemsKey } from "./context"

const props = defineProps<
  AutocompleteRootProps & {
    /** Options to suggest. AutocompleteList renders its slot once per item and filters them as you type. */
    items?: readonly string[]
  }
>()
const emits = defineEmits<AutocompleteRootEmits>()

const delegated = computed(() => {
  const { items: _items, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)

provide(
  autocompleteItemsKey,
  computed(() => props.items),
)
</script>

<template>
  <AutocompleteRoot v-slot="slotProps" data-slot="autocomplete" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </AutocompleteRoot>
</template>
