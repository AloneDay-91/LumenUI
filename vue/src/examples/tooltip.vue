<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child><Button variant="ghost">Hover me</Button></TooltipTrigger>
    <TooltipContent>Saved 2 minutes ago</TooltipContent>
  </Tooltip>
</template>
