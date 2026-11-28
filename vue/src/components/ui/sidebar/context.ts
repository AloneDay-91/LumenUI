import { inject, type ComputedRef, type InjectionKey, type Ref } from "vue"

export const SIDEBAR_WIDTH = "16rem"
// px-2 group + px-3 row puts a 16px icon at 20px: a 3.5rem rail centres it,
// so icons never move between the open and the collapsed sidebar.
export const SIDEBAR_WIDTH_ICON = "3.5rem"
export const SIDEBAR_KEYBOARD_SHORTCUT = "b"
export const MOBILE_QUERY = "(max-width: 767px)"

export type SidebarSide = "left" | "right"
export type SidebarVariant = "sidebar" | "floating" | "inset"
export type SidebarCollapsible = "offcanvas" | "icon" | "none"
export type SidebarState = "expanded" | "collapsed"

export type SidebarContextValue = {
  /** "expanded" while open or while an icon sidebar is opened by hover. */
  state: ComputedRef<SidebarState>
  open: ComputedRef<boolean>
  /** An icon sidebar opened over the page by hover, without changing `open`. */
  peek: Ref<boolean>
  setPeek: (peek: boolean) => void
  setOpen: (open: boolean) => void
  openMobile: Ref<boolean>
  setOpenMobile: (open: boolean) => void
  isMobile: Ref<boolean>
  toggleSidebar: () => void
  side: Ref<SidebarSide>
  setSide: (side: SidebarSide) => void
  collapsible: Ref<SidebarCollapsible | null>
}

export const SidebarContextKey: InjectionKey<SidebarContextValue> = Symbol("SidebarContext")

/** The state of the enclosing SidebarProvider. Values are refs. */
export function useSidebar() {
  const context = inject(SidebarContextKey, null)
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider.")
  }
  return context
}

export function widthClass(variant: SidebarVariant, collapsible: SidebarCollapsible, open: boolean) {
  if (open || collapsible === "none") {
    return variant === "sidebar" ? "w-(--sidebar-width)" : "w-[calc(var(--sidebar-width)+1rem)]"
  }

  switch (collapsible) {
    case "offcanvas":
      return "w-0 border-0 p-0"
    case "icon":
      return variant === "sidebar" ? "w-(--sidebar-width-icon)" : "w-[calc(var(--sidebar-width-icon)+1rem)]"
    default: {
      const exhaustive: never = collapsible
      return exhaustive
    }
  }
}
