<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/components/ui/collapsible"
</script>

<template>
  <Collapsible class="w-full max-w-md">
    <CollapsibleTrigger as-child>
      <Button variant="outline">Show details</Button>
    </CollapsibleTrigger>
    <CollapsiblePanel class="pt-3">Tokens, CVA, Reka UI. The code lives in your repo.</CollapsiblePanel>
  </Collapsible>
</template>
