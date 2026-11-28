<script setup lang="ts">
import { computed, provide, ref, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { bannerVariants, type BannerVariantProps } from "."
import { bannerKey, type BannerVariant } from "./context"

const props = withDefaults(
  defineProps<{
    /** Hue of the indicator dot. The surface stays neutral. */
    variant?: BannerVariant
    appearance?: BannerVariantProps["appearance"]
    /** Controlled visibility; use `v-model:open`. Leave unset to let the banner manage itself. */
    open?: boolean
    defaultOpen?: boolean
    class?: HTMLAttributes["class"]
  }>(),
  { variant: "default", open: undefined, defaultOpen: true }
)
const emit = defineEmits<{ "update:open": [open: boolean] }>()

const uncontrolled = ref(props.defaultOpen)
const isOpen = computed(() => props.open ?? uncontrolled.value)

provide(bannerKey, {
  variant: computed(() => props.variant),
  dismiss: () => {
    if (props.open === undefined) uncontrolled.value = false
    emit("update:open", false)
  },
})
</script>

<template>
  <div
    v-if="isOpen"
    data-slot="banner"
    :data-variant="variant"
    :data-appearance="appearance ?? 'bar'"
    role="region"
    aria-label="Announcement"
    :class="cn(bannerVariants({ appearance }), props.class)"
  >
    <slot />
  </div>
</template>
