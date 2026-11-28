<script setup lang="ts">
import { ChevronRight } from "@lucide/vue"

import PaginationLink from "./PaginationLink.vue"
import type { PaginationLinkProps } from "."

const props = withDefaults(defineProps<PaginationLinkProps>(), { as: "button", size: "sm" })
</script>

<template>
  <PaginationLink aria-label="Go to next page" v-bind="props">
    <slot>Next</slot>
    <ChevronRight data-icon="inline-end" />
  </PaginationLink>
</template>
