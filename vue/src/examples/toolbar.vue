<script setup lang="ts">
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from "@/components/ui/toolbar"
</script>

<template>
  <Toolbar>
    <ToolbarGroup>
      <ToolbarButton>Bold</ToolbarButton>
      <ToolbarButton>Italic</ToolbarButton>
    </ToolbarGroup>
    <ToolbarSeparator />
    <ToolbarButton>Link</ToolbarButton>
  </Toolbar>
</template>
