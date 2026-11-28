<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { AvatarImage, useForwardPropsEmits, type AvatarImageProps, type AvatarImageEmits } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<AvatarImageProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<AvatarImageEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <AvatarImage
    data-slot="avatar-image"
    v-bind="forwarded"
    :class="cn('size-full object-cover', props.class)"
  />
</template>
