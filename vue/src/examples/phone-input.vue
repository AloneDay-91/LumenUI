<script setup lang="ts">
import { ref } from "vue"

import { PhoneInput } from "@/components/ui/phone-input"

const phone = ref("+33612345678")
</script>

<template>
  <div class="flex w-full max-w-xs flex-col gap-2">
    <PhoneInput v-model="phone" aria-label="Phone number" />
    <p class="m-0 font-mono text-[11px] text-muted-foreground">{{ phone || "—" }}</p>
  </div>
</template>
