<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
</script>

<template>
  <Dialog>
    <DialogTrigger as-child><Button variant="outline">Edit profile</Button></DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>Changes save when you press Save.</DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
