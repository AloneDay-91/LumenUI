<script setup lang="ts">
import { computed, provide, ref, type HTMLAttributes } from "vue"
import { useEventListener, useMediaQuery } from "@vueuse/core"

import { cn } from "@/lib/utils"
import {
  MOBILE_QUERY,
  SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  SidebarContextKey,
  type SidebarCollapsible,
  type SidebarSide,
  type SidebarState,
} from "./context"

/** Holds the open state. `v-model:open` controls it; ⌘B / Ctrl+B toggles it unless `shortcut` is false. */
const props = withDefaults(
  defineProps<{
    defaultOpen?: boolean
    open?: boolean
    shortcut?: boolean
    class?: HTMLAttributes["class"]
  }>(),
  { defaultOpen: true, open: undefined, shortcut: true },
)
const emit = defineEmits<{ "update:open": [open: boolean] }>()

const isMobile = useMediaQuery(MOBILE_QUERY, { ssrWidth: 1024 })
const uncontrolledOpen = ref(props.defaultOpen)
const openMobile = ref(false)
const side = ref<SidebarSide>("left")
const peek = ref(false)
const collapsible = ref<SidebarCollapsible | null>("offcanvas")
const open = computed(() => props.open ?? uncontrolledOpen.value)

function setOpen(next: boolean) {
  peek.value = false
  emit("update:open", next)
  if (props.open === undefined) uncontrolledOpen.value = next
}

function toggleSidebar() {
  if (isMobile.value) {
    openMobile.value = !openMobile.value
    return
  }
  if (collapsible.value === "none" || collapsible.value === null) return
  setOpen(!open.value)
}

useEventListener("keydown", (event: KeyboardEvent) => {
  if (!props.shortcut) return
  if (event.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
    event.preventDefault()
    toggleSidebar()
  }
})

const state = computed<SidebarState>(() => (open.value || peek.value ? "expanded" : "collapsed"))

provide(SidebarContextKey, {
  state,
  open,
  peek,
  setPeek: (value) => (peek.value = value),
  setOpen,
  openMobile,
  setOpenMobile: (value) => (openMobile.value = value),
  isMobile,
  toggleSidebar,
  side,
  setSide: (value) => (side.value = value),
  collapsible,
})

const style = { "--sidebar-width": SIDEBAR_WIDTH, "--sidebar-width-icon": SIDEBAR_WIDTH_ICON }
</script>

<template>
  <div
    data-slot="sidebar-wrapper"
    :style="style"
    :class="
      cn(
        'flex h-svh w-full overflow-hidden',
        'has-data-[variant=floating]:bg-muted/40 has-data-[variant=inset]:bg-muted/40',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
