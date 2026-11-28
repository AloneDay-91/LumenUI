<script setup lang="ts">
import { ref } from "vue"

import { FileUpload, FileUploadItem, FileUploadList, type FileRejection } from "@/components/ui/file-upload"

const files = ref<File[]>([])
const rejected = ref<FileRejection[]>([])

function onFiles(picked: File[]) {
  files.value = [...files.value, ...picked]
  rejected.value = []
}

function remove(index: number) {
  files.value = files.value.filter((_, i) => i !== index)
}

function describe(list: FileRejection[]) {
  return list
    .map(({ file, reason }) => `${file.name}: ${reason === "size" ? "over 5 MB" : "not an image or PDF"}`)
    .join(" · ")
}
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <FileUpload
      multiple
      accept="image/*,.pdf"
      :max-size="5 * 1024 * 1024"
      @files-change="onFiles"
      @reject="rejected = $event"
    />
    <p v-if="rejected.length > 0" role="alert" class="m-0 text-xs text-destructive">{{ describe(rejected) }}</p>
    <FileUploadList v-if="files.length > 0">
      <FileUploadItem
        v-for="(file, index) in files"
        :key="`${file.name}-${index}`"
        :file="file"
        @remove="remove(index)"
      />
    </FileUploadList>
  </div>
</template>
