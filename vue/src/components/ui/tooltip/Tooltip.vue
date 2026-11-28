<script setup lang="ts">
import {
  TooltipProvider,
  TooltipRoot,
  useForwardPropsEmits,
  type TooltipRootEmits,
  type TooltipRootProps,
} from "reka-ui"

const props = defineProps<TooltipRootProps>()
const emits = defineEmits<TooltipRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <!-- Reka needs a provider above every tooltip. This one makes a lone Tooltip work;
       wrap a group in TooltipProvider to share its delay. -->
  <TooltipProvider>
    <TooltipRoot v-slot="slotProps" v-bind="forwarded">
      <slot v-bind="slotProps" />
    </TooltipRoot>
  </TooltipProvider>
</template>
