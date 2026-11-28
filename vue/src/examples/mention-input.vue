<script setup lang="ts">
import { h, ref } from "vue"
import { BookOpen, CheckSquare, Languages, Sparkles } from "@lucide/vue"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MentionInput, type Mention, type MentionItem, type MentionTrigger } from "@/components/ui/mention-input"

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")

const people: MentionItem[] = [
  { id: "u1", label: "Alex Martin", description: "Design" },
  { id: "u2", label: "Sam Lee", description: "Engineering" },
  { id: "u3", label: "Noa Petit", description: "Product" },
  { id: "u4", label: "Jules Moreau", description: "Support" },
].map((person) => ({
  ...person,
  icon: () =>
    h(Avatar, { class: "size-5" }, () =>
      h(AvatarFallback, { class: "text-[9px]" }, () => initials(person.label)),
    ),
}))

const commands: MentionItem[] = [
  { id: "summarize", label: "summarize", description: "Sum up the thread", icon: Sparkles },
  { id: "translate", label: "translate", description: "Translate the last reply", icon: Languages },
  { id: "todo", label: "todo", description: "Turn it into tasks", icon: CheckSquare },
  { id: "docs", label: "docs", description: "Search the docs", icon: BookOpen },
]

const triggers: MentionTrigger[] = [
  { char: "@", items: people, label: "People" },
  { char: "/", items: commands, label: "Commands" },
]

const mentions = ref<Mention[]>([])
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-2">
    <MentionInput
      aria-label="Comment"
      placeholder="Type @ to mention someone, / for a command"
      :triggers="triggers"
      @value-change="(_, next) => (mentions = next)"
    />
    <p class="m-0 min-h-4 font-mono text-[11px] text-muted-foreground">
      {{ mentions.length ? mentions.map((m) => `${m.trigger}${m.id}`).join(" · ") : "No mentions yet" }}
    </p>
  </div>
</template>
