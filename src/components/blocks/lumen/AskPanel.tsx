"use client"

import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Message, MessageBody, MessageContent } from "@/components/ui/Message"
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/components/ui/PromptInput"
import { Sources } from "@/components/ui/Sources"

const sources = [
  { href: "https://lumen-ui.dev/docs/components/split-button", title: "Split Button" },
  { href: "https://lumen-ui.dev/docs/choose", title: "Choose a component" },
]

/** The Ask Lumen panel: a question, an answer with its sources, and the composer. */
export function AskPanel() {
  return (
    <div className="flex w-full justify-center px-6 py-10">
      <div className="flex h-[30rem] w-full max-w-md flex-col overflow-hidden rounded-[min(var(--radius-4xl),24px)] border border-border bg-background shadow-lg">
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-border ps-4 pe-2">
          <span className="text-sm font-medium">Ask Lumen</span>
          <Button variant="ghost" size="icon-sm" aria-label="Close" className="text-muted-foreground">
            <XIcon />
          </Button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-4">
          <Message from="user">
            <MessageBody>
              <MessageContent>When should I use a Split Button?</MessageContent>
            </MessageBody>
          </Message>
          <Message from="assistant">
            <MessageBody>
              <MessageContent>
                <p>
                  When one action is the obvious one and the others are variants of it, like publishing now or
                  later. If the actions are unrelated, a Menu on its own reads better.
                </p>
              </MessageContent>
              <Sources sources={sources} />
            </MessageBody>
          </Message>
        </div>
        <div className="shrink-0 p-3">
          <PromptInput>
            <PromptInputTextarea aria-label="Ask a question" placeholder="Ask about a component…" />
            <PromptInputToolbar>
              <span className="ps-2 text-[11px] text-muted-foreground">Answers come from the docs.</span>
              <PromptInputSubmit />
            </PromptInputToolbar>
          </PromptInput>
        </div>
      </div>
    </div>
  )
}
