<script setup lang="ts">
import { Search } from "@lucide/vue"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
</script>

<template>
  <div class="w-full max-w-sm">
    <InputGroup>
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search a component…" />
    </InputGroup>
  </div>
</template>
