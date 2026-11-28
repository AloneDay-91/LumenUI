<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { ArrowUp, Square } from "@lucide/vue"

import { cn } from "@/lib/utils"
import { Button, type ButtonVariantProps } from "@/components/ui/button"
import { usePromptInput } from "./context"

/** Sends while ready, stops while streaming. */
const props = withDefaults(
  defineProps<{
    variant?: ButtonVariantProps["variant"]
    size?: ButtonVariantProps["size"]
    sendLabel?: string
    stopLabel?: string
    class?: HTMLAttributes["class"]
  }>(),
  { size: "icon", sendLabel: "Send", stopLabel: "Stop" }
)

const { value, status, onStop, disabled } = usePromptInput()
const busy = computed(() => status.value === "submitted" || status.value === "streaming")
</script>

<template>
  <Button
    v-if="busy && onStop"
    type="button"
    :variant="variant"
    :size="size"
    :aria-label="stopLabel"
    :class="cn('ms-auto', props.class)"
    @click="onStop?.()"
  >
    <Square class="size-3 fill-current" />
  </Button>
  <Button
    v-else
    type="submit"
    :variant="variant"
    :size="size"
    :aria-label="sendLabel"
    :loading="status === 'submitted'"
    :disabled="disabled || (busy && status !== 'submitted') || value.trim() === ''"
    :class="cn('ms-auto', props.class)"
  >
    <ArrowUp />
  </Button>
</template>
