import { ArrowRightIcon, MailIcon, PlusIcon, TrashIcon } from "lucide-react"
import { Button, Spinner } from "lumen-ui"

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button>Default</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="link">Link</Button>
  </div>
)

export const Sizes = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button size="xs">Extra small</Button>
    <Button size="sm">Small</Button>
    <Button>Default</Button>
    <Button size="lg">Large</Button>
    <Button disabled>Disabled</Button>
  </div>
)

export const WithIcon = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button>
      <MailIcon data-icon="inline-start" />
      Email
    </Button>
    <Button variant="outline">
      Continue
      <ArrowRightIcon data-icon="inline-end" />
    </Button>
    <Button disabled>
      <Spinner data-icon="inline-start" />
      Saving
    </Button>
  </div>
)

export const IconOnly = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button size="icon-xs" variant="outline" aria-label="Add">
      <PlusIcon />
    </Button>
    <Button size="icon-sm" variant="outline" aria-label="Add">
      <PlusIcon />
    </Button>
    <Button size="icon" variant="outline" aria-label="Add">
      <PlusIcon />
    </Button>
    <Button size="icon-lg" variant="outline" aria-label="Add">
      <PlusIcon />
    </Button>
    <Button size="icon" variant="destructive" aria-label="Delete">
      <TrashIcon />
    </Button>
  </div>
)
