<script setup lang="ts">
import { ref } from "vue"
import { Info, Moon, Plus, Sun } from "@lucide/vue"

import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsPanels, TabsTab } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const dark = ref(false)
const loading = ref(false)
const email = ref("")
const notify = ref(true)
const terms = ref<boolean | "indeterminate">(false)
const plan = ref("pro")
const fruit = ref<string>()
const showGrid = ref(true)

function toggleTheme() {
  dark.value = !dark.value
  document.documentElement.classList.toggle("dark", dark.value)
}

function submit() {
  loading.value = true
  setTimeout(() => (loading.value = false), 2000)
}
</script>

<template>
  <main class="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-12">
    <header class="flex items-center justify-between">
      <div>
        <h1 class="font-serif text-2xl">Lumen UI for Vue</h1>
        <p class="text-xs text-muted-foreground">Reka UI behavior, Lumen tokens.</p>
      </div>
      <Button variant="outline" size="icon" aria-label="Toggle theme" @click="toggleTheme">
        <Moon v-if="!dark" />
        <Sun v-else />
      </Button>
    </header>

    <section id="button" class="flex flex-wrap items-center gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
      <Button :loading="loading" @click="submit">{{ loading ? "Submitting" : "Submit" }}</Button>
      <Button size="sm"><Plus data-icon="inline-start" />Add</Button>
      <Button as="a" href="#button" variant="outline">As link</Button>
      <Spinner />
    </section>

    <section id="badge" class="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge color="indigo">Indigo</Badge>
      <Badge color="crimson" high-contrast>Crimson</Badge>
    </section>

    <section id="card" class="grid gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Use the email you signed up with.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-3">
          <Field :invalid="email.length > 0 && !email.includes('@')">
            <FieldLabel>Email</FieldLabel>
            <FieldControl v-model="email" type="email" placeholder="alex.martin@example.com" />
            <FieldDescription>We never share it.</FieldDescription>
            <FieldError>Enter a valid email.</FieldError>
          </Field>
          <div class="flex flex-col gap-1.5">
            <Label for="msg">Message</Label>
            <Textarea id="msg" placeholder="Say hello" />
          </div>
          <Input placeholder="Plain input" />
        </CardContent>
        <CardFooter class="justify-end gap-2">
          <Button variant="ghost">Cancel</Button>
          <Button>Continue</Button>
        </CardFooter>
      </Card>

      <Card variant="secondary" size="sm">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-4">
          <Label><Switch v-model="notify" /> Email notifications ({{ notify ? "on" : "off" }})</Label>
          <Label><Checkbox v-model="terms" /> Accept the terms</Label>
          <Label><Checkbox :model-value="'indeterminate'" /> Indeterminate</Label>
          <RadioGroup v-model="plan">
            <Label><RadioGroupItem value="free" /> Free</Label>
            <Label><RadioGroupItem value="pro" /> Pro</Label>
            <Label><RadioGroupItem value="team" disabled /> Team</Label>
          </RadioGroup>
          <Separator />
          <div class="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Alex Martin" />
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <Avatar><AvatarFallback>AM</AvatarFallback></Avatar>
            <Skeleton class="h-4 w-24" />
          </div>
        </CardContent>
      </Card>
    </section>

    <section id="alert" class="grid gap-3">
      <Alert>
        <Info />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>The same tokens drive React and Vue.</AlertDescription>
      </Alert>
      <Alert variant="success"><AlertTitle>Saved</AlertTitle></Alert>
      <Alert variant="destructive">
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>Check the card and try again.</AlertDescription>
      </Alert>
    </section>

    <section id="tabs" class="grid gap-6">
      <Tabs default-value="account">
        <TabsList>
          <TabsTab value="account">Account</TabsTab>
          <TabsTab value="password">Password</TabsTab>
          <TabsTab value="billing">Billing</TabsTab>
          <TabsIndicator />
        </TabsList>
        <TabsPanels>
          <TabsPanel value="account">Account settings.</TabsPanel>
          <TabsPanel value="password">Change your password.</TabsPanel>
          <TabsPanel value="billing">Invoices and plan.</TabsPanel>
        </TabsPanels>
      </Tabs>
      <Tabs default-value="overview">
        <TabsList variant="line" color="indigo">
          <TabsTab value="overview">Overview</TabsTab>
          <TabsTab value="activity">Activity</TabsTab>
          <TabsIndicator />
        </TabsList>
        <TabsPanel value="overview">Overview panel.</TabsPanel>
        <TabsPanel value="activity">Activity panel.</TabsPanel>
      </Tabs>
    </section>

    <section id="accordion">
      <Accordion type="single" collapsible default-value="a">
        <AccordionItem value="a">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionPanel>Yes. Reka UI handles focus and keyboard.</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Can I edit the files?</AccordionTrigger>
          <AccordionPanel>They are copied into your repo.</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </section>

    <section id="overlays" class="flex flex-wrap items-center gap-3">
      <Dialog>
        <DialogTrigger as-child><Button variant="outline">Open dialog</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Changes save when you press Save.</DialogDescription>
          </DialogHeader>
          <Input placeholder="Alex Martin" />
          <DialogFooter>
            <DialogClose as-child><Button variant="ghost">Cancel</Button></DialogClose>
            <DialogClose as-child><Button>Save</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog>
        <AlertDialogTrigger as-child><Button variant="destructive">Delete</Button></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete the project?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose as-child><Button variant="ghost">Cancel</Button></AlertDialogClose>
            <AlertDialogAction as-child><Button variant="destructive">Delete</Button></AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Popover>
        <PopoverTrigger as-child><Button variant="outline">Popover</Button></PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the size of the layer.</PopoverDescription>
        </PopoverContent>
      </Popover>

      <Tooltip>
        <TooltipTrigger as-child><Button variant="ghost">Hover me</Button></TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>

      <DropdownMenu>
        <DropdownMenuTrigger as-child><Button variant="outline">Menu</Button></DropdownMenuTrigger>
        <DropdownMenuContent class="w-48">
          <DropdownMenuItem>Profile <DropdownMenuShortcut>⌘P</DropdownMenuShortcut></DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuCheckboxItem v-model="showGrid">Show grid</DropdownMenuCheckboxItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Email</DropdownMenuItem>
              <DropdownMenuItem>Link</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Select v-model="fruit">
        <SelectTrigger class="w-40"><SelectValue placeholder="Pick a fruit" /></SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  </main>
</template>
