"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog"
import { Button } from "@/components/ui/Button"

export default function AlertDialogPage() {
  return (
    <ComponentDocs
      name="Alert Dialog"
      description="Dialogue bloquant qui exige une réponse. Construit sur @base-ui/react/alert-dialog."
      preview={
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive" />}>
            Supprimer
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Supprimer ce brouillon ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogClose render={<Button variant="ghost" />}>
                Annuler
              </AlertDialogClose>
              <AlertDialogClose render={<Button variant="destructive" />}>
                Supprimer
              </AlertDialogClose>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      }
      usage={`import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogClose } from "@/components/ui/AlertDialog"

<AlertDialog>
  <AlertDialogTrigger render={<Button />}>Ouvrir</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Confirmer</AlertDialogTitle>
    <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
    <AlertDialogClose render={<Button />}>Fermer</AlertDialogClose>
  </AlertDialogContent>
</AlertDialog>`}
    />
  )
}
