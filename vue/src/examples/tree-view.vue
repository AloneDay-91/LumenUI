<script setup lang="ts">
import { File, Folder } from "@lucide/vue"

import { TreeView, type TreeItem } from "@/components/ui/tree-view"

const items: TreeItem[] = [
  {
    id: "src",
    label: "src",
    icon: Folder,
    children: [
      {
        id: "components",
        label: "components",
        icon: Folder,
        children: [
          { id: "button", label: "Button.vue", icon: File },
          { id: "dialog", label: "Dialog.vue", icon: File },
          { id: "tree-view", label: "TreeView.vue", icon: File },
        ],
      },
      {
        id: "lib",
        label: "lib",
        icon: Folder,
        children: [{ id: "utils", label: "utils.ts", icon: File }],
      },
    ],
  },
  { id: "package", label: "package.json", icon: File },
  { id: "readme", label: "README.md", icon: File, disabled: true },
]
</script>

<template>
  <div class="w-full max-w-64">
    <TreeView aria-label="Files" :items="items" :default-expanded="['src', 'components']" default-value="tree-view" />
  </div>
</template>
