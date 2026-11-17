import { AlignCenter, AlignLeft, AlignRight } from "lucide-react"
import { Toggle, ToggleGroup } from "lumen-ui"

export const Single = () => (
  <ToggleGroup defaultValue={["center"]} aria-label="Alignment">
    <Toggle value="left" aria-label="Left">
      <AlignLeft />
    </Toggle>
    <Toggle value="center" aria-label="Center">
      <AlignCenter />
    </Toggle>
    <Toggle value="right" aria-label="Right">
      <AlignRight />
    </Toggle>
  </ToggleGroup>
)

export const Multiple = () => (
  <ToggleGroup multiple defaultValue={["bold", "italic"]} aria-label="Formatting">
    <Toggle value="bold">Bold</Toggle>
    <Toggle value="italic">Italic</Toggle>
    <Toggle value="underline">Underline</Toggle>
  </ToggleGroup>
)

export const Vertical = () => (
  <ToggleGroup orientation="vertical" defaultValue={["week"]} aria-label="Range">
    <Toggle value="day">Day</Toggle>
    <Toggle value="week">Week</Toggle>
    <Toggle value="month">Month</Toggle>
  </ToggleGroup>
)
