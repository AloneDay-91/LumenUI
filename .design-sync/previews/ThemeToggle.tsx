import { ThemeToggle } from "lumen-ui"

export const Default = () => <ThemeToggle />

export const InToolbar = () => (
  <div className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-sm">
    <span className="mr-2 font-medium">Lumen UI</span>
    <ThemeToggle />
  </div>
)
