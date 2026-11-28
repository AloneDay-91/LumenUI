<script setup lang="ts">
import { computed, ref, type HTMLAttributes } from "vue"
import { Search, X } from "@lucide/vue"

import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

defineOptions({ inheritAttrs: false })

/**
 * A search field with a clear button. Escape clears a field that holds text;
 * on an empty field it passes through. Other attributes land on the input.
 */
const props = withDefaults(
  defineProps<{
    /** v-model. Leave it unbound to let the field keep its own text. */
    modelValue?: string
    defaultValue?: string
    clearLabel?: string
    disabled?: boolean
    class?: HTMLAttributes["class"]
  }>(),
  { modelValue: undefined, defaultValue: "", clearLabel: "Clear search", disabled: undefined },
)

const emit = defineEmits<{
  "update:modelValue": [value: string]
  /** Only when the field is emptied by the button or Escape. */
  clear: []
  keydown: [event: KeyboardEvent]
}>()

const inputRef = ref<{ $el: HTMLInputElement }>()
const uncontrolled = ref(props.defaultValue)
const current = computed(() => props.modelValue ?? uncontrolled.value)

function setValue(next: string) {
  if (props.modelValue === undefined) uncontrolled.value = next
  emit("update:modelValue", next)
}

function clear() {
  setValue("")
  emit("clear")
  inputRef.value?.$el.focus()
}

function onKeydown(event: KeyboardEvent) {
  emit("keydown", event)
  if (event.key === "Escape" && current.value !== "" && !event.defaultPrevented) {
    event.preventDefault()
    clear()
  }
}

const clearClassName = computed(() =>
  cn(buttonVariants({ variant: "ghost", size: "icon-xs" }), "text-muted-foreground hover:text-foreground"),
)
</script>

<template>
  <InputGroup data-slot="search-input" :class="props.class">
    <InputGroupAddon>
      <Search aria-hidden="true" />
    </InputGroupAddon>
    <Input
      ref="inputRef"
      type="search"
      :model-value="current"
      :disabled="disabled"
      class="[&::-webkit-search-cancel-button]:appearance-none"
      v-bind="$attrs"
      @update:model-value="setValue(String($event ?? ''))"
      @keydown="onKeydown"
    />
    <InputGroupAddon v-if="current !== ''" align="end" class="pe-1">
      <button
        type="button"
        data-slot="search-input-clear"
        :aria-label="clearLabel"
        :disabled="disabled"
        :class="clearClassName"
        @click="clear"
      >
        <X />
      </button>
    </InputGroupAddon>
  </InputGroup>
</template>
