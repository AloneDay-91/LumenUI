<script setup lang="ts">
import { ref } from "vue"
import { Checkbox } from "@/components/ui/checkbox"
import { Fieldset, FieldsetLegend } from "@/components/ui/fieldset"
import { Label } from "@/components/ui/label"

const email = ref(true)
const push = ref(false)
</script>

<template>
  <Fieldset class="w-56">
    <FieldsetLegend>Notifications</FieldsetLegend>
    <Label class="gap-2"><Checkbox v-model="email" /> Email</Label>
    <Label class="gap-2"><Checkbox v-model="push" /> Push</Label>
  </Fieldset>
</template>
