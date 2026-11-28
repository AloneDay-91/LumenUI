<script setup lang="ts">
import { ref } from "vue"
import { Toggle } from "@/components/ui/toggle"

const bold = ref(false)
</script>

<template>
  <Toggle v-model="bold">Bold</Toggle>
</template>
