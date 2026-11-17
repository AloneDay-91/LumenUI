import { Input, Label } from "lumen-ui"

export const Default = () => (
  <div className="grid w-full max-w-sm gap-2">
    <Label htmlFor="in-email">Email</Label>
    <Input id="in-email" type="email" placeholder="you@studio.com" />
  </div>
)

export const States = () => (
  <div className="grid w-64 gap-3">
    <Input placeholder="Placeholder" />
    <Input defaultValue="Lumen Studio" />
    <Input defaultValue="not-an-email" aria-invalid="true" />
    <Input placeholder="Disabled" disabled />
  </div>
)

export const Types = () => (
  <div className="grid w-64 gap-3">
    <div className="grid gap-2">
      <Label htmlFor="in-password">Password</Label>
      <Input id="in-password" type="password" defaultValue="correct-horse" />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="in-seats">Seats</Label>
      <Input id="in-seats" type="number" defaultValue={12} />
    </div>
  </div>
)
