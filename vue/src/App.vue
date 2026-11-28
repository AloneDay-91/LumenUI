<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type Component } from "vue"

// Every file in ./examples is one docs example. The docs show its source under the Vue tab;
// here they render together. Open #/button to see one alone.
const modules = import.meta.glob<{ default: Component }>("./examples/*.vue", { eager: true })
const examples = Object.entries(modules)
  .map(([path, mod]) => ({ slug: path.replace("./examples/", "").replace(".vue", ""), component: mod.default }))
  .sort((a, b) => a.slug.localeCompare(b.slug))

const hash = ref(window.location.hash)
const onHash = () => (hash.value = window.location.hash)
onMounted(() => window.addEventListener("hashchange", onHash))
onUnmounted(() => window.removeEventListener("hashchange", onHash))

const only = computed(() => hash.value.replace(/^#\/?/, ""))
const shown = computed(() =>
  examples.some((example) => example.slug === only.value)
    ? examples.filter((example) => example.slug === only.value)
    : examples
)

const dark = ref(false)
function toggleTheme() {
  dark.value = !dark.value
  document.documentElement.classList.toggle("dark", dark.value)
}
</script>

<template>
  <main class="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12">
    <header class="flex items-center justify-between gap-4">
      <div>
        <h1 class="font-serif text-2xl">Lumen UI for Vue</h1>
        <p class="text-xs text-muted-foreground">{{ examples.length }} examples · Reka UI behavior, Lumen tokens.</p>
      </div>
      <div class="flex items-center gap-3 text-xs">
        <a v-if="shown.length === 1" href="#/">All examples</a>
        <button type="button" class="text-muted-foreground hover:text-foreground" @click="toggleTheme">
          {{ dark ? "Light" : "Dark" }}
        </button>
      </div>
    </header>

    <section
      v-for="example in shown"
      :id="example.slug"
      :key="example.slug"
      class="flex flex-col gap-3"
    >
      <a :href="`#/${example.slug}`" class="text-xs font-medium text-muted-foreground no-underline">
        {{ example.slug }}
      </a>
      <div
        data-example
        class="flex min-h-24 flex-wrap items-center justify-center gap-4 rounded-3xl border border-border px-6 py-8"
      >
        <component :is="example.component" />
      </div>
    </section>
  </main>
</template>
