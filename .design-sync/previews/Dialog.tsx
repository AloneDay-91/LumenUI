import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "lumen-ui"

export const Open = () => (
  <Dialog defaultOpen>
    <DialogTrigger render={<Button />}>Edit profile</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>Changes are saved to your workspace.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-3">
        <div className="grid gap-2">
          <Label htmlFor="dialog-name">Name</Label>
          <Input id="dialog-name" defaultValue="Alex Martin" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="dialog-handle">Username</Label>
          <Input id="dialog-handle" defaultValue="@alex" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
        <DialogClose render={<Button />}>Save</DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

export const Simple = () => (
  <Dialog defaultOpen>
    <DialogTrigger render={<Button />}>Open</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Notifications</DialogTitle>
        <DialogDescription>You are up to date.</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose render={<Button variant="secondary" />}>Close</DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
