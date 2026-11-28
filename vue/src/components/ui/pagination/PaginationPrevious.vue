<script setup lang="ts">
import { ChevronLeft } from "@lucide/vue"

import PaginationLink from "./PaginationLink.vue"
import type { PaginationLinkProps } from "."

const props = withDefaults(defineProps<PaginationLinkProps>(), { as: "button", size: "sm" })
</script>

<template>
  <PaginationLink aria-label="Go to previous page" v-bind="props">
    <ChevronLeft data-icon="inline-start" />
    <slot>Previous</slot>
  </PaginationLink>
</template>
