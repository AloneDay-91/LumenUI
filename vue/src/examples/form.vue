<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Field, FieldControl, FieldError, FieldLabel } from "@/components/ui/field"
import { Form, type FormValues } from "@/components/ui/form"

function onFormSubmit(values: FormValues) {
  void values
}
</script>

<template>
  <Form v-slot="{ invalid }" class="w-64" @form-submit="onFormSubmit">
    <Field name="email" :invalid="invalid.email">
      <FieldLabel>Email</FieldLabel>
      <FieldControl type="email" required />
      <FieldError>Required</FieldError>
    </Field>
    <Button type="submit">Send</Button>
  </Form>
</template>
