<script setup lang="ts">
import { ref } from "vue"
import { SignaturePad } from "@/components/ui/signature-pad"

const png = ref<string | null>(null)
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <SignaturePad v-model="png" />
    <div class="flex h-14 items-center gap-3 rounded-2xl bg-muted/50 px-3 text-xs text-muted-foreground">
      <template v-if="png">
        <img :src="png" alt="Your signature" class="h-10 rounded-md bg-white px-2" />
        PNG ready to upload
      </template>
      <template v-else>The exported PNG shows here.</template>
    </div>
  </div>
</template>
