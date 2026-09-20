"use client";

import * as React from "react";
import {
  CalendarIcon,
  CreditCardIcon,
  SettingsIcon,
  SmileIcon,
  UserIcon,
} from "lucide-react";

import { CodeBlock } from "@/components/docs/CodeBlock";
import { ComponentDocs } from "@/components/docs/ComponentDocs";
import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/Command";

function CommandPaletteDemo() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((current) => !current);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open palette
        <CommandShortcut>⌘K</CommandShortcut>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <CalendarIcon />
              Calendar
            </CommandItem>
            <CommandItem>
              <SmileIcon />
              Search emoji
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <UserIcon />
              Profile
              <CommandShortcut>⌘ + P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCardIcon />
              Billing
              <CommandShortcut>⌘ + B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <SettingsIcon />
              Settings
              <CommandShortcut>⌘ + S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default function CommandPage() {
  return (
    <ComponentDocs
      name="Command"
      description="Filterable command menu with keyboard navigation. Built on cmdk."
      preview={
        <Command className="w-full max-w-sm ring-1 ring-foreground/5 dark:ring-foreground/10">
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
        </Command>
      }
      usage={`import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/Command"

<Command>
  <CommandInput placeholder="Search a component…" />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Components">
      <CommandItem>Button</CommandItem>
      <CommandItem>Dialog</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
      extraHeadings={[{ id: "dialog", text: "Command palette", level: 2 }]}
      extra={
        <section className="space-y-4">
          <h2 id="dialog">Command palette</h2>
          <p>
            <code>CommandDialog</code> wraps the menu in the Lumen{" "}
            <code>Dialog</code>. Bind it to <code>⌘K</code> for a global
            palette.
          </p>
          <div className="flex justify-center rounded-2xl border border-foreground/5 p-6 dark:border-foreground/10">
            <CommandPaletteDemo />
          </div>
          <CodeBlock
            code={`const [open, setOpen] = React.useState(false)

React.useEffect(() => {
  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      setOpen((current) => !current)
    }
  }

  document.addEventListener("keydown", onKeyDown)
  return () => document.removeEventListener("keydown", onKeyDown)
}, [])

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command or search…" />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Settings">
      <CommandItem>
        Profile
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`}
          />
        </section>
      }
    />
  );
}
