"use client"

import * as React from "react"
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const NavigationMenuAnchorContext = React.createContext<HTMLElement | null>(
  null
)

function NavigationMenu({
  className,
  children,
  delay = 0,
  closeDelay = 80,
  ...props
}: NavigationMenuPrimitive.Root.Props) {
  const [root, setRoot] = React.useState<HTMLElement | null>(null)

  return (
    <NavigationMenuAnchorContext.Provider value={root}>
      <NavigationMenuPrimitive.Root
        data-slot="navigation-menu"
        delay={delay}
        closeDelay={closeDelay}
        ref={setRoot}
        className={cn(
          "group/navigation-menu relative flex w-full flex-col",
          className
        )}
        {...props}
      >
        {children}
      </NavigationMenuPrimitive.Root>
    </NavigationMenuAnchorContext.Provider>
  )
}

function NavigationMenuList({
  className,
  ...props
}: NavigationMenuPrimitive.List.Props) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("flex items-center gap-8", className)}
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
  "cursor-pointer text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:text-foreground data-popup-open:text-foreground"
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), className)}
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
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn("w-full", className)}
      {...props}
    />
  )
}

const navigationMenuLinkVariants = cva(
  "inline-flex items-center gap-2 text-foreground transition-colors outline-none hover:text-muted-foreground focus-visible:text-muted-foreground",
  {
    variants: {
      variant: {
        default: "text-sm",
        featured: "text-lg font-normal",
        muted:
          "text-sm text-muted-foreground hover:text-foreground focus-visible:text-foreground",
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

  return (
    <NavigationMenuPrimitive.Portal
      data-slot="navigation-menu-portal"
      container={container ?? root}
      {...props}
    />
  )
}

function NavigationMenuPositioner({
  className,
  side = "bottom",
  align = "start",
  sideOffset = 0,
  collisionPadding = 0,
  ...props
}: NavigationMenuPrimitive.Positioner.Props) {
  return (
    <NavigationMenuPrimitive.Positioner
      data-slot="navigation-menu-positioner"
      side={side}
      align={align}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      className={cn(
        "absolute! top-full! left-0! z-50 w-full max-w-none transform-none!",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuPopup({
  className,
  ...props
}: NavigationMenuPrimitive.Popup.Props) {
  return (
    <NavigationMenuPrimitive.Popup
      data-slot="navigation-menu-popup"
      className={cn(
        "w-full overflow-hidden border-b border-transparent bg-background text-foreground duration-150 data-open:border-border data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-1 data-closed:animate-out data-closed:fade-out-0",
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
  return (
    <NavigationMenuPrimitive.Viewport
      data-slot="navigation-menu-viewport"
      className={cn("relative w-full overflow-hidden", className)}
      {...props}
    />
  )
}

function NavigationMenuPanel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="navigation-menu-panel"
      className={cn(
        "mx-auto grid min-h-72 w-full grid-cols-2 gap-10 px-6 pt-12 pb-16 md:px-12",
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
  NavigationMenuPositioner,
  NavigationMenuPopup,
  NavigationMenuViewport,
  NavigationMenuPanel,
  NavigationMenuGroup,
  navigationMenuTriggerStyle,
  navigationMenuLinkVariants,
}
