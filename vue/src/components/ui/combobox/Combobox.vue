<script setup lang="ts">
import { ComboboxRoot, useForwardPropsEmits, type ComboboxRootEmits, type ComboboxRootProps } from "reka-ui"

// Opens when the input is clicked, like Base UI's openOnInputClick default.
const props = withDefaults(defineProps<ComboboxRootProps>(), { openOnClick: true })
const emits = defineEmits<ComboboxRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <ComboboxRoot v-slot="slotProps" data-slot="combobox" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </ComboboxRoot>
</template>
