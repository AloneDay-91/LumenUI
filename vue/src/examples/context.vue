<script setup lang="ts">
import { Context } from "@/components/ui/context"
</script>

<template>
  <div class="flex items-center gap-4">
    <Context
      :used="48_200"
      :max="200_000"
      :usage="{ input: 41_000, output: 5_800, reasoning: 1_400, cached: 32_000 }"
      cost="$0.04"
      model="Lumen Large"
    />
    <Context :used="152_000" :max="200_000" />
    <Context :used="191_000" :max="200_000" />
  </div>
</template>
