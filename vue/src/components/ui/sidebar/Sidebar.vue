<script setup lang="ts">
import { computed, onBeforeUnmount, watchEffect, type HTMLAttributes } from "vue"

import { Drawer, DrawerPopup, DrawerTitle } from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import {
  SIDEBAR_WIDTH,
  useSidebar,
  widthClass,
  type SidebarCollapsible,
  type SidebarSide,
  type SidebarState,
  type SidebarVariant,
} from "./context"

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    side?: SidebarSide
    variant?: SidebarVariant
    collapsible?: SidebarCollapsible
    /** With `collapsible="icon"`: hovering the collapsed rail opens it, leaving closes it. */
    expandOnHover?: boolean
    class?: HTMLAttributes["class"]
  }>(),
  { side: "left", variant: "sidebar", collapsible: "offcanvas", expandOnHover: false },
)

const sidebar = useSidebar()
const { open, openMobile, setOpenMobile, isMobile, peek, setPeek } = sidebar

const closed = computed(() => !open.value && props.collapsible !== "none")
const canPeek = computed(() => props.expandOnHover && props.collapsible === "icon" && closed.value)
const peeking = computed(() => canPeek.value && peek.value)
// A hover opens the sidebar exactly like the trigger: same width, the page moves.
const state = computed<SidebarState>(() => (closed.value && !peeking.value ? "collapsed" : "expanded"))

const PEEK_OPEN_DELAY = 150
const PEEK_CLOSE_DELAY = 250
let peekTimer: ReturnType<typeof setTimeout> | undefined

function schedulePeek(next: boolean, panel?: HTMLElement) {
  clearTimeout(peekTimer)
  peekTimer = setTimeout(
    () => {
      // Stay open while a menu opened from the sidebar (account, workspace) is up.
      if (!next && panel?.querySelector('[aria-expanded="true"]')) {
        schedulePeek(false, panel)
        return
      }
      setPeek(next)
    },
    next ? PEEK_OPEN_DELAY : PEEK_CLOSE_DELAY,
  )
}

onBeforeUnmount(() => clearTimeout(peekTimer))

watchEffect(() => {
  sidebar.collapsible.value = props.collapsible
  sidebar.setSide(props.side)
})

function onPointerEnter(event: PointerEvent) {
  if (canPeek.value && event.pointerType !== "touch") schedulePeek(true)
}

function onPointerLeave(event: PointerEvent) {
  if (canPeek.value || peek.value) schedulePeek(false, event.currentTarget as HTMLElement)
}

function innerClass(mobile: boolean) {
  return cn(
    "flex h-full min-h-0 w-full flex-col text-foreground",
    // Off-canvas slides out at full width instead of squeezing its labels.
    !mobile && props.collapsible !== "icon" && "min-w-(--sidebar-width)",
    !mobile &&
      props.variant === "sidebar" &&
      "border-border bg-background group-data-[side=left]/sidebar:border-r group-data-[side=right]/sidebar:border-l",
    !mobile && props.variant === "floating" && "rounded-[min(var(--radius-4xl),24px)] border border-border bg-card",
    !mobile && props.variant === "inset" && "bg-transparent",
  )
}

const drawerStyle = { "--sidebar-width": SIDEBAR_WIDTH }
</script>

<template>
  <div
    data-slot="sidebar"
    :data-side="side"
    :data-variant="variant"
    :data-state="state"
    :data-collapsible="state === 'collapsed' ? collapsible : ''"
    :data-peek="peeking ? '' : undefined"
    v-bind="$attrs"
    :class="
      cn(
        'group/sidebar peer relative hidden h-full shrink-0 overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] md:flex',
        // Anchor the panel to the outer edge, so it slides toward it.
        side === 'left' ? 'justify-end' : 'order-last justify-start',
        variant !== 'sidebar' && state !== 'collapsed' && 'p-2',
        variant !== 'sidebar' && state === 'collapsed' && collapsible === 'icon' && 'p-2',
        widthClass(variant, collapsible, open || peeking),
        props.class,
      )
    "
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
  >
    <div data-slot="sidebar-inner" :data-variant="variant" :class="innerClass(false)">
      <slot />
    </div>
  </div>
  <Drawer
    v-if="isMobile"
    :open="openMobile"
    :swipe-direction="side === 'left' ? 'left' : 'right'"
    @update:open="setOpenMobile"
  >
    <DrawerPopup class="h-dvh w-(--sidebar-width) max-w-[85vw] rounded-none p-0" :style="drawerStyle">
      <DrawerTitle class="sr-only">Sidebar</DrawerTitle>
      <div data-slot="sidebar-inner" :data-variant="variant" :class="innerClass(true)">
        <slot />
      </div>
    </DrawerPopup>
  </Drawer>
</template>
