<script setup lang="ts">
import { computed, ref } from "vue"
import type { AcceptableValue } from "reka-ui"
import { Button } from "@/components/ui/button"
import { ImageCropper, cropImage, type CropArea } from "@/components/ui/image-cropper"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const src = "/images/hero.jpg"

const ratio = ref("1")
const area = ref<CropArea | null>(null)
const preview = ref<string | null>(null)
const aspect = computed(() => (ratio.value === "free" ? undefined : ratio.value === "16/9" ? 16 / 9 : 1))

function pick(next: AcceptableValue[]) {
  if (!next[0]) return
  ratio.value = next[0] as string
  preview.value = null
}

async function crop() {
  if (!area.value) return
  const blob = await cropImage(src, area.value, { maxSize: 256, type: "image/jpeg" })
  if (preview.value) URL.revokeObjectURL(preview.value)
  preview.value = URL.createObjectURL(blob)
}
</script>

<template>
  <div class="flex w-full max-w-xl flex-col gap-3">
    <ToggleGroup aria-label="Ratio" class="self-start" :model-value="[ratio]" @update:model-value="pick">
      <ToggleGroupItem value="1">Avatar</ToggleGroupItem>
      <ToggleGroupItem value="16/9">16:9</ToggleGroupItem>
      <ToggleGroupItem value="free">Free</ToggleGroupItem>
    </ToggleGroup>
    <ImageCropper
      :key="ratio"
      :src="src"
      alt="A painted landscape"
      :aspect="aspect"
      :shape="ratio === '1' ? 'round' : 'rect'"
      :max-height="300"
      @area-change="area = $event"
    />
    <div class="flex items-center gap-3">
      <Button size="sm" :disabled="!area" @click="crop">Crop</Button>
      <span class="font-mono text-[11px] text-muted-foreground">
        {{ area ? `${area.width}×${area.height} at ${area.x},${area.y}` : "…" }}
      </span>
      <img
        v-if="preview"
        :src="preview"
        alt="Cropped result"
        :class="ratio === '1' ? 'ms-auto size-12 rounded-full' : 'ms-auto h-12 rounded-lg'"
      />
    </div>
  </div>
</template>
