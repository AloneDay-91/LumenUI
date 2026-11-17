import { Label, OTPField, OTPFieldInput, OTPFieldSeparator } from "lumen-ui"

export const Default = () => (
  <OTPField length={6}>
    <OTPFieldInput />
    <OTPFieldInput />
    <OTPFieldInput />
    <OTPFieldInput />
    <OTPFieldInput />
    <OTPFieldInput />
  </OTPField>
)

export const Filled = () => (
  <OTPField length={6} defaultValue="482913">
    <OTPFieldInput />
    <OTPFieldInput />
    <OTPFieldInput />
    <OTPFieldSeparator />
    <OTPFieldInput />
    <OTPFieldInput />
    <OTPFieldInput />
  </OTPField>
)

export const WithLabel = () => (
  <div className="grid gap-2">
    <Label>Verification code</Label>
    <OTPField length={4} defaultValue="71">
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
    </OTPField>
    <p className="text-xs text-muted-foreground">Sent to e••••@lumen.dev</p>
  </div>
)
