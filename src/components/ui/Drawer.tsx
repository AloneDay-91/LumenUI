"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"

import { cn } from "@/lib/utils"

function DrawerProvider(props: DrawerPrimitive.Provider.Props) {
  return <DrawerPrimitive.Provider data-slot="drawer-provider" {...props} />
}

function Drawer(props: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger(props: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerClose(props: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerPortal(props: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal {...props} />
}

function DrawerBackdrop({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-backdrop"
      className={cn(
        "fixed inset-0 z-50 bg-black/40 opacity-[calc(1-var(--drawer-swipe-progress,0))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
        "data-starting-style:opacity-0 data-ending-style:opacity-0 data-swiping:duration-0",
        className
      )}
      {...props}
    />
  )
}

function DrawerViewport({
  className,
  ...props
}: DrawerPrimitive.Viewport.Props) {
  return (
    <DrawerPrimitive.Viewport
      data-slot="drawer-viewport"
      className={cn("pointer-events-none fixed inset-0 z-50 flex", className)}
      {...props}
    />
  )
}

function DrawerPopup({
  className,
  children,
  ...props
}: DrawerPrimitive.Popup.Props) {
  return (
    <DrawerPortal>
      <DrawerBackdrop />
      <DrawerViewport>
        <DrawerPrimitive.Popup
          data-slot="drawer-popup"
          className={cn(
            "bg-popover text-popover-foreground p-5 ring-1 ring-foreground/5 outline-none dark:ring-foreground/10",
            "pointer-events-auto relative overflow-y-auto transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0",
            "data-[swipe-direction=down]:mt-auto data-[swipe-direction=down]:max-h-[85dvh] data-[swipe-direction=down]:w-full data-[swipe-direction=down]:translate-y-(--drawer-swipe-movement-y) data-[swipe-direction=down]:data-starting-style:translate-y-full data-[swipe-direction=down]:data-ending-style:translate-y-full",
            "data-[swipe-direction=up]:mb-auto data-[swipe-direction=up]:max-h-[85dvh] data-[swipe-direction=up]:w-full data-[swipe-direction=up]:translate-y-(--drawer-swipe-movement-y) data-[swipe-direction=up]:data-starting-style:-translate-y-full data-[swipe-direction=up]:data-ending-style:-translate-y-full",
            "data-[swipe-direction=left]:mr-auto data-[swipe-direction=left]:h-full data-[swipe-direction=left]:translate-x-(--drawer-swipe-movement-x) data-[swipe-direction=left]:data-starting-style:-translate-x-full data-[swipe-direction=left]:data-ending-style:-translate-x-full",
            "data-[swipe-direction=right]:ml-auto data-[swipe-direction=right]:h-full data-[swipe-direction=right]:translate-x-(--drawer-swipe-movement-x) data-[swipe-direction=right]:data-starting-style:translate-x-full data-[swipe-direction=right]:data-ending-style:translate-x-full",
            "data-[swipe-direction=down]:rounded-t-[24px]",
            "data-[swipe-direction=up]:rounded-b-[24px]",
            "data-[swipe-direction=right]:rounded-l-[24px]",
            "data-[swipe-direction=left]:rounded-r-[24px]",
            className
          )}
          {...props}
        >
          <DrawerHandle />
          {children}
        </DrawerPrimitive.Popup>
      </DrawerViewport>
    </DrawerPortal>
  )
}

function DrawerContent({
  className,
  ...props
}: DrawerPrimitive.Content.Props) {
  return (
    <DrawerPrimitive.Content
      data-slot="drawer-content"
      className={cn("mx-auto flex w-full max-w-lg flex-col", className)}
      {...props}
    />
  )
}

function DrawerHandle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-handle"
      aria-hidden="true"
      className={className}
      {...props}
    />
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  DrawerProvider,
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerPortal,
  DrawerBackdrop,
  DrawerViewport,
  DrawerPopup,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
