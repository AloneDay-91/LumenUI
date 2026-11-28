<script setup lang="ts">
import { TraceSection } from "@/components/ui/trace"

/** What it handed back. */
withDefaults(defineProps<{ label?: string }>(), { label: "Result" })
</script>

<template>
  <TraceSection :label="label">
    <div class="text-foreground"><slot /></div>
  </TraceSection>
</template>
