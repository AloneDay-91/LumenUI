"use client";

import type * as React from "react";
import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";

function ToastProvider(props: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider data-slot="toast-provider" {...props} />;
}

/**
 * Status icon for `toast.type`. `toastManager.promise()` sets `loading`, then
 * `success` or `error`, so a promise toast animates through all three.
 */
const toastIcons: Record<string, React.ReactNode> = {
  loading: <Spinner role={undefined} aria-label={undefined} className="size-4 text-muted-foreground" />,
  success: <CircleCheckIcon className="size-4 text-jade-ink" />,
  error: <CircleAlertIcon className="size-4 text-crimson-ink" />,
  warning: <TriangleAlertIcon className="size-4 text-orange-ink" />,
  info: <InfoIcon className="size-4 text-indigo-ink" />,
};

function Toaster() {
  const { toasts } = ToastPrimitive.useToastManager();

  return (
    <ToastPrimitive.Portal>
      <ToastPrimitive.Viewport
        data-slot="toast-viewport"
        className="fixed top-auto right-4 bottom-4 z-50 mx-auto flex w-[calc(100vw-2rem)] outline-none sm:right-8 sm:bottom-8 sm:w-96"
      >
        {toasts.map((toast) => (
          <ToastPrimitive.Root
            key={toast.id}
            toast={toast}
            data-slot="toast"
            swipeDirection={["down", "right"]}
            className={cn(
              "[--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))]",
              "[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
              "absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))] w-full origin-bottom",
              "h-(--height) data-expanded:h-(--toast-height)",
              "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
              "data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
              "data-starting-style:[transform:translateY(150%)]",
              "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
              "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
              "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
              "data-ending-style:opacity-0 data-limited:opacity-0",
              "[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]",
              "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
              "rounded-2xl bg-popover bg-clip-padding text-popover-foreground shadow-lg ring-1 ring-foreground/5 select-none dark:ring-foreground/10",
            )}
          >
            <ToastPrimitive.Content
              data-slot="toast-content"
              className="relative grid grid-cols-[minmax(0,1fr)_auto] items-start has-data-[slot=toast-icon]:ps-9 gap-x-6 gap-y-1 overflow-hidden p-3.5 transition-opacity duration-[250ms] data-behind:pointer-events-none data-behind:opacity-0 data-expanded:pointer-events-auto data-expanded:opacity-100"
            >
              {toast.type && toastIcons[toast.type] ? (
                <span
                  data-slot="toast-icon"
                  aria-hidden
                  className="absolute start-3.5 top-[1.0625rem] flex"
                >
                  {toastIcons[toast.type]}
                </span>
              ) : null}
              <ToastPrimitive.Title className="col-start-1 row-start-1 m-0 text-sm leading-5 font-medium text-balance" />
              <ToastPrimitive.Close
                className={cn(
                  buttonVariants({ size: "icon-xs", variant: "ghost" }),
                  "col-start-2 row-start-1 -mt-0.5 text-muted-foreground hover:text-foreground",
                )}
                aria-label="Close"
              >
                <XIcon className="size-3.5" />
              </ToastPrimitive.Close>
              <ToastPrimitive.Description className="col-span-2 m-0 text-[13px] leading-5 text-pretty text-muted-foreground" />
              <ToastPrimitive.Action
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "col-span-2 mt-1.5 justify-self-end",
                )}
              />
            </ToastPrimitive.Content>
          </ToastPrimitive.Root>
        ))}
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Portal>
  );
}

const useToastManager = ToastPrimitive.useToastManager;
const createToastManager = ToastPrimitive.createToastManager;

export { ToastProvider, Toaster, useToastManager, createToastManager };
