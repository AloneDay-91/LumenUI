<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  AlertDialog, AlertDialogAction, AlertDialogClose, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child><Button variant="destructive">Delete</Button></AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete the project?</AlertDialogTitle>
        <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogClose as-child><Button variant="ghost">Cancel</Button></AlertDialogClose>
        <AlertDialogAction as-child><Button variant="destructive">Delete</Button></AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
