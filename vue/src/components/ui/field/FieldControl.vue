<script setup lang="ts">
import { inject, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { inputClassName } from "@/components/ui/styles"
import { fieldKey } from "./context"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
const model = defineModel<string | number>()
const field = inject(fieldKey, undefined)
</script>

<template>
  <input
    v-model="model"
    data-slot="field-control"
    :id="field?.controlId"
    :name="field?.name.value"
    :disabled="field?.disabled.value || undefined"
    :aria-invalid="field?.invalid.value || undefined"
    :aria-describedby="
      field ? (field.invalid.value ? `${field.descriptionId} ${field.errorId}` : field.descriptionId) : undefined
    "
    :class="cn(inputClassName, props.class)"
  />
</template>
