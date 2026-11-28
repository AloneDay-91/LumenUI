<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref, useId, watch, type HTMLAttributes } from "vue"
import { ListboxItem, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { commandContextKey, commandGroupKey } from "./context"

const props = defineProps<
  PrimitiveProps & {
    /** Matched against the search and emitted on select. Defaults to the item's text. */
    value?: string
    /** Extra words the search also matches. */
    keywords?: string[]
    disabled?: boolean
    /** Keep the item rendered even when it does not match. */
    forceMount?: boolean
    class?: HTMLAttributes["class"]
  }
>()
const emit = defineEmits<{ select: [value: string] }>()

const context = inject(commandContextKey)!
const groupId = inject(commandGroupKey, undefined)
const id = useId()

const element = ref<InstanceType<typeof ListboxItem> | null>(null)
const textValue = ref("")
const resolvedValue = computed(() => (props.value ?? textValue.value).trim() || id)

function register() {
  context.register(id, {
    value: resolvedValue.value,
    keywords: props.keywords ?? [],
    groupId,
    forceMount: !!props.forceMount,
  })
}

register()
onMounted(() => {
  const el = (element.value?.$el ?? null) as HTMLElement | null
  if (props.value === undefined && el) textValue.value = el.textContent ?? ""
})
watch([resolvedValue, () => props.keywords, () => props.forceMount], register, { deep: true })
onBeforeUnmount(() => context.unregister(id))

const visible = computed(() => context.isItemVisible(id))

const itemClassName =
  "relative flex min-h-7 cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 text-xs outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

function onSelect(event: CustomEvent) {
  // Command items run an action; they don't stay checked like a listbox option.
  event.preventDefault()
  emit("select", resolvedValue.value)
}
</script>

<template>
  <ListboxItem
    v-if="visible"
    ref="element"
    data-slot="command-item"
    :as="as"
    :as-child="asChild"
    :value="resolvedValue"
    :disabled="disabled"
    :class="cn(itemClassName, props.class)"
    @select="onSelect"
  >
    <slot />
  </ListboxItem>
</template>
