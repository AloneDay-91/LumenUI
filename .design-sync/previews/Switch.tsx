import { Label, Switch } from "lumen-ui"

export const Default = () => (
  <Label className="gap-2">
    <Switch defaultChecked />
    Dark mode
  </Label>
)

export const States = () => (
  <div className="flex flex-col gap-3">
    <Label className="gap-2">
      <Switch />
      Off
    </Label>
    <Label className="gap-2">
      <Switch defaultChecked />
      On
    </Label>
  </div>
)

export const Settings = () => (
  <div className="flex w-64 flex-col gap-3">
    <Label className="justify-between">
      Push notifications
      <Switch defaultChecked />
    </Label>
    <Label className="justify-between">
      Weekly digest
      <Switch />
    </Label>
    <Label className="justify-between">
      Product updates
      <Switch defaultChecked />
    </Label>
  </div>
)
