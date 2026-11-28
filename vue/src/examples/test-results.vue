<script setup lang="ts">
import { TestResults, type TestSuite } from "@/components/ui/test-results"

const suites: TestSuite[] = [
  {
    name: "cli/test/add.test.js",
    tests: [
      { name: "copies the component", status: "passed", duration: 8 },
      { name: "rewrites imports to the aliases", status: "passed", duration: 6 },
      {
        name: "keeps a file the user edited",
        status: "failed",
        duration: 9,
        error: "Expected Button.tsx to be unchanged, but it was overwritten.",
      },
    ],
  },
  {
    name: "cli/test/rm.test.js",
    tests: [
      { name: "deletes the component", status: "passed", duration: 6 },
      { name: "refuses a shared file without --force", status: "skipped" },
    ],
  },
]
</script>

<template>
  <TestResults class="w-full max-w-md" :suites="suites" />
</template>
