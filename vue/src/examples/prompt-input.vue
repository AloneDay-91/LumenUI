<script setup lang="ts">
import { ref } from "vue"
import { Paperclip } from "@lucide/vue"
import { Button } from "@/components/ui/button"
import { ModelSelector } from "@/components/ui/model-selector"
import { PromptInput, PromptInputSubmit, PromptInputTextarea, PromptInputToolbar } from "@/components/ui/prompt-input"

const models = [
  { value: "lumen-large", label: "Lumen Large" },
  { value: "lumen-small", label: "Lumen Small" },
]
const model = ref("lumen-large")
const effort = ref("medium")
</script>

<template>
  <PromptInput class="w-full max-w-md">
    <PromptInputTextarea aria-label="Message" />
    <PromptInputToolbar>
      <Button variant="ghost" size="icon-sm" aria-label="Attach a file" type="button">
        <Paperclip />
      </Button>
      <ModelSelector v-model:model="model" v-model:effort="effort" :models="models" />
      <PromptInputSubmit />
    </PromptInputToolbar>
  </PromptInput>
</template>
