"use client"

import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import { XIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

function ToastProvider(props: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider data-slot="toast-provider" {...props} />
}

function Toaster() {
  const { toasts } = ToastPrimitive.useToastManager()

  return (
    <ToastPrimitive.Portal>
      <ToastPrimitive.Viewport
        data-slot="toast-viewport"
        className="fixed top-auto right-4 bottom-4 z-50 mx-auto w-[calc(100vw-2rem)] outline-none sm:right-8 sm:bottom-8 sm:w-80"
      >
        {toasts.map((toast) => (
          <ToastPrimitive.Root
            key={toast.id}
            toast={toast}
            data-slot="toast"
            swipeDirection={["down", "right"]}
            className="rounded-2xl bg-popover text-popover-foreground ring-1 ring-foreground/5 select-none dark:ring-foreground/10"
          >
            <ToastPrimitive.Content
              data-slot="toast-content"
              className="flex items-start gap-3 overflow-hidden p-3"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <ToastPrimitive.Title className="m-0 text-sm font-medium" />
                <ToastPrimitive.Description className="m-0 text-xs text-muted-foreground" />
              </div>
              <ToastPrimitive.Action
                className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
              />
              <ToastPrimitive.Close
                className={cn(
                  buttonVariants({ size: "icon-xs", variant: "ghost" }),
                  "shrink-0 text-muted-foreground hover:text-foreground"
                )}
                aria-label="Fermer"
              >
                <XIcon className="size-3.5" />
              </ToastPrimitive.Close>
            </ToastPrimitive.Content>
          </ToastPrimitive.Root>
        ))}
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Portal>
  )
}

const useToastManager = ToastPrimitive.useToastManager
const createToastManager = ToastPrimitive.createToastManager

export { ToastProvider, Toaster, useToastManager, createToastManager }
