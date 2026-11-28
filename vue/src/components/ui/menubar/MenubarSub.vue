<script setup lang="ts">
import { MenubarSub, useForwardPropsEmits, type MenubarSubEmits, type MenubarSubProps } from "reka-ui"

const props = defineProps<MenubarSubProps>()
const emits = defineEmits<MenubarSubEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <MenubarSub v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </MenubarSub>
</template>
