<script setup lang="ts">
import { Task, TaskFile, TaskItem } from "@/components/ui/task"
</script>

<template>
  <Task title="Finding where Banner is used" class="w-full max-w-md">
    <TaskItem title="Searched for “<Banner”" description="4 matches in 3 files." />
    <TaskItem title="Read the files">
      <span class="flex flex-wrap gap-1.5">
        <TaskFile>UpdateBanner.tsx</TaskFile>
        <TaskFile>page.tsx</TaskFile>
      </span>
    </TaskItem>
    <TaskItem status="running" title="Checking the props each one passes" />
  </Task>
</template>
