<script setup lang="ts">
import { Inbox } from "@lucide/vue"
import { Button } from "@/components/ui/button"
import {
  Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle,
} from "@/components/ui/empty"
</script>

<template>
  <Empty class="max-w-md">
    <EmptyHeader>
      <EmptyMedia><Inbox /></EmptyMedia>
      <EmptyTitle>No releases yet</EmptyTitle>
      <EmptyDescription>Tag a version and it will land here. Until then the list stays quiet.</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button size="sm">Create a release</Button>
      <Button size="sm" variant="ghost">Read the changelog</Button>
    </EmptyContent>
  </Empty>
</template>
