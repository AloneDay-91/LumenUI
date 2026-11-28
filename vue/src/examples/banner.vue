<script setup lang="ts">
import {
  Banner, BannerAction, BannerClose, BannerContent, BannerDescription, BannerIndicator, BannerTitle,
} from "@/components/ui/banner"
</script>

<template>
  <div class="w-full overflow-hidden rounded-2xl bg-background ring-1 ring-foreground/5 dark:ring-foreground/10">
    <Banner variant="new">
      <BannerIndicator />
      <BannerContent>
        <BannerTitle>Lumen 1.1 is out</BannerTitle>
        <BannerDescription>thirteen new components and status toasts.</BannerDescription>
      </BannerContent>
      <BannerAction href="/docs/changelog">Changelog</BannerAction>
      <BannerClose />
    </Banner>
    <div class="h-20" />
  </div>
</template>
