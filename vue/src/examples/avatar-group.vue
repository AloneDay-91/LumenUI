<script setup lang="ts">
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar-group"
</script>

<template>
  <AvatarGroup aria-label="Reviewers">
    <Avatar>
      <AvatarFallback>AM</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>LU</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>MK</AvatarFallback>
    </Avatar>
    <AvatarGroupCount :count="4" />
  </AvatarGroup>
</template>
