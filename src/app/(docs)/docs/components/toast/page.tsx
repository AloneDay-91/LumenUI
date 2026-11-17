"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Button } from "@/components/ui/Button"
import { useToastManager } from "@/components/ui/Toast"

const longTitle = "Could not publish the preview"
const longDescription =
  "The build finished, but the preview URL is not ready yet. Try again in a minute."

function ToastDemo() {
  const toast = useToastManager()
  return (
    <Button
      onClick={() =>
        toast.add({
          title: "Saved",
          description: "Tokens are up to date.",
        })
      }
    >
      Show
    </Button>
  )
}

function ToastExamples() {
  const toast = useToastManager()

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button variant="outline" onClick={() => toast.add({ title: "Saved" })}>
        Title
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Saved",
            description: "Tokens are up to date.",
          })
        }
      >
        Description
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Saved",
            description: "Tokens are up to date.",
            actionProps: { children: "Undo" },
          })
        }
      >
        Action
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: longTitle,
            description: longDescription,
            actionProps: { children: "Retry" },
          })
        }
      >
        Long
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toast.add({ title: "Saved", description: "Tokens are up to date." })
          toast.add({
            title: "Deploy queued",
            description: "The preview will be ready in a moment.",
          })
        }}
      >
        Stack
      </Button>
    </div>
  )
}

export default function ToastPage() {
  return (
    <ComponentDocs
      name="Toast"
      description="Stacked notifications. Built on @base-ui/react/toast: Provider, Viewport, Root, Content, Title and Description read from toast.add()."
      preview={<ToastDemo />}
      usage={`import { useToastManager } from "@/components/ui/Toast"

const toast = useToastManager()
toast.add({ title: "Saved" })
toast.add({
  title: "Saved",
  description: "Tokens are up to date.",
})
toast.add({
  title: "Saved",
  description: "Tokens are up to date.",
  actionProps: { children: "Undo" },
})`}
      extraHeadings={[{ id: "examples", text: "Examples", level: 2 }]}
      extra={
        <section className="space-y-4">
          <h2 id="examples">Examples</h2>
          <p>
            Title alone, a short description, an action, a long description, or
            two toasts at once. A long description wraps under the title. The
            action sits at the bottom right.
          </p>
          <ToastExamples />
        </section>
      }
    />
  )
}
