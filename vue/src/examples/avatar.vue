<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
</script>

<template>
  <Avatar>
    <AvatarImage src="/avatar.png" alt="Alex Martin" />
    <AvatarFallback>AM</AvatarFallback>
  </Avatar>
</template>
