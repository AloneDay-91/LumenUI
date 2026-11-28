<script setup lang="ts">
import { computed, ref, type HTMLAttributes } from "vue"
import { Eye, EyeOff } from "@lucide/vue"

import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

defineOptions({ inheritAttrs: false })

/** A password field with a show/hide toggle. Other attributes land on the input. */
const props = withDefaults(
  defineProps<{
    /** v-model:visible. Leave it unbound to let the field keep its own state. */
    visible?: boolean
    defaultVisible?: boolean
    showLabel?: string
    hideLabel?: string
    disabled?: boolean
    class?: HTMLAttributes["class"]
  }>(),
  { visible: undefined, defaultVisible: false, showLabel: "Show password", hideLabel: "Hide password", disabled: undefined },
)

const emit = defineEmits<{ "update:visible": [visible: boolean] }>()

/** v-model: the password text. */
const model = defineModel<string>()

const uncontrolled = ref(props.defaultVisible)
const isVisible = computed(() => props.visible ?? uncontrolled.value)

function toggle() {
  const next = !isVisible.value
  if (props.visible === undefined) uncontrolled.value = next
  emit("update:visible", next)
}

const toggleClassName = computed(() =>
  cn(buttonVariants({ variant: "ghost", size: "icon-xs" }), "text-muted-foreground hover:text-foreground"),
)
</script>

<template>
  <InputGroup data-slot="password-input" :class="props.class">
    <Input
      v-model="model"
      :type="isVisible ? 'text' : 'password'"
      autocomplete="current-password"
      :spellcheck="false"
      :disabled="disabled"
      v-bind="$attrs"
    />
    <InputGroupAddon align="end" class="pe-1">
      <button
        type="button"
        data-slot="password-input-toggle"
        :aria-label="isVisible ? hideLabel : showLabel"
        :aria-pressed="isVisible"
        :disabled="disabled"
        :class="toggleClassName"
        @click="toggle"
      >
        <EyeOff v-if="isVisible" />
        <Eye v-else />
      </button>
    </InputGroupAddon>
  </InputGroup>
</template>
