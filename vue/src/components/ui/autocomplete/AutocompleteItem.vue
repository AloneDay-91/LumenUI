<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import {
  AutocompleteItem,
  useForwardPropsEmits,
  type AutocompleteItemEmits,
  type AutocompleteItemProps,
} from "reka-ui"

import { cn } from "@/lib/utils"
import { menuItemClassName } from "@/components/ui/styles"

const props = defineProps<AutocompleteItemProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<AutocompleteItemEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <AutocompleteItem data-slot="autocomplete-item" v-bind="forwarded" :class="cn(menuItemClassName, props.class)">
    <slot />
  </AutocompleteItem>
</template>
