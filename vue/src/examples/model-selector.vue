<script setup lang="ts">
import { ref } from "vue"

import { ModelSelector } from "@/components/ui/model-selector"

const model = ref("lumen-large")
const effort = ref("medium")
const models = [
  { value: "lumen-large", label: "Lumen Large", description: "Best answers. Thinks before it replies." },
  { value: "lumen-small", label: "Lumen Small", description: "Fast and cheap, for short tasks." },
]
</script>

<template>
  <ModelSelector
    v-model:model="model"
    v-model:effort="effort"
    :models="models"
    :show-effort="model === 'lumen-large'"
  />
</template>
