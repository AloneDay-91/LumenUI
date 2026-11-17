import { Skeleton } from "lumen-ui"

export const TextLines = () => (
  <div className="w-full max-w-sm space-y-3">
    <Skeleton className="h-4 w-1/3" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
)

export const ProfileRow = () => (
  <div className="flex w-full max-w-sm items-center gap-3">
    <Skeleton className="size-10 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  </div>
)

export const CardPlaceholder = () => (
  <div className="w-full max-w-sm space-y-3">
    <Skeleton className="h-32 w-full rounded-2xl" />
    <Skeleton className="h-4 w-5/6" />
    <Skeleton className="h-4 w-1/2" />
  </div>
)
