import { Keyboard, Moon, SquareStack } from "lucide-react"
import type { ReactNode } from "react"

import { StackMark } from "@/components/blocks/lumen/StackMarks"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Toggle } from "@/components/ui/Toggle"
import { ToggleGroup } from "@/components/ui/ToggleGroup"

const highlights: { title: string; body: string; icon: ReactNode }[] = [
  { title: "Copy-paste", body: "You copy the file. It lives in your repo, with no package to version.", icon: <SquareStack className="size-4" aria-hidden /> },
  { title: "Base UI", body: "Focus, keyboard, and portals come from the primitives.", icon: <StackMark id="base-ui" className="size-4" /> },
  { title: "Keyboard first", body: "Visible focus and native composition on every control.", icon: <Keyboard className="size-4" aria-hidden /> },
  { title: "Light and dark", body: "One set of tokens, two themes, no interactive blue.", icon: <Moon className="size-4" aria-hidden /> },
]

function InviteCard({ theme }: { theme: string }) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Invite a teammate</CardTitle>
        <CardDescription>{theme} tokens</CardDescription>
      </CardHeader>
      <CardContent>
        <Button size="xs" type="button">
          Send
        </Button>
      </CardContent>
    </Card>
  )
}

export function Tokens() {
  return (
    <section className="w-full px-6 py-12">
      <h2 className="text-lg font-medium tracking-tight">Light and dark from one set of tokens</h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        Swap one class on the root and every component follows.
      </p>
      <div className="mt-7 flex items-center justify-between gap-3">
        <span className="text-sm font-medium">Appearance</span>
        <ToggleGroup defaultValue={["dark"]} aria-label="Appearance">
          <Toggle value="light">Light</Toggle>
          <Toggle value="dark">Dark</Toggle>
          <Toggle value="system">System</Toggle>
        </ToggleGroup>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <InviteCard theme="Light" />
        <Card className="dark gap-0 border-transparent bg-background p-3 text-foreground ring-1 ring-border">
          <InviteCard theme="Dark" />
        </Card>
      </div>
      <ul className="mt-10 grid gap-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item) => (
          <li key={item.title} className="flex flex-col gap-2.5">
            <span className="inline-flex items-center gap-2 text-sm font-medium">
              {item.icon}
              {item.title}
            </span>
            <span className="text-sm leading-relaxed text-muted-foreground">{item.body}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
