<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const inputClassName =
  "h-full min-w-0 flex-1 bg-transparent px-3 text-xs outline-none placeholder:text-muted-foreground group-has-data-[align=start]/input-group:ps-1 group-has-data-[align=end]/input-group:pe-1"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
const model = defineModel<string | number>()
</script>

<template>
  <input v-model="model" data-slot="input" :class="cn(inputClassName, props.class)" />
</template>
