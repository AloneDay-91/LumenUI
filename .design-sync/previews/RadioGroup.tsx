import { Label, RadioGroup, RadioGroupItem } from "lumen-ui"

export const Default = () => (
  <RadioGroup defaultValue="light" className="w-40">
    <Label className="gap-2">
      <RadioGroupItem value="light" />
      Light
    </Label>
    <Label className="gap-2">
      <RadioGroupItem value="dark" />
      Dark
    </Label>
    <Label className="gap-2">
      <RadioGroupItem value="system" />
      System
    </Label>
  </RadioGroup>
)

export const Plans = () => (
  <RadioGroup defaultValue="pro" className="w-56">
    <Label className="gap-2">
      <RadioGroupItem value="hobby" />
      Hobby, free
    </Label>
    <Label className="gap-2">
      <RadioGroupItem value="pro" />
      Pro, €12 / month
    </Label>
    <Label className="gap-2">
      <RadioGroupItem value="team" />
      Team, €29 / month
    </Label>
  </RadioGroup>
)
