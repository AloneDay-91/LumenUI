<script setup lang="ts">
import { computed, inject, type HTMLAttributes } from "vue"
import { Separator, type SeparatorProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { commandContextKey } from "./context"

const props = defineProps<
  SeparatorProps & {
    /** Keep the separator while searching (cmdk hides it by default). */
    alwaysRender?: boolean
    class?: HTMLAttributes["class"]
  }
>()

const delegated = computed(() => {
  const { class: _class, alwaysRender: _alwaysRender, ...rest } = props
  return rest
})

const context = inject(commandContextKey)!
const visible = computed(() => props.alwaysRender || !context.search.value)
</script>

<template>
  <Separator
    v-if="visible"
    aria-hidden="true"
    data-slot="command-separator"
    v-bind="delegated"
    :class="cn('-mx-1 my-1 h-px bg-foreground/5 dark:bg-foreground/10', props.class)"
  />
</template>
