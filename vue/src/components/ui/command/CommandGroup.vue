<script setup lang="ts">
import { computed, inject, provide, useId, type HTMLAttributes } from "vue"
import { ListboxGroup, ListboxGroupLabel, useForwardProps, type ListboxGroupProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { commandContextKey, commandGroupKey } from "./context"

const props = defineProps<
  ListboxGroupProps & {
    /** Text shown above the group. Use the `heading` slot for richer content. */
    heading?: string
    /** Keep the group rendered even when none of its items match. */
    forceMount?: boolean
    class?: HTMLAttributes["class"]
  }
>()

const delegated = computed(() => {
  const { class: _class, heading: _heading, forceMount: _forceMount, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)

const id = useId()
provide(commandGroupKey, id)
const context = inject(commandContextKey)!
const visible = computed(() => props.forceMount || context.isGroupVisible(id))

const groupClassName =
  "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
</script>

<template>
  <!-- v-show, not v-if: the items stay mounted so they stay registered. -->
  <ListboxGroup
    v-show="visible"
    data-slot="command-group"
    v-bind="forwarded"
    :class="cn(groupClassName, props.class)"
  >
    <ListboxGroupLabel v-if="heading || $slots.heading" cmdk-group-heading="">
      <slot name="heading">{{ heading }}</slot>
    </ListboxGroupLabel>
    <slot />
  </ListboxGroup>
</template>
