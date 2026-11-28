<script setup lang="ts">
import { computed, ref } from "vue"
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"

const email = ref("")
const invalid = computed(() => email.value !== "" && !email.value.includes("@"))
</script>

<template>
  <Field :invalid="invalid">
    <FieldLabel>Email</FieldLabel>
    <FieldControl v-model="email" type="email" />
    <FieldDescription>We never share it.</FieldDescription>
    <FieldError>Enter a valid email.</FieldError>
  </Field>
</template>
