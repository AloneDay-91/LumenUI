<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { ToastProvider, Toaster, createToastManager } from "@/components/ui/toast"

// A manager adds toasts from anywhere. Inside the provider, useToastManager() works too.
const toast = createToastManager()
</script>

<template>
  <!-- Put ToastProvider and Toaster once at the root of your app. -->
  <ToastProvider :toast-manager="toast">
    <Button @click="toast.add({ title: 'Saved', description: 'Tokens are up to date.' })">Show</Button>
    <Toaster />
  </ToastProvider>
</template>
