<script setup lang="ts">
import { ChainOfThought, ChainOfThoughtStep } from "@/components/ui/chain-of-thought"
import { TaskFile } from "@/components/ui/task"
</script>

<template>
  <ChainOfThought summary="Looked into date filters in 3 steps" default-open class="w-full max-w-md">
    <ChainOfThoughtStep title="Read the Date Picker docs" description="It has a range mode." />
    <ChainOfThoughtStep title="Checked Filter Bar">
      <span class="flex flex-wrap gap-1.5">
        <TaskFile>FilterBar.tsx</TaskFile>
        <TaskFile>DatePicker.tsx</TaskFile>
      </span>
    </ChainOfThoughtStep>
    <ChainOfThoughtStep title="Composed the two in one toolbar" />
  </ChainOfThought>
</template>
