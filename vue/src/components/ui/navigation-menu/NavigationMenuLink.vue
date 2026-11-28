<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { NavigationMenuLink, type NavigationMenuLinkEmits, type NavigationMenuLinkProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { navigationMenuLinkVariants, type NavigationMenuLinkVariantProps } from "./variants"

const props = withDefaults(
  defineProps<
    NavigationMenuLinkProps & {
      class?: HTMLAttributes["class"]
      variant?: NavigationMenuLinkVariantProps["variant"]
      /** Close the menu when the link is chosen. */
      closeOnClick?: boolean
    }
  >(),
  { variant: "default", closeOnClick: true, as: "a" },
)
const emits = defineEmits<NavigationMenuLinkEmits>()

const delegated = computed(() => {
  const { class: _class, variant: _variant, closeOnClick: _closeOnClick, ...rest } = props
  return rest
})

function onSelect(event: CustomEvent<{ originalEvent: Event }>) {
  emits("select", event)
  // Reka closes the menu on select unless the event is prevented.
  if (!props.closeOnClick) event.preventDefault()
}
</script>

<template>
  <NavigationMenuLink
    data-slot="navigation-menu-link"
    v-bind="delegated"
    :class="cn(navigationMenuLinkVariants({ variant }), props.class)"
    @select="onSelect"
  >
    <slot />
  </NavigationMenuLink>
</template>
