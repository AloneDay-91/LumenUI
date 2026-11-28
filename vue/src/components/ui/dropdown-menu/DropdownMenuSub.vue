<script setup lang="ts">
import { DropdownMenuSub, useForwardPropsEmits, type DropdownMenuSubProps, type DropdownMenuSubEmits } from "reka-ui"

const props = defineProps<DropdownMenuSubProps>()
const emits = defineEmits<DropdownMenuSubEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DropdownMenuSub v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </DropdownMenuSub>
</template>
