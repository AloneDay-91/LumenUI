<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@/components/ui/menu"
</script>

<template>
  <Menu>
    <MenuTrigger as-child><Button variant="outline">Song</Button></MenuTrigger>
    <MenuContent>
      <MenuItem>Add to library</MenuItem>
      <MenuItem>Add to a playlist</MenuItem>
      <MenuSeparator />
      <MenuItem>Share</MenuItem>
    </MenuContent>
  </Menu>
</template>
