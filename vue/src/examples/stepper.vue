<script setup lang="ts">
import {
  Stepper, StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperTitle,
} from "@/components/ui/stepper"
</script>

<template>
  <div class="w-full max-w-lg">
    <Stepper>
      <StepperItem status="complete">
        <StepperIndicator>1</StepperIndicator>
        <StepperContent>
          <StepperTitle>Tokens</StepperTitle>
          <StepperDescription>Copy globals.css</StepperDescription>
        </StepperContent>
      </StepperItem>
      <StepperItem status="current">
        <StepperIndicator>2</StepperIndicator>
        <StepperContent>
          <StepperTitle>Button</StepperTitle>
          <StepperDescription>First component</StepperDescription>
        </StepperContent>
      </StepperItem>
      <StepperItem status="upcoming">
        <StepperIndicator>3</StepperIndicator>
        <StepperContent>
          <StepperTitle>Ship</StepperTitle>
          <StepperDescription>The rest on demand</StepperDescription>
        </StepperContent>
      </StepperItem>
    </Stepper>
  </div>
</template>
