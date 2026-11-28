<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import {
  AutocompleteAnchor,
  AutocompleteInput,
  useForwardPropsEmits,
  type AutocompleteInputEmits,
  type AutocompleteInputProps,
} from "reka-ui"

import { cn } from "@/lib/utils"
import { inputClassName } from "@/components/ui/styles"

const props = defineProps<AutocompleteInputProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<AutocompleteInputEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <!-- The input is the anchor the list opens under and takes its width from. -->
  <AutocompleteAnchor as-child>
    <AutocompleteInput data-slot="autocomplete-input" v-bind="forwarded" :class="cn(inputClassName, props.class)" />
  </AutocompleteAnchor>
</template>
