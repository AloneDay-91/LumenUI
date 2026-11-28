<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Library } from "@lucide/vue"
import { useForwardPropsEmits, type CollapsibleRootEmits, type CollapsibleRootProps } from "reka-ui"

import { Trace, TraceContent, TraceTrigger } from "@/components/ui/trace"
import SiteMark from "./SiteMark.vue"
import { hostOf, type Source } from "./utils"

/** The links the agent used for a reply, folded under “Used n sources”. */
const props = withDefaults(
  defineProps<
    CollapsibleRootProps & {
      sources: Source[]
      label?: (count: number) => string
      class?: HTMLAttributes["class"]
    }
  >(),
  { label: (count: number) => `Used ${count} source${count === 1 ? "" : "s"}`, open: undefined },
)
const emits = defineEmits<CollapsibleRootEmits>()

const delegated = computed(() => {
  const { class: _class, sources: _sources, label: _label, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <Trace data-slot="sources" v-bind="forwarded" :class="props.class">
    <TraceTrigger :label="label(sources.length)">
      <template #icon><Library /></template>
    </TraceTrigger>
    <TraceContent>
      <ul class="m-0 flex list-none flex-col gap-1.5 p-0 py-0.5">
        <li v-for="source in sources" :key="source.href">
          <a
            :href="source.href"
            target="_blank"
            rel="noreferrer"
            class="group/source flex items-center gap-2 rounded-md text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
          >
            <SiteMark :href="source.href" />
            <span class="min-w-0 truncate group-hover/source:underline group-hover/source:underline-offset-4">
              {{ source.title }}
            </span>
            <span class="shrink-0 text-muted-foreground">{{ hostOf(source.href) }}</span>
          </a>
        </li>
      </ul>
    </TraceContent>
  </Trace>
</template>
