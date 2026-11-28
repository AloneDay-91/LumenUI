import { inject, type ComputedRef, type InjectionKey } from "vue"

export type BannerVariant = "default" | "new" | "info" | "success" | "warning" | "destructive"

export const indicatorClass: Record<BannerVariant, string> = {
  default: "bg-muted-foreground",
  new: "bg-new",
  info: "bg-indigo-solid",
  success: "bg-jade-solid",
  warning: "bg-orange-solid",
  destructive: "bg-crimson-solid",
}

export interface BannerContext {
  variant: ComputedRef<BannerVariant>
  dismiss: () => void
}

export const bannerKey: InjectionKey<BannerContext> = Symbol("Banner")

export function useBanner(): BannerContext {
  return inject(bannerKey, {
    variant: { value: "default" } as ComputedRef<BannerVariant>,
    dismiss: () => {},
  })
}
