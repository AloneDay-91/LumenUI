import * as React from "react"
import { Button, ToastProvider, Toaster, useToastManager } from "lumen-ui"

function SeedToasts({ toasts }: { toasts: { title: string; description: string; action?: string }[] }) {
  const manager = useToastManager()
  const seeded = React.useRef(false)
  React.useEffect(() => {
    if (seeded.current) return
    seeded.current = true
    for (const t of toasts) {
      manager.add({
        title: t.title,
        description: t.description,
        timeout: 0,
        ...(t.action ? { actionProps: { children: t.action } } : {}),
      })
    }
  }, [manager, toasts])
  return null
}

const saved = [{ title: "Saved", description: "Tokens are up to date." }]

const stack = [
  { title: "Deploy queued", description: "Build #482 is waiting for a runner." },
  { title: "Invite sent", description: "Maya will get an email in a minute." },
  { title: "File moved to trash", description: "brand-guide.pdf", action: "Undo" },
]

export const Default = () => (
  <ToastProvider>
    <Toaster />
    <SeedToasts toasts={saved} />
    <div className="flex items-center justify-center" style={{ minHeight: 200 }}>
      <Button variant="outline">Show toast</Button>
    </div>
  </ToastProvider>
)

export const Stacked = () => (
  <ToastProvider>
    <Toaster />
    <SeedToasts toasts={stack} />
    <div className="flex items-center justify-center" style={{ minHeight: 200 }}>
      <Button variant="outline">Show toast</Button>
    </div>
  </ToastProvider>
)
