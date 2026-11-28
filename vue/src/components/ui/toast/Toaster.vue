<script setup lang="ts">
import { computed, type Component } from "vue"
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "@lucide/vue"
import {
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastPortal,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  injectToastProviderContext,
  useToastManager,
} from "reka-ui"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import "./toast.css"

/**
 * Status icon for `toast.status`. `toast.promise()` sets `loading`, then
 * `success` or `error`, so a promise toast animates through all three.
 */
const toastIcons: Record<string, { icon: Component; class: string }> = {
  loading: { icon: Spinner, class: "size-4 text-muted-foreground" },
  success: { icon: CircleCheck, class: "size-4 text-jade-ink" },
  error: { icon: CircleAlert, class: "size-4 text-crimson-ink" },
  warning: { icon: TriangleAlert, class: "size-4 text-orange-ink" },
  info: { icon: Info, class: "size-4 text-indigo-ink" },
}

const { toasts } = useToastManager()
const provider = injectToastProviderContext()

// Base UI marks every toast but the frontmost with data-behind.
const openIds = computed(() => toasts.value.filter((toast) => toast.open).map((toast) => toast.id))
const isBehind = (id: string) => openIds.value.indexOf(id) > 0

const viewportClassName =
  "fixed top-auto right-4 bottom-4 z-50 mx-auto flex w-[calc(100vw-2rem)] outline-none sm:right-8 sm:bottom-8 sm:w-96"

const rootClassName = cn(
  "[--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--reka-toast-index)*0.1)))] [--shrink:calc(1-var(--scale))] [--height:var(--reka-toast-frontmost-height,var(--reka-toast-height))]",
  "[--offset-y:calc(var(--reka-toast-offset-y)*-1+calc(var(--reka-toast-index)*var(--gap)*-1)+var(--reka-toast-swipe-move-y,0px))]",
  "absolute right-0 bottom-0 left-auto z-[calc(1000-var(--reka-toast-index))] w-full origin-bottom",
  "h-(--height) data-expanded:h-(--reka-toast-height)",
  "[transform:translateX(var(--reka-toast-swipe-move-x,0px))_translateY(calc(var(--reka-toast-swipe-move-y,0px)-(var(--reka-toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
  "data-expanded:[transform:translateX(var(--reka-toast-swipe-move-x,0px))_translateY(var(--offset-y))]",
  "data-limited:opacity-0",
  "[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s] data-[swipe=move]:[transition:height_0.15s]",
  "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
  "rounded-2xl bg-popover bg-clip-padding text-popover-foreground shadow-lg ring-1 ring-foreground/5 select-none dark:ring-foreground/10",
)

const contentClassName =
  "relative grid grid-cols-[minmax(0,1fr)_auto] items-start has-data-[slot=toast-icon]:ps-9 gap-x-6 gap-y-1 overflow-hidden p-3.5 transition-opacity duration-[250ms] data-behind:pointer-events-none data-behind:opacity-0 data-expanded:pointer-events-auto data-expanded:opacity-100"

const closeClassName = cn(
  buttonVariants({ size: "icon-xs", variant: "ghost" }),
  "col-start-2 row-start-1 -mt-0.5 text-muted-foreground hover:text-foreground",
)

const actionClassName = cn(buttonVariants({ size: "lg", variant: "outline" }), "col-span-2 mt-1.5 justify-self-end")
</script>

<template>
  <ToastPortal>
    <ToastViewport data-slot="toast-viewport" :class="viewportClassName">
      <ToastRoot v-for="toast in toasts" :key="toast.id" :toast="toast" data-slot="toast" :class="rootClassName">
        <div
          data-slot="toast-content"
          :data-behind="isBehind(toast.id) ? '' : undefined"
          :data-expanded="provider.expanded.value ? '' : undefined"
          :class="contentClassName"
        >
          <span
            v-if="toast.status && toastIcons[toast.status]"
            data-slot="toast-icon"
            aria-hidden="true"
            class="absolute start-3.5 top-[1.0625rem] flex"
          >
            <component
              :is="toastIcons[toast.status].icon"
              :role="undefined"
              :aria-label="undefined"
              :class="toastIcons[toast.status].class"
            />
          </span>
          <ToastTitle class="col-start-1 row-start-1 m-0 text-sm leading-5 font-medium text-balance" />
          <ToastClose :class="closeClassName" aria-label="Close">
            <X class="size-3.5" />
          </ToastClose>
          <ToastDescription
            v-if="toast.description"
            class="col-span-2 m-0 text-[13px] leading-5 text-pretty text-muted-foreground"
          />
          <ToastAction v-if="toast.actionProps" :class="actionClassName" />
        </div>
      </ToastRoot>
    </ToastViewport>
  </ToastPortal>
</template>
