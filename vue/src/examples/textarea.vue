<script setup lang="ts">
import { ref } from "vue"
import { Textarea } from "@/components/ui/textarea"

const message = ref("")
</script>

<template>
  <Textarea v-model="message" placeholder="Say hello" />
</template>
