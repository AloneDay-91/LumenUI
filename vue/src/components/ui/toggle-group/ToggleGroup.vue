<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { useVModel } from "@vueuse/core"
import { ToggleGroupRoot, useForwardProps, type AcceptableValue, type ToggleGroupRootProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<
    Omit<ToggleGroupRootProps, "type" | "modelValue" | "defaultValue"> & {
      /** Pressed values. Always an array, like the React version. */
      modelValue?: AcceptableValue[]
      defaultValue?: AcceptableValue[]
      /** Let several items be pressed at once. */
      multiple?: boolean
      class?: HTMLAttributes["class"]
    }
  >(),
  { multiple: false, loop: true, rovingFocus: true, orientation: "horizontal", modelValue: undefined, defaultValue: () => [] }
)
const emits = defineEmits<{ "update:modelValue": [value: AcceptableValue[]] }>()

const values = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
}) as { value: AcceptableValue[] }

const delegated = computed(() => {
  const { class: _class, multiple: _multiple, modelValue: _modelValue, defaultValue: _defaultValue, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)

const rootValue = computed(() => (props.multiple ? values.value : values.value[0]))

function onUpdate(value: AcceptableValue | AcceptableValue[]) {
  if (Array.isArray(value)) values.value = value
  else values.value = value === undefined || value === null || value === "" ? [] : [value]
}
</script>

<template>
  <ToggleGroupRoot
    data-slot="toggle-group"
    v-bind="forwarded"
    :type="multiple ? 'multiple' : 'single'"
    :model-value="rootValue"
    :data-orientation="orientation"
    :class="cn('flex w-fit items-center justify-center gap-0.5 rounded-4xl bg-muted p-0.5', 'data-[orientation=vertical]:flex-col', props.class)"
    @update:model-value="onUpdate"
  >
    <slot :model-value="values" />
  </ToggleGroupRoot>
</template>
