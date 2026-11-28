<script setup lang="ts">
import { Inbox } from "@lucide/vue"
import { Button } from "@/components/ui/button"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
</script>

<template>
  <Item variant="outline" class="max-w-md">
    <ItemMedia variant="icon"><Inbox /></ItemMedia>
    <ItemContent>
      <ItemTitle>Paper</ItemTitle>
      <ItemDescription>The page is the surface. The row sits on it.</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button variant="outline" size="sm">Open</Button>
    </ItemActions>
  </Item>
</template>
