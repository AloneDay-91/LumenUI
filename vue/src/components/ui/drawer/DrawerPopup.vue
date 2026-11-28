<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { DrawerPopup, useForwardPropsEmits, type DrawerPopupEmits, type DrawerPopupProps } from "reka-ui"

import { cn } from "@/lib/utils"
import DrawerBackdrop from "./DrawerBackdrop.vue"
import DrawerHandle from "./DrawerHandle.vue"
import DrawerPortal from "./DrawerPortal.vue"
import DrawerViewport from "./DrawerViewport.vue"

defineOptions({ inheritAttrs: false })

const props = defineProps<DrawerPopupProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<DrawerPopupEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)

// Reka unmounts the popup once its animation ends, so the slide in and out are
// tw-animate keyframes per edge instead of Base UI's starting/ending styles.
const popupClassName = [
  "bg-popover text-popover-foreground p-5 ring-1 ring-foreground/5 outline-none dark:ring-foreground/10",
  "pointer-events-auto relative overflow-y-auto transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0",
  "data-[state=open]:animate-in data-[state=closed]:animate-out",
  "data-[swipe-direction=down]:mt-auto data-[swipe-direction=down]:max-h-[85dvh] data-[swipe-direction=down]:w-full data-[swipe-direction=down]:translate-y-(--drawer-swipe-movement-y) data-[swipe-direction=down]:data-[state=open]:slide-in-from-bottom data-[swipe-direction=down]:data-[state=closed]:slide-out-to-bottom",
  "data-[swipe-direction=up]:mb-auto data-[swipe-direction=up]:max-h-[85dvh] data-[swipe-direction=up]:w-full data-[swipe-direction=up]:translate-y-(--drawer-swipe-movement-y) data-[swipe-direction=up]:data-[state=open]:slide-in-from-top data-[swipe-direction=up]:data-[state=closed]:slide-out-to-top",
  "data-[swipe-direction=left]:mr-auto data-[swipe-direction=left]:h-full data-[swipe-direction=left]:translate-x-(--drawer-swipe-movement-x) data-[swipe-direction=left]:data-[state=open]:slide-in-from-left data-[swipe-direction=left]:data-[state=closed]:slide-out-to-left",
  "data-[swipe-direction=right]:ml-auto data-[swipe-direction=right]:h-full data-[swipe-direction=right]:translate-x-(--drawer-swipe-movement-x) data-[swipe-direction=right]:data-[state=open]:slide-in-from-right data-[swipe-direction=right]:data-[state=closed]:slide-out-to-right",
  "data-[swipe-direction=down]:rounded-t-[min(var(--radius-4xl),24px)]",
  "data-[swipe-direction=up]:rounded-b-[min(var(--radius-4xl),24px)]",
  "data-[swipe-direction=right]:rounded-l-[min(var(--radius-4xl),24px)]",
  "data-[swipe-direction=left]:rounded-r-[min(var(--radius-4xl),24px)]",
]
</script>

<template>
  <DrawerPortal>
    <DrawerBackdrop />
    <DrawerViewport>
      <DrawerPopup
        data-slot="drawer-popup"
        v-bind="{ ...$attrs, ...forwarded }"
        :class="cn(popupClassName, props.class)"
      >
        <DrawerHandle />
        <slot />
      </DrawerPopup>
    </DrawerViewport>
  </DrawerPortal>
</template>
