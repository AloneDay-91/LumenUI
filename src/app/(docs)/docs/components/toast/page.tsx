"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Button } from "@/components/ui/Button"
import { useToastManager } from "@/components/ui/Toast"

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

export default function ToastPage() {
  return (
    <ComponentDocs
      name="Toast"
      description="Stacked notifications. Built on @base-ui/react/toast: Provider, Viewport, Root, Content, Title and Description read from toast.add()."
      preview={<ToastDemo />}
      usage={`import { useToastManager } from "@/components/ui/Toast"

const toast = useToastManager()
toast.add({
  title: "Saved",
  description: "Tokens are up to date.",
  actionProps: { children: "Cancel", onClick: () => {} },
})`}
    />
  )
}
