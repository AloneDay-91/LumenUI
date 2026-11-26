export const dropdownMenuContentClassName =
  "z-[100] flex max-h-(--reka-popper-available-height) w-(--reka-popper-anchor-width) min-w-32 origin-(--reka-popper-transform-origin) flex-col overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/5 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:ring-foreground/10 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"

export const dropdownMenuItemClassName =
  "group/dropdown-menu-item relative flex min-h-7 cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 text-xs outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

export const dropdownMenuSubTriggerClassName =
  "flex min-h-7 cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 text-xs outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:pl-7 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

export const dropdownMenuCheckboxItemClassName =
  "relative flex min-h-7 cursor-pointer items-center gap-2 rounded-xl py-1.5 pr-8 pl-2 text-xs outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
