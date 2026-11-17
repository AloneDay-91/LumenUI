import { Button, Spinner } from "lumen-ui"

export const Default = () => <Spinner className="size-5" />

export const Sizing = () => (
  <div className="flex flex-wrap items-center gap-4">
    <Spinner className="size-3" />
    <Spinner className="size-4" />
    <Spinner className="size-6" />
    <span className="text-2xl">
      <Spinner />
    </span>
  </div>
)

export const InButton = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button disabled>
      <Spinner data-icon="inline-start" />
      Saving
    </Button>
    <Button size="icon" variant="outline" disabled aria-label="Saving">
      <Spinner />
    </Button>
  </div>
)
