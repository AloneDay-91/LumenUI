<script setup lang="ts">
import { ref } from "vue"
import { TagInput } from "@/components/ui/tag-input"

const tags = ref(["design", "tokens"])
</script>

<template>
  <div class="w-full max-w-80">
    <TagInput v-model="tags" placeholder="Add a tag" aria-label="Tags" />
  </div>
</template>
