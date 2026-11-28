<script setup lang="ts">
import { SelectRoot, useForwardPropsEmits, type SelectRootProps, type SelectRootEmits } from "reka-ui"

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SelectRoot v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </SelectRoot>
</template>
