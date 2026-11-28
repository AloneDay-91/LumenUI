<script setup lang="ts">
import { Info } from "@lucide/vue"
import { Callout, CalloutIcon, CalloutText } from "@/components/ui/callout"
</script>

<template>
  <Callout class="max-w-md">
    <CalloutIcon><Info /></CalloutIcon>
    <CalloutText>You will need admin privileges to install and access this application.</CalloutText>
  </Callout>
</template>
