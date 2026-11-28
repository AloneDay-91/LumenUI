<script setup lang="ts">
import { computed, ref } from "vue"
import { RefreshCw } from "@lucide/vue"

import { Button } from "@/components/ui/button"
import { NumberTicker } from "@/components/ui/number-ticker"

const round = ref(0)
const revenue = computed(() => [48250, 51980, 46720][round.value % 3]!)
const users = computed(() => [12480, 13105, 12890][round.value % 3]!)
const rate = computed(() => [0.048, 0.052, 0.045][round.value % 3]!)
</script>

<template>
  <div class="flex w-full max-w-lg flex-col items-center gap-6">
    <dl class="m-0 grid w-full grid-cols-3 gap-4 text-center">
      <div>
        <dt class="text-xs text-muted-foreground">Revenue</dt>
        <dd class="m-0 text-2xl font-medium tracking-tight">
          <NumberTicker :value="revenue" :format="{ style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }" />
        </dd>
      </div>
      <div>
        <dt class="text-xs text-muted-foreground">Users</dt>
        <dd class="m-0 text-2xl font-medium tracking-tight">
          <NumberTicker :value="users" :delay="150" />
        </dd>
      </div>
      <div>
        <dt class="text-xs text-muted-foreground">Conversion</dt>
        <dd class="m-0 text-2xl font-medium tracking-tight">
          <NumberTicker
            :value="rate"
            :delay="300"
            :format="{ style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }"
          />
        </dd>
      </div>
    </dl>
    <Button variant="outline" size="sm" @click="round++">
      <RefreshCw data-icon="inline-start" />
      New figures
    </Button>
  </div>
</template>
