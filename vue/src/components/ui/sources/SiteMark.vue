<script setup lang="ts">
import { computed } from "vue"

import { hostOf } from "./utils"

/** A letter tile for a site, so the list needs no favicon requests. */
const props = defineProps<{ href: string }>()
const host = computed(() => hostOf(props.href))
</script>

<template>
  <span
    aria-hidden="true"
    class="flex size-4 shrink-0 items-center justify-center rounded-[5px] bg-secondary font-mono text-[9px] font-medium text-secondary-foreground uppercase"
  >
    {{ host[0] }}
  </span>
</template>
