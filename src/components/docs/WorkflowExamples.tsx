"use client"

import * as React from "react"
import { ArchiveIcon, TagIcon, Trash2Icon } from "lucide-react"

import { ProjectBoard } from "@/components/blocks/dashboard/ProjectBoard"
import { Checkbox } from "@/components/ui/Checkbox"
import { CurrencyInput } from "@/components/ui/CurrencyInput"
import { DiffViewer } from "@/components/ui/DiffViewer"
import { InlineEdit } from "@/components/ui/InlineEdit"
import { PhoneInput } from "@/components/ui/PhoneInput"
import { SelectionBar, SelectionBarAction } from "@/components/ui/SelectionBar"
import { ToggleGroup } from "@/components/ui/ToggleGroup"
import { Toggle } from "@/components/ui/Toggle"

const files = [
  { id: "1", name: "Q4 report.pdf", size: "2.4 MB" },
  { id: "2", name: "Brand guidelines.fig", size: "18 MB" },
  { id: "3", name: "Invoices 2026.xlsx", size: "640 KB" },
  { id: "4", name: "Launch video.mp4", size: "6.4 MB" },
  { id: "5", name: "Contract draft.docx", size: "92 KB" },
]

export function SelectionBarDemo() {
  const [selected, setSelected] = React.useState<string[]>(["1", "3"])
  const all = selected.length === files.length
  const toggle = (id: string, on: boolean) =>
    setSelected((list) => (on ? [...list, id] : list.filter((item) => item !== id)))

  return (
    <div className="relative w-full max-w-md pb-16">
      <ul className="m-0 flex list-none flex-col p-0 text-xs">
        <li className="flex items-center gap-3 border-b border-border px-2 py-2 text-muted-foreground">
          <Checkbox
            aria-label="Select all files"
            checked={all}
            indeterminate={selected.length > 0 && !all}
            onCheckedChange={(on) => setSelected(on ? files.map((file) => file.id) : [])}
          />
          Name
          <span className="ms-auto">Size</span>
        </li>
        {files.map((file) => (
          <li key={file.id} className="flex items-center gap-3 border-b border-border px-2 py-2">
            <Checkbox
              aria-label={`Select ${file.name}`}
              checked={selected.includes(file.id)}
              onCheckedChange={(on) => toggle(file.id, on)}
            />
            {file.name}
            <span className="ms-auto font-mono text-[11px] text-muted-foreground">{file.size}</span>
          </li>
        ))}
      </ul>
      <SelectionBar position="absolute" count={selected.length} onClear={() => setSelected([])}>
        <SelectionBarAction>
          <TagIcon data-icon="inline-start" />
          Tag
        </SelectionBarAction>
        <SelectionBarAction>
          <ArchiveIcon data-icon="inline-start" />
          Archive
        </SelectionBarAction>
        <SelectionBarAction variant="destructive" onClick={() => setSelected([])}>
          <Trash2Icon data-icon="inline-start" />
          Delete
        </SelectionBarAction>
      </SelectionBar>
    </div>
  )
}

export function InlineEditDemo() {
  const [name, setName] = React.useState("Website relaunch")

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <h3 className="m-0 text-lg font-medium tracking-tight">
        <InlineEdit aria-label="Project name" value={name} onValueChange={setName} />
      </h3>
      <dl className="m-0 grid grid-cols-[6rem_1fr] items-center gap-x-4 gap-y-2 text-xs">
        <dt className="text-muted-foreground">Owner</dt>
        <dd className="m-0">
          <InlineEdit aria-label="Owner" defaultValue="Alex Martin" />
        </dd>
        <dt className="text-muted-foreground">Client</dt>
        <dd className="m-0">
          <InlineEdit aria-label="Client" placeholder="Add a client" />
        </dd>
      </dl>
    </div>
  )
}

export function KanbanDemo() {
  return <ProjectBoard />
}

export function PhoneInputDemo() {
  const [value, setValue] = React.useState("+33612345678")

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <PhoneInput aria-label="Phone number" value={value} onValueChange={(next) => setValue(next)} />
      <p className="m-0 font-mono text-[11px] text-muted-foreground">{value || "—"}</p>
    </div>
  )
}

export function CurrencyInputDemo() {
  const [amount, setAmount] = React.useState<number | null>(1250)
  const [currency, setCurrency] = React.useState("EUR")

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <CurrencyInput
        aria-label="Amount"
        value={amount}
        onValueChange={setAmount}
        currency={currency}
        onCurrencyChange={setCurrency}
        currencies={["EUR", "USD", "GBP", "CHF", "JPY", "CAD"]}
      />
      <p className="m-0 font-mono text-[11px] text-muted-foreground">
        {amount ?? "null"} {currency}
      </p>
    </div>
  )
}

const before = `import { Button } from "@/components/ui/Button"

export function SaveBar({ onSave }: { onSave: () => void }) {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline">Cancel</Button>
      <Button onClick={onSave}>Save</Button>
    </div>
  )
}

export function SaveHint() {
  return <p className="text-xs text-muted-foreground">Changes are kept locally.</p>
}
`

const after = `import { Button } from "@/components/ui/Button"

export function SaveBar({ onSave, saving }: { onSave: () => void; saving: boolean }) {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="ghost">Cancel</Button>
      <Button onClick={onSave} loading={saving}>
        Save changes
      </Button>
    </div>
  )
}

export function SaveHint() {
  return <p className="text-xs text-muted-foreground">Changes are kept locally.</p>
}
`

export function DiffViewerDemo() {
  const [view, setView] = React.useState<"unified" | "split">("unified")

  return (
    <div className="flex w-full flex-col items-start gap-3">
      <ToggleGroup
        aria-label="Diff layout"
        value={[view]}
        onValueChange={(next) => next[0] && setView(next[0] as "unified" | "split")}
      >
        <Toggle value="unified">Unified</Toggle>
        <Toggle value="split">Split</Toggle>
      </ToggleGroup>
      <DiffViewer title="SaveBar.tsx" oldValue={before} newValue={after} view={view} context={2} className="w-full" />
    </div>
  )
}
