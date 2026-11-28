<script setup lang="ts">
import { shallowRef } from "vue"
import type { DateValue } from "@internationalized/date"

import { DatePicker } from "@/components/ui/date-picker"

const date = shallowRef<DateValue>()
</script>

<template>
  <DatePicker v-model="date" />
</template>
