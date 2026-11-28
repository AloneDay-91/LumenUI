<script setup lang="ts">
import { Stat, StatDelta, StatLabel, StatValue } from "@/components/ui/stat"
</script>

<template>
  <Stat>
    <StatLabel>Weekly installs</StatLabel>
    <StatValue>12,480</StatValue>
    <StatDelta trend="up">+8.2%</StatDelta>
  </Stat>
</template>
