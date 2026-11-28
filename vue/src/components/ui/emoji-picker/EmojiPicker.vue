<script setup lang="ts">
import { computed, onMounted, ref, type HTMLAttributes } from "vue"
import { Search } from "@lucide/vue"

import { cn } from "@/lib/utils"
import { COLUMNS, emojiCategories, withTone, type Emoji, type EmojiCategory } from "./data"
import ToneMenu from "./ToneMenu.vue"

/**
 * A searchable grid of emoji in categories, with a skin tone choice. The
 * arrows move through the grid, Enter picks, and typing anywhere searches.
 * Put it in a Popover next to a reaction or a message field.
 */
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    /** Your own set, in the same shape as the default. */
    categories?: EmojiCategory[]
    /** Focus the search field when it mounts, e.g. inside a popover. */
    autoFocus?: boolean
    labels?: { search?: string; empty?: string; tone?: string }
  }>(),
  { categories: () => emojiCategories, autoFocus: false, labels: () => ({}) }
)
const emit = defineEmits<{ select: [emoji: string, details: { name: string }] }>()

const query = ref("")
const tone = ref(0)
const hovered = ref<Emoji | null>(null)
const focusIndex = ref(0)
const gridRef = ref<HTMLDivElement | null>(null)
const sectionRefs = new Map<string, HTMLElement>()

const q = computed(() => query.value.trim().toLowerCase())
const visible = computed(() =>
  props.categories
    .map((category) => ({
      ...category,
      emojis: q.value
        ? category.emojis.filter(
            (e) => e.name.includes(q.value) || e.keywords.includes(q.value) || e.emoji === q.value
          )
        : category.emojis,
    }))
    .filter((category) => category.emojis.length)
)
const flat = computed(() => visible.value.flatMap((category) => category.emojis))
/** Index of each category's first emoji in `flat`, for data-index. */
const offsets = computed(() => {
  let at = 0
  return visible.value.map((category) => {
    const start = at
    at += category.emojis.length
    return start
  })
})
const current = computed(() => hovered.value ?? flat.value[focusIndex.value])

function focusCell(index: number) {
  const next = Math.max(0, Math.min(flat.value.length - 1, index))
  focusIndex.value = next
  requestAnimationFrame(() =>
    gridRef.value?.querySelector<HTMLButtonElement>(`[data-index="${next}"]`)?.focus()
  )
}

function onInput(event: Event) {
  query.value = (event.target as HTMLInputElement).value
  focusIndex.value = 0
}

function onSearchKeydown(event: KeyboardEvent) {
  const first = flat.value[0]
  if (event.key === "ArrowDown") {
    event.preventDefault()
    focusCell(0)
  } else if (event.key === "Enter" && first) {
    event.preventDefault()
    emit("select", withTone(first, tone.value), { name: first.name })
  }
}

const moves: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: COLUMNS, ArrowUp: -COLUMNS }

function onGridKeydown(event: KeyboardEvent) {
  const target = event.target as HTMLElement
  const at = Number(target.dataset.index)
  if (Number.isNaN(at)) return
  if (event.key in moves) {
    event.preventDefault()
    if (event.key === "ArrowUp" && at < COLUMNS) {
      gridRef.value?.parentElement?.querySelector<HTMLInputElement>("input[type=search]")?.focus()
      return
    }
    focusCell(at + moves[event.key]!)
  } else if (event.key === "Home") {
    event.preventDefault()
    focusCell(0)
  } else if (event.key === "End") {
    event.preventDefault()
    focusCell(flat.value.length - 1)
  }
}

function setSectionRef(id: string, node: unknown) {
  if (node) sectionRefs.set(id, node as HTMLElement)
  else sectionRefs.delete(id)
}

function scrollToCategory(id: string) {
  sectionRefs.get(id)?.scrollIntoView({ block: "start", behavior: "smooth" })
}

// `autofocus` only works on page load; focus after mount for popovers.
const searchRef = ref<HTMLInputElement | null>(null)
onMounted(() => {
  if (props.autoFocus) requestAnimationFrame(() => searchRef.value?.focus())
})
</script>

<template>
  <div data-slot="emoji-picker" :class="cn('flex w-72 flex-col overflow-hidden', props.class)">
    <div class="flex items-center gap-1.5 p-2">
      <label class="relative flex-1">
        <Search
          aria-hidden="true"
          class="pointer-events-none absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref="searchRef"
          type="search"
          :value="query"
          :autofocus="autoFocus || undefined"
          :placeholder="labels.search ?? 'Search emoji'"
          :aria-label="labels.search ?? 'Search emoji'"
          class="h-8 w-full rounded-2xl border border-border bg-transparent ps-8 pe-3 text-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 [&::-webkit-search-cancel-button]:hidden"
          @input="onInput"
          @keydown="onSearchKeydown"
        />
      </label>
      <ToneMenu :tone="tone" :label="labels.tone ?? 'Skin tone'" @change="tone = $event" />
    </div>

    <nav v-if="!q" aria-label="Categories" class="flex items-center justify-between border-b border-border px-2 pb-1">
      <button
        v-for="category in categories"
        :key="category.id"
        type="button"
        :aria-label="category.label"
        :title="category.label"
        class="flex size-7 items-center justify-center rounded-lg text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 [&_svg]:size-4"
        @click="scrollToCategory(category.id)"
      >
        <component :is="category.icon" />
      </button>
    </nav>

    <div
      ref="gridRef"
      role="grid"
      aria-label="Emoji"
      :aria-rowcount="Math.ceil(flat.length / COLUMNS)"
      class="h-64 scroll-fade overflow-y-auto px-2 pb-2"
      @keydown="onGridKeydown"
    >
      <template v-if="visible.length">
        <section
          v-for="(category, c) in visible"
          :key="category.id"
          :ref="(node) => setSectionRef(category.id, node)"
          :aria-label="category.label"
          class="scroll-mt-1"
        >
          <h3 class="sticky top-0 z-10 m-0 bg-popover pt-2 pb-1 text-[11px] font-medium text-muted-foreground">
            {{ category.label }}
          </h3>
          <div role="row" class="grid grid-cols-8">
            <button
              v-for="(emoji, e) in category.emojis"
              :key="`${category.id}-${emoji.emoji}-${emoji.name}`"
              type="button"
              role="gridcell"
              :data-index="offsets[c]! + e"
              :tabindex="offsets[c]! + e === focusIndex ? 0 : -1"
              :aria-label="emoji.name"
              class="flex aspect-square items-center justify-center rounded-lg text-xl leading-none outline-none transition-transform hover:bg-muted focus-visible:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 active:scale-90"
              @click="emit('select', withTone(emoji, tone), { name: emoji.name })"
              @focus="focusIndex = offsets[c]! + e"
              @mouseenter="hovered = emoji"
              @mouseleave="hovered = null"
            >
              {{ withTone(emoji, tone) }}
            </button>
          </div>
        </section>
      </template>
      <p v-else class="m-0 py-10 text-center text-xs text-muted-foreground">
        {{ labels.empty ?? "No emoji found" }}
      </p>
    </div>

    <div aria-hidden="true" class="flex h-11 items-center gap-2 border-t border-border px-3">
      <template v-if="current">
        <span class="text-2xl leading-none">{{ withTone(current, tone) }}</span>
        <span class="min-w-0 flex-1 truncate text-xs first-letter:uppercase">{{ current.name }}</span>
      </template>
    </div>
  </div>
</template>
