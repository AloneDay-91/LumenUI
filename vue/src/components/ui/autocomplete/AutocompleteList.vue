<script setup lang="ts">
import { computed, inject, type HTMLAttributes } from "vue"
import { AutocompleteViewport, useForwardProps, type AutocompleteViewportProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { autocompleteItemsKey } from "./context"

const props = defineProps<AutocompleteViewportProps & { class?: HTMLAttributes["class"] }>()

defineSlots<{
  /** With `items` on Autocomplete, called once per item (`v-slot="{ item }"`); otherwise plain content. */
  default?: (props: { item: string; index: number }) => unknown
}>()

const items = inject(autocompleteItemsKey, undefined)

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <AutocompleteViewport
    data-slot="autocomplete-list"
    v-bind="forwarded"
    :class="cn('min-h-0 flex-1 scroll-fade overflow-y-auto', props.class)"
  >
    <template v-if="items">
      <template v-for="(item, index) in items" :key="item">
        <slot :item="item" :index="index" />
      </template>
    </template>
    <slot v-else :item="''" :index="-1" />
  </AutocompleteViewport>
</template>
