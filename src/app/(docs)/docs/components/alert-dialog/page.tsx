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
      description="Blocking dialog that requires a response. Built on @base-ui/react/alert-dialog."
      preview={
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive" />}>
            Delete
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this draft?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogClose render={<Button variant="ghost" />}>
                Cancel
              </AlertDialogClose>
              <AlertDialogClose render={<Button variant="destructive" />}>
                Delete
              </AlertDialogClose>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      }
      usage={`import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogClose } from "@/components/ui/AlertDialog"

<AlertDialog>
  <AlertDialogTrigger render={<Button />}>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Confirm</AlertDialogTitle>
    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    <AlertDialogClose render={<Button />}>Close</AlertDialogClose>
  </AlertDialogContent>
</AlertDialog>`}
    />
  )
}
