<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <ul data-slot="file-upload-list" :class="cn('flex flex-col gap-1.5', props.class)">
    <slot />
  </ul>
</template>
