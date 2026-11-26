<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { LoaderCircle } from "@lucide/vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- No size here: inside a Button the size rules of buttonVariants apply,
       and standalone it inherits the 1em default of a lucide icon. -->
  <LoaderCircle
    data-slot="spinner"
    role="status"
    aria-label="Loading"
    :class="cn('animate-spin', props.class)"
  />
</template>
