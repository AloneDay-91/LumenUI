import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react"
import { Button, ButtonGroup, ButtonGroupSeparator } from "lumen-ui"

export const Default = () => (
  <ButtonGroup>
    <Button variant="outline">Day</Button>
    <Button variant="outline">Week</Button>
    <Button variant="outline">Month</Button>
  </ButtonGroup>
)

export const Orientation = () => (
  <div className="flex flex-wrap items-start gap-8">
    <ButtonGroup>
      <Button variant="outline">Previous</Button>
      <Button variant="outline">Next</Button>
    </ButtonGroup>
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Previous</Button>
      <Button variant="outline">Next</Button>
    </ButtonGroup>
  </div>
)

export const IconButtons = () => (
  <ButtonGroup>
    <Button size="icon" variant="outline" aria-label="Align left" aria-pressed="true">
      <AlignLeftIcon />
    </Button>
    <Button size="icon" variant="outline" aria-label="Align centre">
      <AlignCenterIcon />
    </Button>
    <Button size="icon" variant="outline" aria-label="Align right">
      <AlignRightIcon />
    </Button>
  </ButtonGroup>
)

export const Separator = () => (
  <ButtonGroup>
    <Button variant="secondary">Copy</Button>
    <ButtonGroupSeparator />
    <Button variant="secondary">Paste</Button>
  </ButtonGroup>
)
