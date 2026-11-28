<script setup lang="ts">
import { Card } from "@/components/ui/card"
import {
  ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger,
} from "@/components/ui/context-menu"
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger as-child>
      <Card
        size="sm"
        variant="secondary"
        class="flex h-28 w-56 cursor-context-menu items-center justify-center text-sm text-muted-foreground"
      >
        Right-click here
      </Card>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Copy</ContextMenuItem>
      <ContextMenuItem>Paste</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem>Delete</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
