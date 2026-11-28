<script setup lang="ts">
import { Search } from "@lucide/vue"
import { Button } from "@/components/ui/button"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
</script>

<template>
  <Button variant="outline" size="icon">
    <Search aria-hidden="true" />
    <VisuallyHidden>Search</VisuallyHidden>
  </Button>
</template>
