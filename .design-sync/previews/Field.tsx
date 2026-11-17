import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from "lumen-ui"

export const Default = () => (
  <Field className="w-64">
    <FieldLabel>Email</FieldLabel>
    <FieldControl type="email" placeholder="you@studio.com" required />
    <FieldDescription>Used for billing.</FieldDescription>
  </Field>
)

export const Invalid = () => (
  <Field className="w-64" invalid>
    <FieldLabel>Username</FieldLabel>
    <FieldControl defaultValue="ada lovelace" />
    <FieldError match>Usernames can't contain spaces.</FieldError>
  </Field>
)

export const Disabled = () => (
  <Field className="w-64" disabled>
    <FieldLabel>Workspace URL</FieldLabel>
    <FieldControl defaultValue="lumen.dev/studio" />
    <FieldDescription>Contact an admin to change it.</FieldDescription>
  </Field>
)
