<script setup lang="ts">
import { TraceSection } from "@/components/ui/trace"

/** The brief the subagent received. */
</script>

<template>
  <TraceSection label="Task">
    <p class="m-0 text-muted-foreground"><slot /></p>
  </TraceSection>
</template>
