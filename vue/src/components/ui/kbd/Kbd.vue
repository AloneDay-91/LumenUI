<script setup lang="ts">
import { Fragment, Text, computed, h, inject, isVNode, type Component, type HTMLAttributes, type VNode } from "vue"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Command } from "@lucide/vue"

import { cn } from "@/lib/utils"
import { kbdSizeKey, kbdVariants, type KbdVariantProps } from "."

const props = defineProps<{
  size?: KbdVariantProps["size"]
  variant?: KbdVariantProps["variant"]
  class?: HTMLAttributes["class"]
}>()

const slots = defineSlots<{ default?: () => VNode[] }>()

const groupSize = inject(kbdSizeKey, undefined)
const resolvedSize = computed(() => props.size ?? groupSize?.value)

const KEY_ICONS: Record<string, Component> = {
  "⌘": Command,
  "↑": ArrowUp,
  "↓": ArrowDown,
  "←": ArrowLeft,
  "→": ArrowRight,
}

const KEY_GLYPH_RE = /(⌘|↑|↓|←|→)/

// JetBrains Mono lacks these glyphs: swap each for a Lucide icon, keeping the
// character for screen readers.
function renderText(text: string): (VNode | string)[] {
  const parts = text.split(KEY_GLYPH_RE)
  if (parts.length === 1) return [text]
  return parts.flatMap((part): (VNode | string)[] => {
    const Icon = KEY_ICONS[part]
    if (!Icon) return part ? [part] : []
    return [h("span", { class: "sr-only" }, part), h(Icon, { "aria-hidden": "true", class: "size-[1em]" })]
  })
}

function transform(nodes: unknown[]): (VNode | string)[] {
  return nodes.flatMap((node) => {
    if (typeof node === "string") return renderText(node)
    if (!isVNode(node)) return []
    if (node.type === Text && typeof node.children === "string") return renderText(node.children)
    if (node.type === Fragment && Array.isArray(node.children)) return transform(node.children)
    return [node]
  })
}

const Content = () => transform(slots.default?.() ?? [])
</script>

<template>
  <kbd
    data-slot="kbd"
    :class="cn(kbdVariants({ size: resolvedSize, variant }), props.class)"
  >
    <Content />
  </kbd>
</template>
