import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "lumen-ui"

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "astro", label: "Astro" },
  { value: "vite", label: "Vite" },
]

export const Default = () => (
  <Select defaultValue="next" items={frameworks}>
    <SelectTrigger className="w-48">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {frameworks.map((f) => (
        <SelectItem key={f.value} value={f.value}>
          {f.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)

const regions = [
  { value: "eu-west", label: "Europe (Paris)" },
  { value: "us-east", label: "US East (Virginia)" },
  { value: "ap-south", label: "Asia (Mumbai)" },
]

export const WithLabel = () => (
  <div className="grid gap-2">
    <Label htmlFor="region">Region</Label>
    <Select defaultValue="eu-west" items={regions}>
      <SelectTrigger id="region" className="w-56">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {regions.map((r) => (
            <SelectItem key={r.value} value={r.value}>
              {r.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
)

export const Placeholder = () => (
  <Select items={frameworks}>
    <SelectTrigger className="w-48">
      <SelectValue placeholder="Pick a framework" />
    </SelectTrigger>
    <SelectContent>
      {frameworks.map((f) => (
        <SelectItem key={f.value} value={f.value}>
          {f.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)

export const States = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Select defaultValue="astro" items={frameworks}>
      <SelectTrigger size="sm" className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {frameworks.map((f) => (
          <SelectItem key={f.value} value={f.value}>
            {f.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <Select defaultValue="vite" items={frameworks} disabled>
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {frameworks.map((f) => (
          <SelectItem key={f.value} value={f.value}>
            {f.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <Select items={frameworks}>
      <SelectTrigger aria-invalid className="w-32">
        <SelectValue placeholder="Required" />
      </SelectTrigger>
      <SelectContent>
        {frameworks.map((f) => (
          <SelectItem key={f.value} value={f.value}>
            {f.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)
