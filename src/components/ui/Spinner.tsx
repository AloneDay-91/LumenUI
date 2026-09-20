import { LoaderCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderCircleIcon
      data-slot="spinner"
      // No size here: inside a Button the size rules of buttonVariants apply,
      // and standalone it inherits the 1em default of a lucide icon.
      role="status"
      aria-label="Loading"
      className={cn("animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
