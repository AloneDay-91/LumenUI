<script setup lang="ts">
import { useClipboard } from "@vueuse/core"
import { Check, Copy } from "@lucide/vue"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataList, DataListItem, DataListLabel, DataListValue } from "@/components/ui/data-list"

const recordId = "u_2J89JSA4GJ"
const { copy, copied } = useClipboard({ copiedDuring: 1500 })
const linkClass = "underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
</script>

<template>
  <DataList class="w-full max-w-md">
    <DataListItem align="center">
      <DataListLabel min-width="5.5rem">Status</DataListLabel>
      <DataListValue>
        <Badge color="jade">Authorized</Badge>
      </DataListValue>
    </DataListItem>
    <DataListItem align="center">
      <DataListLabel min-width="5.5rem">ID</DataListLabel>
      <DataListValue>
        <span class="font-mono text-xs">{{ recordId }}</span>
        <Button
          variant="ghost"
          size="icon-xs"
          :aria-label="copied ? 'Copied' : 'Copy value'"
          @click="copy(recordId)"
        >
          <Check v-if="copied" />
          <Copy v-else />
        </Button>
      </DataListValue>
    </DataListItem>
    <DataListItem>
      <DataListLabel min-width="5.5rem">Name</DataListLabel>
      <DataListValue>Alex Martin</DataListValue>
    </DataListItem>
    <DataListItem>
      <DataListLabel min-width="5.5rem">Email</DataListLabel>
      <DataListValue>
        <a href="mailto:alex.martin@example.com" :class="linkClass">alex.martin@example.com</a>
      </DataListValue>
    </DataListItem>
    <DataListItem>
      <DataListLabel min-width="5.5rem">Company</DataListLabel>
      <DataListValue>
        <a href="https://github.com/AloneDay-91/LumenUI" target="_blank" rel="noreferrer" :class="linkClass">
          Lumen
        </a>
      </DataListValue>
    </DataListItem>
  </DataList>
</template>
