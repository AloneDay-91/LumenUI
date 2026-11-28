<script setup lang="ts">
import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsPanels, TabsTab } from "@/components/ui/tabs"
</script>

<template>
  <Tabs default-value="account">
    <TabsList>
      <TabsTab value="account">Account</TabsTab>
      <TabsTab value="password">Password</TabsTab>
      <TabsIndicator />
    </TabsList>
    <TabsPanels>
      <TabsPanel value="account">Account settings.</TabsPanel>
      <TabsPanel value="password">Change your password.</TabsPanel>
    </TabsPanels>
  </Tabs>
</template>
