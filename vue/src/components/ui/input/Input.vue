<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { inputClassName } from "@/components/ui/styles"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
const model = defineModel<string | number>()
</script>

<template>
  <input v-model="model" data-slot="input" :class="cn(inputClassName, props.class)" />
</template>
