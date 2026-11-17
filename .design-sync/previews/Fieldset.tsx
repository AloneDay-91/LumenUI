import { Checkbox, Field, FieldControl, FieldLabel, Fieldset, FieldsetLegend, Label } from "lumen-ui"

export const Default = () => (
  <Fieldset className="w-56">
    <FieldsetLegend>Notifications</FieldsetLegend>
    <Label className="gap-2">
      <Checkbox defaultChecked />
      Email
    </Label>
    <Label className="gap-2">
      <Checkbox />
      Push
    </Label>
  </Fieldset>
)

export const WithFields = () => (
  <Fieldset className="w-64">
    <FieldsetLegend>Billing address</FieldsetLegend>
    <Field>
      <FieldLabel>Street</FieldLabel>
      <FieldControl placeholder="12 Rue de Rivoli" />
    </Field>
    <Field>
      <FieldLabel>City</FieldLabel>
      <FieldControl placeholder="Paris" />
    </Field>
  </Fieldset>
)

export const Disabled = () => (
  <Fieldset className="w-56" disabled>
    <FieldsetLegend>Team permissions</FieldsetLegend>
    <Label className="gap-2">
      <Checkbox defaultChecked disabled className="data-disabled:opacity-50" />
      Can invite members
    </Label>
    <Label className="gap-2">
      <Checkbox disabled className="data-disabled:opacity-50" />
      Can delete projects
    </Label>
  </Fieldset>
)
