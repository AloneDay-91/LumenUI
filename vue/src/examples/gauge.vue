<script setup lang="ts">
import { ref } from "vue"

import { Gauge } from "@/components/ui/gauge"

const cpu = ref(64)
</script>

<template>
  <div class="flex w-full max-w-lg flex-col items-center gap-6">
    <div class="flex flex-wrap items-end justify-center gap-6">
      <Gauge
        :value="cpu"
        label="CPU"
        :thresholds="[
          { from: 75, color: 'orange' },
          { from: 90, color: 'crimson' },
        ]"
      />
      <Gauge :value="182" :max="250" label="GB of 250" :format="(v) => `${v}`" :size="128" color="indigo" />
      <Gauge :value="99.2" :min="95" :max="100" label="Uptime" :format="(v) => `${v}%`" :size="128" color="jade" />
    </div>
    <input v-model.number="cpu" type="range" min="0" max="100" aria-label="CPU load" class="w-full max-w-60 accent-primary" />
  </div>
</template>
