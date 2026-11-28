<script setup lang="ts">
import { Search } from "@lucide/vue"

import {
  Trace, TraceContent, TraceSection, TraceStep, TraceSteps, TraceTrigger,
} from "@/components/ui/trace"
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <Trace default-open>
      <TraceTrigger label="Searched the docs" meta="0.8s">
        <template #icon><Search /></template>
      </TraceTrigger>
      <TraceContent>
        <TraceSteps>
          <TraceStep title="Read the Split Button page" />
          <TraceStep title="Compared it with Menu" />
          <TraceStep status="running" title="Writing the answer" />
        </TraceSteps>
      </TraceContent>
    </Trace>
    <Trace variant="card" status="done">
      <TraceTrigger label="search_docs" meta="120ms">
        <template #icon><Search /></template>
      </TraceTrigger>
      <TraceContent>
        <TraceSection label="Input">
          <code class="font-mono">{{ '{ "query": "split button" }' }}</code>
        </TraceSection>
        <TraceSection label="Output">1 page found.</TraceSection>
      </TraceContent>
    </Trace>
  </div>
</template>
