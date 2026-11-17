import { Checkbox, Label } from "lumen-ui"

export const Default = () => (
  <Label className="gap-2">
    <Checkbox defaultChecked />
    Subscribe to the newsletter
  </Label>
)

export const States = () => (
  <div className="flex flex-col gap-3">
    <Label className="gap-2">
      <Checkbox />
      Unchecked
    </Label>
    <Label className="gap-2">
      <Checkbox defaultChecked />
      Checked
    </Label>
    <Label className="gap-2">
      <Checkbox disabled className="data-disabled:opacity-50" />
      Disabled
    </Label>
    <Label className="gap-2">
      <Checkbox defaultChecked disabled className="data-disabled:opacity-50" />
      Checked and disabled
    </Label>
    <Label className="gap-2">
      <Checkbox aria-invalid="true" />
      Accept the terms (required)
    </Label>
  </div>
)
