import { DatePicker, Label } from "lumen-ui"

export const Default = () => <DatePicker />

export const WithValue = () => (
  <div className="flex flex-col items-start gap-2">
    <Label htmlFor="dp-launch">Launch date</Label>
    <DatePicker id="dp-launch" defaultValue={new Date(2026, 9, 14)} />
  </div>
)

export const Range = () => (
  <div className="flex flex-col items-start gap-3">
    <DatePicker mode="range" />
    <DatePicker mode="range" defaultValue={{ from: new Date(2026, 9, 6), to: new Date(2026, 9, 12) }} />
  </div>
)

export const Disabled = () => <DatePicker disabled placeholder="Booking closed" />
