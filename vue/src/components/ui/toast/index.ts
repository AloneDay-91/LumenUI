import { createToastManager, useToastManager } from "reka-ui"

export { default as ToastProvider } from "./ToastProvider.vue"
export { default as Toaster } from "./Toaster.vue"

export { useToastManager, createToastManager }
export type { ToastAddOptions, ToastObject, ToastPromiseOptions, ToastStatus } from "reka-ui"
