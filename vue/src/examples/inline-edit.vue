<script setup lang="ts">
import { ref } from "vue"

import { InlineEdit } from "@/components/ui/inline-edit"

const name = ref("Website relaunch")
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <h3 class="m-0 text-lg font-medium tracking-tight">
      <InlineEdit v-model="name" aria-label="Project name" />
    </h3>
    <dl class="m-0 grid grid-cols-[6rem_1fr] items-center gap-x-4 gap-y-2 text-xs">
      <dt class="text-muted-foreground">Owner</dt>
      <dd class="m-0">
        <InlineEdit aria-label="Owner" default-value="Alex Martin" />
      </dd>
      <dt class="text-muted-foreground">Client</dt>
      <dd class="m-0">
        <InlineEdit aria-label="Client" placeholder="Add a client" />
      </dd>
    </dl>
  </div>
</template>
