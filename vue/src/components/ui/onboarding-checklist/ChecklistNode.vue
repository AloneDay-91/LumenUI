<script setup lang="ts">
import type { ChecklistContent } from "./types"

defineProps<{ content: ChecklistContent }>()
</script>

<template>
  <template v-if="typeof content === 'string'">{{ content }}</template>
  <component :is="content" v-else />
</template>
