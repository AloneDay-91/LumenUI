import { cn } from "@/lib/utils"

/** Overlapping squares — same construction as the portfolio wordmark. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-6 shrink-0", className)}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2.6 2.6h13.4v13.4H2.6zM8 8h13.4v13.4H8z"
      />
    </svg>
  )
}
