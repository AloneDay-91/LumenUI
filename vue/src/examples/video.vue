<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useMutationObserver } from "@vueuse/core"

import { Video } from "@/components/ui/video"

// The dark showcase follows the site theme (the `dark` class on <html>).
const html = ref<HTMLElement | null>(null)
const dark = ref(false)
const sync = () => {
  dark.value = html.value?.classList.contains("dark") ?? false
}
onMounted(() => {
  html.value = document.documentElement
  sync()
})
useMutationObserver(html, sync, { attributes: true, attributeFilter: ["class"] })

const name = computed(() => (dark.value ? "lumen-showcase-dark" : "lumen-showcase"))
</script>

<template>
  <Video
    :key="name"
    :src="`/video/${name}.mp4`"
    :poster="`/images/${name}-poster.jpg`"
    preload="metadata"
    class="max-w-xl"
  />
</template>
