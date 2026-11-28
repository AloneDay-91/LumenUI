<script setup lang="ts">
import { ref } from "vue"
import { Input } from "@/components/ui/input"

const name = ref("")
</script>

<template>
  <Input v-model="name" placeholder="Alex Martin" />
</template>
