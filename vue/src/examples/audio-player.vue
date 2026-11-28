<script setup lang="ts">
import { onMounted, ref } from "vue"
import { Music } from "@lucide/vue"
import { AudioPlayer, getAudioPeaks } from "@/components/ui/audio-player"

const THEME = "/video/lumen-theme.mp3"
const peaks = ref<number[]>()

onMounted(() => {
  getAudioPeaks(THEME, 72)
    .then((result) => (peaks.value = result))
    .catch(() => {})
})
</script>

<template>
  <AudioPlayer
    :src="THEME"
    preload="metadata"
    title="Lumen theme"
    description="Showcase soundtrack"
    :peaks="peaks"
    class="max-w-md"
  >
    <template #artwork>
      <span class="flex size-full items-center justify-center text-muted-foreground">
        <Music class="size-4" />
      </span>
    </template>
  </AudioPlayer>
</template>
