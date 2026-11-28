<script setup lang="ts">
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
</script>

<template>
  <div class="h-48 w-full max-w-lg overflow-hidden rounded-2xl ring-1 ring-foreground/10">
    <ResizablePanelGroup>
      <ResizablePanel :default-size="30" :min-size="20">
        <div class="flex size-full items-center justify-center p-4 text-xs text-muted-foreground">Sidebar</div>
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel>
        <div class="flex size-full items-center justify-center p-4 text-xs text-muted-foreground">Editor</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>
