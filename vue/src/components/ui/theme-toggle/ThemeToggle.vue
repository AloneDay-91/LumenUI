<script setup lang="ts">
import { computed, onMounted, ref, type HTMLAttributes } from "vue"
import { useDark } from "@vueuse/core"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

// Puts the `dark` class on <html>, follows the system until a click, and remembers the choice.
const dark = useDark()

// The resolved theme only exists in the browser: render the server markup first.
const mounted = ref(false)
onMounted(() => (mounted.value = true))

const isDark = computed(() => mounted.value && dark.value)
</script>

<template>
  <Button
    variant="ghost"
    size="icon-sm"
    :class="cn('text-muted-foreground hover:text-foreground', props.class)"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    @click="dark = !isDark"
  >
    <span :class="mounted ? undefined : 'invisible'">
      <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M21.2481 11.8112C20.1889 12.56 18.8958 13 17.5 13C13.9101 13 11 10.0899 11 6.5C11 5.10416 11.44 3.81108 12.1888 2.75189C12.126 2.75063 12.0631 2.75 12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 11.9369 21.2494 11.874 21.2481 11.8112Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.7123 8.28769C17.7626 10.3379 17.7626 13.6621 15.7123 15.7123C13.6621 17.7626 10.3379 17.7626 8.28769 15.7123C6.23744 13.6621 6.23744 10.3379 8.28769 8.28769C10.3379 6.23744 13.6621 6.23744 15.7123 8.28769Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 3.25V0.75M12 23.25V20.75M20.75 12H23.25M0.75 12H3.25M5.81282 5.81282L4.04505 4.04505M19.955 19.955L18.1872 18.1872M18.1872 5.81282L19.955 4.04506M4.04506 19.955L5.81282 18.1872"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  </Button>
</template>
