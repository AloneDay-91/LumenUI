"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"

export default function DialogPage() {
  return (
    <ComponentDocs
      name="Dialog"
      description="Popup au-dessus de la page. Construit sur @base-ui/react/dialog."
      preview={
        <Dialog>
          <DialogTrigger render={<Button />}>Ouvrir</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notifications</DialogTitle>
              <DialogDescription>Vous êtes à jour.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="secondary" />}>
                Fermer
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
      usage={`import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/Dialog"

<Dialog>
  <DialogTrigger render={<Button />}>Ouvrir</DialogTrigger>
  <DialogContent>
    <DialogTitle>Titre</DialogTitle>
    <DialogDescription>Description</DialogDescription>
  </DialogContent>
</Dialog>`}
    />
  )
}
