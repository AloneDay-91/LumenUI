<script setup lang="ts">
import { ref } from "vue"

import { OTPField, OTPFieldInput } from "@/components/ui/otp-field"

const code = ref("")
</script>

<template>
  <OTPField v-model="code" :length="6">
    <OTPFieldInput v-for="i in 6" :key="i" />
  </OTPField>
</template>
