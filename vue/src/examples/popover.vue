<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger,
} from "@/components/ui/popover"
</script>

<template>
  <Popover>
    <PopoverTrigger as-child><Button variant="outline">Dimensions</Button></PopoverTrigger>
    <PopoverContent>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>Set the size of the layer.</PopoverDescription>
    </PopoverContent>
  </Popover>
</template>
