<script setup lang="ts">
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/components/ui/accordion"
</script>

<template>
  <Accordion type="single" collapsible default-value="a">
    <AccordionItem value="a">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionPanel>Yes. Reka UI handles focus and keyboard.</AccordionPanel>
    </AccordionItem>
  </Accordion>
</template>
