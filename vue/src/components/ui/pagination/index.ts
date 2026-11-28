import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"

import type { ButtonVariantProps } from "@/components/ui/button"

export { default as Pagination } from "./Pagination.vue"
export { default as PaginationContent } from "./PaginationContent.vue"
export { default as PaginationItem } from "./PaginationItem.vue"
export { default as PaginationLink } from "./PaginationLink.vue"
export { default as PaginationPrevious } from "./PaginationPrevious.vue"
export { default as PaginationNext } from "./PaginationNext.vue"
export { default as PaginationEllipsis } from "./PaginationEllipsis.vue"

export interface PaginationLinkProps extends PrimitiveProps {
  isActive?: boolean
  variant?: ButtonVariantProps["variant"]
  size?: ButtonVariantProps["size"]
  disabled?: boolean
  loading?: boolean
  class?: HTMLAttributes["class"]
}
