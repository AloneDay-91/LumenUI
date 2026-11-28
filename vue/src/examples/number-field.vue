<script setup lang="ts">
import { ref } from "vue"
import {
  NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput,
} from "@/components/ui/number-field"

const value = ref(4)
</script>

<template>
  <NumberField v-model="value" :min="0" :max="12">
    <NumberFieldGroup>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldGroup>
  </NumberField>
</template>
