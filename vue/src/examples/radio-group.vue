<script setup lang="ts">
import { ref } from "vue"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const plan = ref("pro")
</script>

<template>
  <RadioGroup v-model="plan">
    <Label><RadioGroupItem value="free" /> Free</Label>
    <Label><RadioGroupItem value="pro" /> Pro</Label>
  </RadioGroup>
</template>
