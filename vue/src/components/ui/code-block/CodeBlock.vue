<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"

import { CopyButton } from "@/components/ui/copy-button"
import { cn } from "@/lib/utils"

/**
 * Code on a muted panel with a header for the file name and a copy button.
 * No highlighter is bundled: pass highlighted nodes in the default slot, or a
 * plain string as `code`. `code` is also what the copy button copies.
 */
const props = withDefaults(
  defineProps<{
    code: string
    /** File name or label in the header. The `#title` slot takes rich content. */
    title?: string
    /** Shown in the header when there is no title. */
    language?: string
    lineNumbers?: boolean
    /** Wrap long lines instead of scrolling sideways. */
    wrap?: boolean
    /** Any CSS length. The body scrolls past it. */
    maxHeight?: string
    copyable?: boolean
    class?: HTMLAttributes["class"]
  }>(),
  { lineNumbers: false, wrap: false, copyable: true },
)

const label = computed(() => props.title ?? props.language)
const lines = computed(() => props.code.replace(/\n$/, "").split("\n"))
</script>

<template>
  <div
    data-slot="code-block"
    :class="cn('overflow-hidden rounded-2xl border border-border bg-muted/40 text-xs', props.class)"
  >
    <div
      v-if="$slots.title || label || copyable"
      class="flex h-9 items-center justify-between gap-2 border-b border-border ps-3 pe-1.5"
    >
      <span class="min-w-0 truncate font-mono text-[11px] text-muted-foreground"><slot name="title">{{ label }}</slot></span>
      <CopyButton v-if="copyable" :value="code" size="icon-xs" label="Copy code" />
    </div>
    <pre
      data-slot="code-block-body"
      tabindex="0"
      :class="
        cn(
          'm-0 overflow-auto p-3 font-mono text-[12px] leading-5 outline-none focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:ring-inset',
          wrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre',
        )
      "
      :style="maxHeight ? { maxHeight } : undefined"
    ><slot><code v-if="lineNumbers" class="grid grid-cols-[auto_1fr] gap-x-4"><template v-for="(line, index) in lines" :key="index"><span aria-hidden="true" class="text-end text-muted-foreground/60 select-none tabular-nums">{{ index + 1 }}</span><span>{{ line || " " }}</span></template></code><code v-else>{{ code }}</code></slot></pre>
  </div>
</template>
