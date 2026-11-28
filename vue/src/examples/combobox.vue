<script setup lang="ts">
import { ref } from "vue"
import {
  Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList,
} from "@/components/ui/combobox"

const items = ["Button", "Input", "Select", "Dialog"]
const value = ref<string>()
</script>

<template>
  <div class="w-64">
    <Combobox v-model="value">
      <ComboboxInput placeholder="Pick a component" />
      <ComboboxContent>
        <ComboboxEmpty>No results</ComboboxEmpty>
        <ComboboxList>
          <ComboboxItem v-for="item in items" :key="item" :value="item">{{ item }}</ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </div>
</template>
