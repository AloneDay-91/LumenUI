<script setup lang="ts">
import { ref } from "vue"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const accepted = ref(false)
</script>

<template>
  <Label><Checkbox v-model="accepted" /> Accept the terms</Label>
</template>
