"use client"

import * as React from "react"
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

type NavigationMenuVariant = "bar" | "panel"

const NavigationMenuAnchorContext = React.createContext<HTMLElement | null>(
  null
)
const NavigationMenuVariantContext =
  React.createContext<NavigationMenuVariant>("bar")

function useNavigationMenuVariant() {
  return React.useContext(NavigationMenuVariantContext)
}

function variantClass(
  variant: NavigationMenuVariant,
  bar: string,
  panel: string
) {
  switch (variant) {
    case "bar":
      return bar
    case "panel":
      return panel
    default: {
      const exhaustive: never = variant
      return exhaustive
    }
  }
}

function NavigationMenu({
  className,
  children,
  delay = 0,
  closeDelay = 80,
  variant = "bar",
  ...props
}: NavigationMenuPrimitive.Root.Props & { variant?: NavigationMenuVariant }) {
  const [root, setRoot] = React.useState<HTMLElement | null>(null)

  return (
    <NavigationMenuVariantContext.Provider value={variant}>
      <NavigationMenuAnchorContext.Provider value={root}>
        <NavigationMenuPrimitive.Root
          data-slot="navigation-menu"
          data-variant={variant}
          delay={delay}
          closeDelay={closeDelay}
          ref={setRoot}
          className={cn(
            "group/navigation-menu relative flex",
            "w-full flex-col",
            className
          )}
          {...props}
        >
          {children}
        </NavigationMenuPrimitive.Root>
      </NavigationMenuAnchorContext.Provider>
    </NavigationMenuVariantContext.Provider>
  )
}

function NavigationMenuList({
  className,
  ...props
}: NavigationMenuPrimitive.List.Props) {
  const variant = useNavigationMenuVariant()

  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "flex items-center",
        variantClass(variant, "gap-8", "gap-0.5"),
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: NavigationMenuPrimitive.Item.Props) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

const navigationMenuTriggerStyle = cva(
  "-mx-2 -my-1 cursor-pointer rounded-4xl px-2 py-1 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:text-foreground"
)

const navigationMenuPanelTriggerStyle = cva(
  "inline-flex h-8 cursor-pointer items-center gap-1 rounded-4xl px-3 text-sm text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:bg-accent data-popup-open:text-accent-foreground"
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props) {
  const variant = useNavigationMenuVariant()

  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(
        variantClass(
          variant,
          navigationMenuTriggerStyle(),
          navigationMenuPanelTriggerStyle()
        ),
        className
      )}
      {...props}
    >
      {children}
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuIcon({
  className,
  ...props
}: NavigationMenuPrimitive.Icon.Props) {
  return (
    <NavigationMenuPrimitive.Icon
      data-slot="navigation-menu-icon"
      className={cn(
        "ml-1 inline-flex size-3 transition duration-200 data-popup-open:rotate-180",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuContent({
  className,
  ...props
}: NavigationMenuPrimitive.Content.Props) {
  const variant = useNavigationMenuVariant()

  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        variantClass(
          variant,
          "w-full",
          "h-full w-max transition-[opacity,transform,translate] duration-(--duration) ease-(--easing) data-starting-style:opacity-0 data-ending-style:opacity-0 data-starting-style:data-[activation-direction=left]:-translate-x-6 data-starting-style:data-[activation-direction=right]:translate-x-6 data-ending-style:data-[activation-direction=left]:translate-x-6 data-ending-style:data-[activation-direction=right]:-translate-x-6"
        ),
        className
      )}
      {...props}
    />
  )
}

const navigationMenuLinkVariants = cva(
  "inline-flex items-center gap-2 rounded-4xl text-foreground transition-colors outline-none hover:text-muted-foreground focus-visible:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default: "text-sm",
        featured: "text-lg font-normal",
        muted:
          "-mx-2 -my-1 px-2 py-1 text-sm text-muted-foreground hover:text-foreground focus-visible:text-foreground",
        pill: "h-8 rounded-4xl px-3 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground",
        item: "w-full flex-col items-start gap-1 rounded-4xl p-3 text-left text-sm leading-snug hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function NavigationMenuLink({
  className,
  variant = "default",
  closeOnClick = true,
  ...props
}: NavigationMenuPrimitive.Link.Props &
  VariantProps<typeof navigationMenuLinkVariants>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      closeOnClick={closeOnClick}
      className={cn(navigationMenuLinkVariants({ variant }), className)}
      {...props}
    />
  )
}

function NavigationMenuPortal({
  container,
  ...props
}: NavigationMenuPrimitive.Portal.Props) {
  const root = React.useContext(NavigationMenuAnchorContext)
  const variant = useNavigationMenuVariant()

  return (
    <NavigationMenuPrimitive.Portal
      data-slot="navigation-menu-portal"
      container={container ?? (variant === "bar" ? root : undefined)}
      {...props}
    />
  )
}

function NavigationMenuBackdrop({
  className,
  ...props
}: NavigationMenuPrimitive.Backdrop.Props) {
  return (
    <NavigationMenuPrimitive.Backdrop
      data-slot="navigation-menu-backdrop"
      className={cn(
        "pointer-events-none fixed inset-0 z-0 hidden bg-background/40 backdrop-blur-sm data-open:block",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuPositioner({
  className,
  children,
  side = "bottom",
  align = "start",
  sideOffset,
  collisionPadding,
  collisionAvoidance,
  style,
  ...props
}: NavigationMenuPrimitive.Positioner.Props) {
  const variant = useNavigationMenuVariant()
  const panelStyle =
    variant === "panel"
      ? ({
          "--duration": "0.28s",
          "--easing": "cubic-bezier(0.22, 1, 0.36, 1)",
          ...(typeof style === "object" ? style : undefined),
        } as React.CSSProperties)
      : style

  return (
    <NavigationMenuPrimitive.Positioner
      data-slot="navigation-menu-positioner"
      side={side}
      align={align}
      sideOffset={sideOffset ?? (variant === "panel" ? 8 : 0)}
      collisionPadding={collisionPadding ?? (variant === "panel" ? 12 : 0)}
      collisionAvoidance={
        collisionAvoidance ?? (variant === "panel" ? { side: "none" } : undefined)
      }
      style={panelStyle}
      className={cn(
        variantClass(
          variant,
          "absolute! top-full! left-0! z-50 w-full max-w-none transform-none!",
          "z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-(--duration) ease-(--easing) before:absolute before:content-[''] data-instant:transition-none data-[side=bottom]:before:top-[-8px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-2 data-[side=left]:before:top-0 data-[side=left]:before:right-[-8px] data-[side=left]:before:bottom-0 data-[side=left]:before:w-2 data-[side=right]:before:top-0 data-[side=right]:before:bottom-0 data-[side=right]:before:left-[-8px] data-[side=right]:before:w-2 data-[side=top]:before:right-0 data-[side=top]:before:bottom-[-8px] data-[side=top]:before:left-0 data-[side=top]:before:h-2"
        ),
        className
      )}
      {...props}
    >
      {children}
    </NavigationMenuPrimitive.Positioner>
  )
}

function NavigationMenuPopup({
  className,
  ...props
}: NavigationMenuPrimitive.Popup.Props) {
  const variant = useNavigationMenuVariant()

  return (
    <NavigationMenuPrimitive.Popup
      data-slot="navigation-menu-popup"
      className={cn(
        variantClass(
          variant,
          "relative z-10 w-full overflow-hidden border-b border-transparent bg-background text-foreground duration-150 data-open:border-border data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-1 data-closed:animate-out data-closed:fade-out-0",
          "relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-4xl border border-border bg-popover text-popover-foreground shadow-lg outline-none transition-[opacity,transform,width,height,scale] duration-(--duration) ease-(--easing) data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-out"
        ),
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuArrow({
  className,
  ...props
}: NavigationMenuPrimitive.Arrow.Props) {
  return (
    <NavigationMenuPrimitive.Arrow
      data-slot="navigation-menu-arrow"
      className={cn(
        "relative block h-1.5 w-3 overflow-clip transition-[left,right] duration-(--duration) ease-(--easing) before:absolute before:bottom-0 before:left-1/2 before:block before:size-2 before:-translate-x-1/2 before:translate-y-1/2 before:rotate-45 before:border before:border-border before:bg-popover before:content-['']",
        "data-[side=bottom]:top-[-6px] data-[side=left]:right-[-9px] data-[side=left]:rotate-90 data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: NavigationMenuPrimitive.Viewport.Props) {
  const variant = useNavigationMenuVariant()

  return (
    <NavigationMenuPrimitive.Viewport
      data-slot="navigation-menu-viewport"
      className={cn(
        "relative overflow-hidden",
        variantClass(variant, "w-full", "h-full w-full rounded-[inherit]"),
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuPanel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const variant = useNavigationMenuVariant()

  return (
    <div
      data-slot="navigation-menu-panel"
      className={cn(
        "mx-auto grid",
        variantClass(
          variant,
          "min-h-72 w-full grid-cols-2 gap-10 px-6 pt-12 pb-16 md:px-12",
          "w-[min(42rem,calc(100vw-2rem))] grid-cols-1 gap-8 p-5 md:grid-cols-[11rem_minmax(0,1fr)]"
        ),
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuGroup({
  title,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { title?: string }) {
  return (
    <div
      data-slot="navigation-menu-group"
      className={cn("flex flex-col items-start gap-6", className)}
      {...props}
    >
      {title ? (
        <p className="text-sm text-muted-foreground">{title}</p>
      ) : null}
      {children}
    </div>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuIcon,
  NavigationMenuLink,
  NavigationMenuPortal,
  NavigationMenuBackdrop,
  NavigationMenuPositioner,
  NavigationMenuPopup,
  NavigationMenuArrow,
  NavigationMenuViewport,
  NavigationMenuPanel,
  NavigationMenuGroup,
  navigationMenuTriggerStyle,
  navigationMenuLinkVariants,
  useNavigationMenuVariant,
  type NavigationMenuVariant,
}
