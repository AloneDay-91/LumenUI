<script setup lang="ts">
import { HoverCardTrigger, type HoverCardTriggerProps } from "reka-ui"

// Renders a link like Base UI's PreviewCard.Trigger: pass `href` as an attribute.
const props = withDefaults(defineProps<HoverCardTriggerProps>(), { as: "a" })
</script>

<template>
  <HoverCardTrigger data-slot="preview-card-trigger" v-bind="props">
    <slot />
  </HoverCardTrigger>
</template>
