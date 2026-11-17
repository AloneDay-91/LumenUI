import { Checkbox, CheckboxGroup, Label } from "lumen-ui"

export const Default = () => (
  <CheckboxGroup defaultValue={["inter"]} className="w-48">
    <Label className="gap-2">
      <Checkbox value="inter" />
      Inter
    </Label>
    <Label className="gap-2">
      <Checkbox value="fraunces" />
      Fraunces
    </Label>
    <Label className="gap-2">
      <Checkbox value="mono" />
      JetBrains Mono
    </Label>
  </CheckboxGroup>
)

export const WithDisabled = () => (
  <CheckboxGroup defaultValue={["email", "push"]} className="w-48">
    <Label className="gap-2">
      <Checkbox value="email" />
      Email
    </Label>
    <Label className="gap-2">
      <Checkbox value="push" />
      Push notifications
    </Label>
    <Label className="gap-2">
      <Checkbox value="sms" disabled className="data-disabled:opacity-50" />
      SMS (unavailable)
    </Label>
  </CheckboxGroup>
)
