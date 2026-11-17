import {
  Label,
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "lumen-ui"

export const Default = () => (
  <NumberField defaultValue={4} min={0} max={12} className="w-40">
    <NumberFieldGroup>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldGroup>
  </NumberField>
)

export const WithLabel = () => (
  <div className="grid gap-2">
    <Label htmlFor="seats">Seats</Label>
    <NumberField id="seats" defaultValue={12} min={1} max={50} className="w-40">
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  </div>
)

export const Currency = () => (
  <NumberField
    defaultValue={1249.5}
    step={0.5}
    className="w-48"
    format={{ style: "currency", currency: "EUR" }}
  >
    <NumberFieldGroup>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldGroup>
  </NumberField>
)

export const Disabled = () => (
  <NumberField defaultValue={3} disabled className="w-40">
    <NumberFieldGroup>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldGroup>
  </NumberField>
)
