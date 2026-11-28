<script setup lang="ts">
import { MenubarTrigger, useForwardProps, type MenubarTriggerProps } from "reka-ui"

const props = defineProps<MenubarTriggerProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <!-- Same data-slot as the React MenuTrigger used inside a Menubar. -->
  <MenubarTrigger data-slot="dropdown-menu-trigger" v-bind="forwarded">
    <slot />
  </MenubarTrigger>
</template>
