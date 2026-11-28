<script setup lang="ts">
import { ref } from "vue"
import { CurrencyInput } from "@/components/ui/currency-input"

const amount = ref<number | null>(1250)
const currency = ref("EUR")
</script>

<template>
  <div class="flex w-full max-w-xs flex-col gap-2">
    <CurrencyInput
      v-model="amount"
      v-model:currency="currency"
      aria-label="Amount"
      :currencies="['EUR', 'USD', 'GBP', 'CHF', 'JPY', 'CAD']"
    />
    <p class="m-0 font-mono text-[11px] text-muted-foreground">{{ amount ?? "null" }} {{ currency }}</p>
  </div>
</template>
