<script setup lang="ts">
import { ref } from "vue"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const notify = ref(true)
</script>

<template>
  <Label><Switch v-model="notify" /> Email notifications</Label>
</template>
