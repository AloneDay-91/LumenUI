<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerPopup, DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <Drawer>
      <DrawerTrigger as-child><Button>Bottom</Button></DrawerTrigger>
      <DrawerPopup>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Notifications</DrawerTitle>
            <DrawerDescription>Swipe down to close.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose as-child><Button variant="secondary">Close</Button></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </DrawerPopup>
    </Drawer>
    <Drawer swipe-direction="right">
      <DrawerTrigger as-child><Button variant="outline">Side</Button></DrawerTrigger>
      <DrawerPopup>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Panel</DrawerTitle>
            <DrawerDescription>Swipe right to close.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose as-child><Button variant="secondary">Close</Button></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </DrawerPopup>
    </Drawer>
  </div>
</template>
