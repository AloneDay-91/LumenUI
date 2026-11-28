<script setup lang="ts">
import { ref } from "vue"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckboxGroup } from "@/components/ui/checkbox-group"
import { Label } from "@/components/ui/label"

const fonts = ref(["inter"])
</script>

<template>
  <CheckboxGroup v-model="fonts" class="w-48">
    <Label class="gap-2"><Checkbox value="inter" /> Inter</Label>
    <Label class="gap-2"><Checkbox value="fraunces" /> Fraunces</Label>
    <Label class="gap-2"><Checkbox value="mono" /> JetBrains Mono</Label>
  </CheckboxGroup>
</template>
