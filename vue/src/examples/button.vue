<script setup lang="ts">
import { ref } from "vue"
import { Button } from "@/components/ui/button"

const saving = ref(false)

function save() {
  saving.value = true
  setTimeout(() => (saving.value = false), 2000)
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button variant="outline" @click="save">Button</Button>
    <Button :loading="saving">Submit</Button>
    <Button as="a" href="/docs">As link</Button>
  </div>
</template>
