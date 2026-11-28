<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
</script>

<template>
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger as-child><Button variant="ghost" size="sm">File</Button></MenubarTrigger>
      <MenubarContent>
        <MenubarItem>New</MenubarItem>
        <MenubarItem>Open</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger as-child><Button variant="ghost" size="sm">Edit</Button></MenubarTrigger>
      <MenubarContent>
        <MenubarItem>Copy</MenubarItem>
        <MenubarItem>Paste</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
