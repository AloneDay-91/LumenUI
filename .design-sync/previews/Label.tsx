import { Checkbox, Input, Label, Switch, Textarea } from "lumen-ui"

export const Default = () => (
  <div className="grid w-full max-w-sm gap-2">
    <Label htmlFor="name">Name</Label>
    <Input id="name" placeholder="Elouan Bruzek" />
  </div>
)

export const WithTextarea = () => (
  <div className="grid w-full max-w-sm gap-2">
    <Label htmlFor="bio">Bio</Label>
    <Textarea id="bio" placeholder="A few words about your work…" />
  </div>
)

export const InlineControls = () => (
  <div className="flex flex-col gap-3">
    <Label className="gap-2">
      <Checkbox defaultChecked />
      Email me release notes
    </Label>
    <Label className="gap-2">
      <Switch defaultChecked />
      Dark mode
    </Label>
  </div>
)
