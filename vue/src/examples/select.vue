<script setup lang="ts">
import { ref } from "vue"
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

const fruit = ref<string>()
</script>

<template>
  <Select v-model="fruit">
    <SelectTrigger class="w-40"><SelectValue placeholder="Pick a fruit" /></SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
