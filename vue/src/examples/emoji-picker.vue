<script setup lang="ts">
import { ref } from "vue"
import { SmilePlus } from "@lucide/vue"
import { Button } from "@/components/ui/button"
import { EmojiPicker } from "@/components/ui/emoji-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const reactions = ref<Record<string, number>>({ "👍": 3, "🎉": 1 })
const open = ref(false)

function add(emoji: string) {
  reactions.value[emoji] = (reactions.value[emoji] ?? 0) + 1
}

function pick(emoji: string) {
  add(emoji)
  open.value = false
}
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <div class="rounded-2xl bg-muted/50 p-3 text-xs">
      The 1.4 release notes are up. Thanks everyone for the reviews!
    </div>
    <div class="flex flex-wrap items-center gap-1.5">
      <button
        v-for="(count, emoji) in reactions"
        :key="emoji"
        type="button"
        :aria-label="`${emoji} ${count}`"
        class="inline-flex h-7 items-center gap-1 rounded-full border border-border px-2 text-xs tabular-nums hover:bg-muted"
        @click="add(emoji)"
      >
        <span class="text-sm leading-none">{{ emoji }}</span>
        {{ count }}
      </button>
      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <Button variant="ghost" size="icon-sm" aria-label="Add a reaction"><SmilePlus /></Button>
        </PopoverTrigger>
        <PopoverContent align="start" class="w-auto p-0">
          <EmojiPicker auto-focus @select="pick" />
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>
