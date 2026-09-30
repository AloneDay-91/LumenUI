"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { PanelLeftIcon, PanelRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { buttonVariants } from "@/components/ui/button-variants"
import {
  Drawer,
  DrawerPopup,
} from "@/components/ui/Drawer"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { Separator } from "@/components/ui/Separator"
import { Skeleton } from "@/components/ui/Skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip"
import { cn } from "@/lib/utils"

const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarSide = "left" | "right"
type SidebarVariant = "sidebar" | "floating" | "inset"
type SidebarCollapsible = "offcanvas" | "icon" | "none"
type SidebarState = "expanded" | "collapsed"

type SidebarContextValue = {
  state: SidebarState
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
  side: SidebarSide
  setSide: (side: SidebarSide) => void
  collapsibleRef: React.RefObject<SidebarCollapsible | null>
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider.")
  }
  return context
}

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return isMobile
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  shortcut = true,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  shortcut?: boolean
}) {
  const isMobile = useIsMobile()
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const [openMobile, setOpenMobile] = React.useState(false)
  const [side, setSide] = React.useState<SidebarSide>("left")
  const collapsibleRef = React.useRef<SidebarCollapsible | null>("offcanvas")
  const open = openProp ?? uncontrolledOpen

  const setOpen = React.useCallback(
    (next: boolean) => {
      onOpenChange?.(next)
      if (openProp === undefined) {
        setUncontrolledOpen(next)
      }
    },
    [onOpenChange, openProp]
  )

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((value) => !value)
      return
    }
    if (collapsibleRef.current === "none" || collapsibleRef.current === null) {
      return
    }
    setOpen(!open)
  }, [isMobile, open, setOpen])

  React.useEffect(() => {
    if (!shortcut) return

    function onKeyDown(event: KeyboardEvent) {
      if (
        event.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [shortcut, toggleSidebar])

  const state: SidebarState = open ? "expanded" : "collapsed"

  const context = React.useMemo<SidebarContextValue>(
    () => ({
      state,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
      side,
      setSide,
      collapsibleRef,
    }),
    [isMobile, open, openMobile, setOpen, setSide, side, state, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={context}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "flex h-svh w-full overflow-hidden",
          "has-data-[variant=floating]:bg-muted/40 has-data-[variant=inset]:bg-muted/40",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function widthClass(
  variant: SidebarVariant,
  collapsible: SidebarCollapsible,
  open: boolean
) {
  if (open || collapsible === "none") {
    return variant === "sidebar"
      ? "w-(--sidebar-width)"
      : "w-[calc(var(--sidebar-width)+1rem)]"
  }

  switch (collapsible) {
    case "offcanvas":
      return "w-0 border-0 p-0"
    case "icon":
      return variant === "sidebar"
        ? "w-(--sidebar-width-icon)"
        : "w-[calc(var(--sidebar-width-icon)+1rem)]"
    default: {
      const exhaustive: never = collapsible
      return exhaustive
    }
  }
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: SidebarSide
  variant?: SidebarVariant
  collapsible?: SidebarCollapsible
}) {
  const { open, openMobile, setOpenMobile, isMobile, collapsibleRef, setSide } =
    useSidebar()
  const state: SidebarState =
    !open && collapsible !== "none" ? "collapsed" : "expanded"

  collapsibleRef.current = collapsible

  React.useLayoutEffect(() => {
    setSide(side)
  }, [setSide, side])

  const panel = (
    <div
      data-slot="sidebar-inner"
      data-variant={variant}
      className={cn(
        "flex h-full min-h-0 w-full flex-col bg-background text-foreground",
        !isMobile &&
          variant === "sidebar" &&
          "border-border group-data-[side=left]/sidebar:border-r group-data-[side=right]/sidebar:border-l",
        !isMobile &&
          variant !== "sidebar" &&
          "rounded-2xl bg-card ring-1 ring-foreground/5 dark:ring-foreground/10"
      )}
    >
      {children}
    </div>
  )

  if (isMobile) {
    return (
      <Drawer
        open={openMobile}
        onOpenChange={setOpenMobile}
        swipeDirection={side === "left" ? "left" : "right"}
      >
        <DrawerPopup
          className="h-dvh w-(--sidebar-width) max-w-[85vw] rounded-none p-0"
          style={{ "--sidebar-width": SIDEBAR_WIDTH } as React.CSSProperties}
        >
          {panel}
        </DrawerPopup>
      </Drawer>
    )
  }

  return (
    <div
      data-slot="sidebar"
      data-side={side}
      data-variant={variant}
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      className={cn(
        "group/sidebar peer relative hidden h-full shrink-0 overflow-hidden transition-[width] duration-200 ease-out md:block",
        side === "right" && "order-last",
        variant !== "sidebar" && state !== "collapsed" && "p-2",
        variant !== "sidebar" &&
          state === "collapsed" &&
          collapsible === "icon" &&
          "p-2",
        widthClass(variant, collapsible, open),
        className
      )}
      {...props}
    >
      {panel}
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar, side } = useSidebar()
  const Icon = side === "right" ? PanelRightIcon : PanelLeftIcon

  return (
    <Button
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={className}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      {children ?? <Icon />}
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      type="button"
      data-slot="sidebar-rail"
      aria-label="Toggle sidebar"
      title="Toggle sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-3 transition-colors after:absolute after:inset-y-3 after:left-1/2 after:w-px hover:after:bg-border md:block",
        "group-data-[side=left]/sidebar:-right-1.5 group-data-[side=right]/sidebar:-left-1.5",
        className
      )}
      onClick={toggleSidebar}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex min-h-0 min-w-0 flex-1 flex-col bg-background",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:rounded-2xl md:peer-data-[variant=inset]:bg-card md:peer-data-[variant=inset]:ring-1 md:peer-data-[variant=inset]:ring-foreground/5 md:dark:peer-data-[variant=inset]:ring-foreground/10",
        "md:peer-data-[variant=inset]:peer-data-[side=left]:ml-0 md:peer-data-[variant=inset]:peer-data-[side=right]:mr-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn(
        "flex flex-col gap-2 p-2 group-data-[collapsible=icon]/sidebar:items-center",
        className
      )}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn(
        "mt-auto flex flex-col gap-2 p-2 group-data-[collapsible=icon]/sidebar:items-center",
        className
      )}
      {...props}
    />
  )
}

function SidebarContent({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn("flex min-h-0 flex-1 flex-col", className)}
      {...props}
    >
      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-2">{children}</div>
      </ScrollArea>
    </div>
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn(
        "relative flex w-full min-w-0 flex-col px-2 py-1 group-data-[collapsible=icon]/sidebar:px-1.5",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        className: cn(
          "flex h-8 shrink-0 items-center gap-2 rounded-full px-2.5 text-xs font-medium text-muted-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/30 group-data-[collapsible=icon]/sidebar:hidden [&_svg]:size-4",
          className
        ),
      },
      props
    ),
    state: { slot: "sidebar-group-label" },
  })
}

function SidebarGroupAction({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="sidebar-group-action"
      className={cn(
        "absolute top-2 right-3 flex size-6 items-center justify-center rounded-full text-muted-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 group-data-[collapsible=icon]/sidebar:hidden [&_svg]:size-4",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      className={cn("w-full", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn("flex w-full min-w-0 flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center justify-start gap-2 overflow-hidden rounded-full text-left outline-none group-data-[collapsible=icon]/sidebar:size-8 group-data-[collapsible=icon]/sidebar:justify-center group-data-[collapsible=icon]/sidebar:px-0 group-data-[collapsible=icon]/sidebar:[&>span]:hidden group-has-[[data-slot=sidebar-menu-badge]]/menu-item:pr-8 [&>span:last-child]:truncate",
  {
    variants: {
      size: {
        default: "",
        sm: "",
        lg: "",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function SidebarMenuButton({
  className,
  isActive = false,
  size = "default",
  tooltip,
  render,
  children,
  ...props
}: useRender.ComponentProps<"button"> &
  VariantProps<typeof sidebarMenuButtonVariants> & {
    isActive?: boolean
    tooltip?: string
  }) {
  const { state, isMobile, side } = useSidebar()
  const buttonSize = size === "sm" ? "sm" : size === "lg" ? "lg" : "default"
  const showTooltip = Boolean(tooltip) && state === "collapsed" && !isMobile

  if (showTooltip) {
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <SidebarMenuButtonPrimitive
              className={className}
              isActive={isActive}
              size={buttonSize}
              render={render}
              {...props}
            />
          }
        >
          {children}
        </TooltipTrigger>
        <TooltipContent side={side === "right" ? "left" : "right"}>
          {tooltip}
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <SidebarMenuButtonPrimitive
      className={className}
      isActive={isActive}
      size={buttonSize}
      render={render}
      {...props}
    >
      {children}
    </SidebarMenuButtonPrimitive>
  )
}

function SidebarMenuButtonPrimitive({
  className,
  isActive = false,
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"button"> & {
  isActive?: boolean
  size?: "default" | "sm" | "lg"
}) {
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(
      {
        className: cn(
          buttonVariants({
            variant: "ghost",
            size: size === "lg" ? "lg" : size === "sm" ? "sm" : "default",
          }),
          sidebarMenuButtonVariants({ size }),
          "data-active:bg-secondary data-active:font-medium",
          className
        ),
        ...(render ? {} : { type: "button" as const }),
      },
      props
    ),
    state: { slot: "sidebar-menu-button", active: isActive },
  })
}

function SidebarMenuAction({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="sidebar-menu-action"
      className={cn(
        "absolute top-1 right-1 flex size-6 items-center justify-center rounded-full text-muted-foreground opacity-0 outline-none hover:bg-muted focus-visible:opacity-100 focus-visible:ring-3 focus-visible:ring-ring/30 group-hover/menu-item:opacity-100 group-focus-within/menu-item:opacity-100 group-data-[collapsible=icon]/sidebar:hidden [&_svg]:size-3.5",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Badge>) {
  return (
    <span
      data-slot="sidebar-menu-badge"
      className="pointer-events-none absolute top-1.5 right-1.5 group-data-[collapsible=icon]/sidebar:hidden"
    >
      <Badge variant="outline" className={className} {...props}>
        {children}
      </Badge>
    </span>
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & { showIcon?: boolean }) {
  return (
    <div
      data-slot="sidebar-menu-skeleton"
      className={cn("flex h-8 items-center gap-2 px-2.5", className)}
      {...props}
    >
      {showIcon ? <Skeleton className="size-4 rounded-md" /> : null}
      <Skeleton className="h-3 max-w-32 flex-1" />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-0.5 border-l border-border px-2.5 py-0.5 group-data-[collapsible=icon]/sidebar:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      className={cn("relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  className,
  isActive = false,
  render,
  ...props
}: useRender.ComponentProps<"a"> & { isActive?: boolean }) {
  return useRender({
    defaultTagName: "a",
    render,
    props: mergeProps<"a">(
      {
        className: cn(
          "flex h-7 min-w-0 items-center gap-2 overflow-hidden rounded-full px-2.5 text-xs text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 data-active:bg-secondary data-active:font-medium data-active:text-foreground [&>span:last-child]:truncate",
          className
        ),
      },
      props
    ),
    state: { slot: "sidebar-menu-sub-button", active: isActive },
  })
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      className={cn("mx-2 w-auto bg-border", className)}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
