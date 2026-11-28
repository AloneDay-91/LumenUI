<script setup lang="ts">
import { computed, provide, ref, watch, type HTMLAttributes } from "vue"
import type { CollapsibleRootProps } from "reka-ui"

import { Trace } from "@/components/ui/trace"
import { ReasoningContextKey } from "./context"

/**
 * The agent's thinking, on Trace. Open and shimmering while `streaming`, then
 * it folds itself once and says how long it took. The reader can reopen it.
 */
const props = withDefaults(
  defineProps<
    CollapsibleRootProps & {
      streaming?: boolean
      /** Seconds spent thinking, shown once streaming ends. */
      duration?: number
      class?: HTMLAttributes["class"]
    }
  >(),
  { streaming: false, open: undefined, defaultOpen: undefined, disabled: undefined, unmountOnHide: undefined },
)
const emit = defineEmits<{ "update:open": [value: boolean] }>()

const internal = ref(props.defaultOpen ?? props.streaming)

// Follow the stream: open when it starts, fold once when it ends.
watch(
  () => props.streaming,
  (streaming) => {
    if (props.open === undefined) internal.value = streaming
  },
)

function onOpenChange(next: boolean) {
  internal.value = next
  emit("update:open", next)
}

provide(
  ReasoningContextKey,
  computed(() => ({ streaming: props.streaming, duration: props.duration })),
)
</script>

<template>
  <Trace
    v-slot="slotProps"
    data-slot="reasoning"
    :status="streaming ? 'running' : 'done'"
    :open="open ?? internal"
    :disabled="disabled"
    :unmount-on-hide="unmountOnHide"
    :as="as"
    :as-child="asChild"
    :class="props.class"
    @update:open="onOpenChange"
  >
    <slot v-bind="slotProps" />
  </Trace>
</template>
