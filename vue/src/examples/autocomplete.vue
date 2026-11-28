<script setup lang="ts">
import { ref } from "vue"
import {
  Autocomplete, AutocompleteContent, AutocompleteEmpty, AutocompleteInput, AutocompleteItem, AutocompleteList,
} from "@/components/ui/autocomplete"

const items = ["Nuxt", "Astro", "Vite", "Quasar"]
const query = ref("")
</script>

<template>
  <div class="w-64">
    <Autocomplete v-model="query" :items="items">
      <AutocompleteInput placeholder="Search a framework" />
      <AutocompleteContent>
        <AutocompleteEmpty>No results</AutocompleteEmpty>
        <AutocompleteList v-slot="{ item }">
          <AutocompleteItem :value="item">{{ item }}</AutocompleteItem>
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  </div>
</template>
