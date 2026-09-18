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
          title: "Enregistré",
          description: "Les tokens sont à jour.",
        })
      }
    >
      Afficher
    </Button>
  )
}

export default function ToastPage() {
  return (
    <ComponentDocs
      name="Toast"
      description="Notifications empilées. Construit sur @base-ui/react/toast : Provider, Viewport, Root, Content, Title et Description lus depuis toast.add()."
      preview={<ToastDemo />}
      usage={`import { useToastManager } from "@/components/ui/Toast"

const toast = useToastManager()
toast.add({
  title: "Enregistré",
  description: "Les tokens sont à jour.",
  actionProps: { children: "Annuler", onClick: () => {} },
})`}
    />
  )
}
