<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { AutocompleteEmpty, useForwardProps, type AutocompleteEmptyProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<AutocompleteEmptyProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <AutocompleteEmpty
    data-slot="autocomplete-empty"
    v-bind="forwarded"
    :class="cn('px-2 py-1.5 text-xs text-muted-foreground', props.class)"
  >
    <slot />
  </AutocompleteEmpty>
</template>
