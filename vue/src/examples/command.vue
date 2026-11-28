<script setup lang="ts">
import {
  Command,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Kbd } from "@/components/ui/kbd"
</script>

<template>
  <Command class="w-full max-w-sm ring-1 ring-foreground/5 dark:ring-foreground/10">
    <CommandInput placeholder="Search a component…" />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Components">
        <CommandItem>Button</CommandItem>
        <CommandItem>Dialog</CommandItem>
        <CommandItem>Select</CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Foundations">
        <CommandItem>Styles</CommandItem>
        <CommandItem disabled>Tokens</CommandItem>
      </CommandGroup>
    </CommandList>
    <CommandFooter>
      <span class="inline-flex items-center gap-1">
        <Kbd size="sm">↑</Kbd>
        <Kbd size="sm">↓</Kbd>
        Navigate
      </span>
      <span class="inline-flex items-center gap-1">
        <Kbd size="sm">↵</Kbd>
        Open
      </span>
    </CommandFooter>
  </Command>
</template>
