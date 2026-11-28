<script setup lang="ts">
import { computed, ref } from "vue"
import { DiffViewer } from "@/components/ui/diff-viewer"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const before = `import { Button } from "@/components/ui/Button"

export function SaveBar({ onSave }: { onSave: () => void }) {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline">Cancel</Button>
      <Button onClick={onSave}>Save</Button>
    </div>
  )
}

export function SaveHint() {
  return <p className="text-xs text-muted-foreground">Changes are kept locally.</p>
}
`

const after = `import { Button } from "@/components/ui/Button"

export function SaveBar({ onSave, saving }: { onSave: () => void; saving: boolean }) {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="ghost">Cancel</Button>
      <Button onClick={onSave} loading={saving}>
        Save changes
      </Button>
    </div>
  )
}

export function SaveHint() {
  return <p className="text-xs text-muted-foreground">Changes are kept locally.</p>
}
`

const layout = ref(["unified"])
const view = computed(() => layout.value[0] as "unified" | "split")
</script>

<template>
  <div class="flex w-full flex-col items-start gap-3">
    <ToggleGroup
      aria-label="Diff layout"
      :model-value="layout"
      @update:model-value="(next) => next[0] && (layout = [next[0] as string])"
    >
      <ToggleGroupItem value="unified">Unified</ToggleGroupItem>
      <ToggleGroupItem value="split">Split</ToggleGroupItem>
    </ToggleGroup>
    <DiffViewer title="SaveBar.tsx" :old-value="before" :new-value="after" :view="view" :context="2" class="w-full" />
  </div>
</template>
