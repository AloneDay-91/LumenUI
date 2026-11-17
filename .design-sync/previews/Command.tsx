import { CalendarIcon, CreditCardIcon, SettingsIcon, SmileIcon, UserIcon } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Kbd,
} from "lumen-ui"

export const Default = () => (
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
    <CommandFooter>
      <span className="inline-flex items-center gap-1">
        <Kbd size="sm">↑</Kbd>
        <Kbd size="sm">↓</Kbd>
        Navigate
      </span>
      <span className="inline-flex items-center gap-1">
        <Kbd size="sm">↵</Kbd>
        Open
      </span>
    </CommandFooter>
  </Command>
)

export const Palette = () => (
  <Command className="w-full max-w-sm ring-1 ring-foreground/5 shadow-lg dark:ring-foreground/10">
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
  </Command>
)
