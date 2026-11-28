<script setup lang="ts">
import { TraceSection } from "@/components/ui/trace"

/** The subagent's own steps, usually tool traces. */
withDefaults(defineProps<{ label?: string }>(), { label: "Steps" })
</script>

<template>
  <TraceSection :label="label">
    <div class="flex flex-col gap-1.5"><slot /></div>
  </TraceSection>
</template>
