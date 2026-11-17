import {
  FilesIcon,
  KeyboardIcon,
  LayoutDashboardIcon,
  SearchIcon,
  TextCursorInputIcon,
} from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

import { Badge } from "@/components/ui/Badge"
import { Message, MessageBody, MessageContent } from "@/components/ui/Message"
import { Progress } from "@/components/ui/Progress"
import { Trace, TraceTrigger } from "@/components/ui/Trace"

const points = [
  {
    icon: KeyboardIcon,
    title: "Accessibility",
    href: "/docs/accessibility",
    text: "Focus moves into a dialog and returns to the trigger when it closes.",
  },
  {
    icon: TextCursorInputIcon,
    title: "Names",
    href: "/docs/accessibility",
    text: "You still name the label and the dialog title. A placeholder is not a name.",
  },
  {
    icon: LayoutDashboardIcon,
    title: "Blocks",
    href: "/blocks",
    text: "A sign-in, a settings page, a dashboard, already arranged.",
  },
  {
    icon: FilesIcon,
    title: "Your files",
    href: "/docs/installation",
    text: "The CLI copies the source. You edit the file in the repo.",
  },
] as const

/** Layered cards that fade out, the same stack as the reference section. */
function Peek({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden
      className="relative -mx-4 px-4 pt-6 mask-[linear-gradient(to_bottom,black_65%,transparent)]"
    >
      <div className="absolute inset-x-6 top-4 bottom-0 rounded-2xl border border-border bg-background" />
      <div className="absolute inset-x-9 top-2 bottom-0 rounded-2xl border border-border bg-background/50" />
      <div className="relative z-10 rounded-2xl border border-border bg-background p-6 text-sm shadow-xl ring-1 ring-foreground/10">
        {children}
      </div>
    </div>
  )
}

export function AiAndNumbers() {
  return (
    <div className="w-full px-6 py-12">
      <div className="grid max-md:divide-y md:grid-cols-2 md:divide-x">
        <div className="row-span-2 grid grid-rows-subgrid gap-8 pb-12 md:pr-12">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-heading text-2xl leading-tight font-normal tracking-[-0.02em] text-balance text-foreground md:text-[1.875rem] md:leading-[1.25]">
                Patterns for an AI app
              </h3>
              <Badge variant="outline" className="gap-1.5">
                <span className="size-1.5 rounded-full bg-new" aria-hidden />
                New
              </Badge>
            </div>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Chat, the steps an agent takes, and where the answer comes from.
              Every step is one Trace.
            </p>
          </div>
          <Peek>
            <div className="flex flex-col gap-3">
              <Message from="user">
                <MessageBody>
                  <MessageContent>Which invoices are still open?</MessageContent>
                </MessageBody>
              </Message>
              <Trace status="done">
                <TraceTrigger icon={<SearchIcon />} label="Look up invoices" meta="2 files" />
              </Trace>
              <Message from="assistant">
                <MessageBody>
                  <MessageContent>Three are open. The oldest is due in 15 days.</MessageContent>
                </MessageBody>
              </Message>
            </div>
          </Peek>
        </div>

        <div className="row-span-2 grid grid-rows-subgrid gap-8 pb-12 max-md:pt-12 md:pl-12">
          <div>
            <h3 className="font-heading text-2xl leading-tight font-normal tracking-[-0.02em] text-balance text-foreground md:text-[1.875rem] md:leading-[1.25]">
              A number on the page
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Progress, Meter, and Chart for when the screen has to show how
              far something has gone.
            </p>
          </div>
          <Peek>
            <div className="font-medium">Files copied</div>
            <p className="mt-0.5 text-sm text-muted-foreground">Button, Dialog, and Table in the repo</p>
            <Progress value={40} className="mt-4" />
            <div className="mt-4 flex gap-6 border-b border-dashed border-border pb-3">
              <div>
                <div className="text-xl font-medium">12</div>
                <div className="text-sm text-muted-foreground">Components</div>
              </div>
              <div>
                <div className="text-xl font-medium">3</div>
                <div className="text-sm text-muted-foreground">Blocks</div>
              </div>
            </div>
            <ul className="mt-3 space-y-1">
              <li className="flex items-center gap-2 text-sm">
                <span className="size-1.5 rounded-full bg-foreground/70" />
                Button, Dialog, Table
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span className="size-1.5 rounded-full bg-primary" />
                Dashboard, sign-in, settings
              </li>
            </ul>
          </Peek>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-x-3 gap-y-6 border-t border-border pt-12 sm:gap-6 lg:grid-cols-4">
        {points.map((point) => {
          const Icon = point.icon
          return (
            <li key={point.title}>
              <Link href={point.href} className="group/note block space-y-2">
                <span className="flex items-center gap-2">
                  <Icon className="size-4 text-foreground" aria-hidden />
                  <span className="text-sm font-medium">{point.title}</span>
                </span>
                <span className="block text-sm text-muted-foreground transition-colors group-hover/note:text-foreground">
                  {point.text}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
