/**
 * Components that also ship for Vue 3 (Reka UI), keyed by docs slug.
 * `item` is the Vue registry name when it differs from the slug.
 * Sources live in vue/src/components/ui; `npm run registry` writes cli/registry/registry-vue.json.
 */
export type VueComponent = { item?: string; usage: string }

export const VUE_COMPONENTS: Record<string, VueComponent> = {
  accordion: {
    usage: `<script setup lang="ts">
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/components/ui/accordion"
</script>

<template>
  <Accordion type="single" collapsible default-value="a">
    <AccordionItem value="a">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionPanel>Yes. Reka UI handles focus and keyboard.</AccordionPanel>
    </AccordionItem>
  </Accordion>
</template>`,
  },
  alert: {
    usage: `<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
</script>

<template>
  <Alert variant="success">
    <AlertTitle>Saved</AlertTitle>
    <AlertDescription>Your changes are live.</AlertDescription>
  </Alert>
</template>`,
  },
  "alert-dialog": {
    usage: `<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  AlertDialog, AlertDialogAction, AlertDialogClose, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
</script>

<template>
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
</template>`,
  },
  avatar: {
    usage: `<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
</script>

<template>
  <Avatar>
    <AvatarImage src="/avatar.png" alt="Alex Martin" />
    <AvatarFallback>AM</AvatarFallback>
  </Avatar>
</template>`,
  },
  badge: {
    usage: `<script setup lang="ts">
import { Badge } from "@/components/ui/badge"
</script>

<template>
  <Badge variant="secondary">Draft</Badge>
  <Badge color="indigo" high-contrast>New</Badge>
</template>`,
  },
  button: {
    usage: `<script setup lang="ts">
import { Button } from "@/components/ui/button"
</script>

<template>
  <Button variant="outline" @click="save">Button</Button>
  <Button :loading="saving">Submit</Button>
  <Button as="a" href="/docs">As link</Button>
</template>`,
  },
  card: {
    usage: `<script setup lang="ts">
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Plan</CardTitle>
      <CardDescription>Billed monthly.</CardDescription>
    </CardHeader>
    <CardContent>Pro, 3 seats.</CardContent>
    <CardFooter>Renews on the 1st.</CardFooter>
  </Card>
</template>`,
  },
  checkbox: {
    usage: `<script setup lang="ts">
import { ref } from "vue"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const accepted = ref(false)
</script>

<template>
  <Label><Checkbox v-model="accepted" /> Accept the terms</Label>
</template>`,
  },
  dialog: {
    usage: `<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
</script>

<template>
  <Dialog>
    <DialogTrigger as-child><Button variant="outline">Edit profile</Button></DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>Changes save when you press Save.</DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>`,
  },
  menu: {
    item: "dropdown-menu",
    usage: `<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child><Button variant="outline">Menu</Button></DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem @select="openProfile">Profile</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>`,
  },
  field: {
    usage: `<script setup lang="ts">
import { computed, ref } from "vue"
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"

const email = ref("")
const invalid = computed(() => email.value !== "" && !email.value.includes("@"))
</script>

<template>
  <Field :invalid="invalid">
    <FieldLabel>Email</FieldLabel>
    <FieldControl v-model="email" type="email" />
    <FieldDescription>We never share it.</FieldDescription>
    <FieldError>Enter a valid email.</FieldError>
  </Field>
</template>`,
  },
  input: {
    usage: `<script setup lang="ts">
import { ref } from "vue"
import { Input } from "@/components/ui/input"

const name = ref("")
</script>

<template>
  <Input v-model="name" placeholder="Alex Martin" />
</template>`,
  },
  label: {
    usage: `<script setup lang="ts">
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
</script>

<template>
  <Label for="email">Email</Label>
  <Input id="email" type="email" />
</template>`,
  },
  popover: {
    usage: `<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger,
} from "@/components/ui/popover"
</script>

<template>
  <Popover>
    <PopoverTrigger as-child><Button variant="outline">Dimensions</Button></PopoverTrigger>
    <PopoverContent>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>Set the size of the layer.</PopoverDescription>
    </PopoverContent>
  </Popover>
</template>`,
  },
  "radio-group": {
    usage: `<script setup lang="ts">
import { ref } from "vue"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const plan = ref("pro")
</script>

<template>
  <RadioGroup v-model="plan">
    <Label><RadioGroupItem value="free" /> Free</Label>
    <Label><RadioGroupItem value="pro" /> Pro</Label>
  </RadioGroup>
</template>`,
  },
  select: {
    usage: `<script setup lang="ts">
import { ref } from "vue"
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

const fruit = ref<string>()
</script>

<template>
  <Select v-model="fruit">
    <SelectTrigger class="w-40"><SelectValue placeholder="Pick a fruit" /></SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>`,
  },
  separator: {
    usage: `<script setup lang="ts">
import { Separator } from "@/components/ui/separator"
</script>

<template>
  <Separator />
  <Separator orientation="vertical" class="h-4" />
</template>`,
  },
  skeleton: {
    usage: `<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton"
</script>

<template>
  <Skeleton class="h-4 w-32" />
</template>`,
  },
  spinner: {
    usage: `<script setup lang="ts">
import { Spinner } from "@/components/ui/spinner"
</script>

<template>
  <Spinner class="size-4" />
</template>`,
  },
  switch: {
    usage: `<script setup lang="ts">
import { ref } from "vue"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const notify = ref(true)
</script>

<template>
  <Label><Switch v-model="notify" /> Email notifications</Label>
</template>`,
  },
  tabs: {
    usage: `<script setup lang="ts">
import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsPanels, TabsTab } from "@/components/ui/tabs"
</script>

<template>
  <Tabs default-value="account">
    <TabsList>
      <TabsTab value="account">Account</TabsTab>
      <TabsTab value="password">Password</TabsTab>
      <TabsIndicator />
    </TabsList>
    <TabsPanels>
      <TabsPanel value="account">Account settings.</TabsPanel>
      <TabsPanel value="password">Change your password.</TabsPanel>
    </TabsPanels>
  </Tabs>
</template>`,
  },
  textarea: {
    usage: `<script setup lang="ts">
import { ref } from "vue"
import { Textarea } from "@/components/ui/textarea"

const message = ref("")
</script>

<template>
  <Textarea v-model="message" placeholder="Say hello" />
</template>`,
  },
  tooltip: {
    usage: `<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child><Button variant="ghost">Hover me</Button></TooltipTrigger>
    <TooltipContent>Saved 2 minutes ago</TooltipContent>
  </Tooltip>
</template>`,
  },
}

export function vueComponent(slug: string) {
  const entry = VUE_COMPONENTS[slug]
  return entry ? { item: entry.item ?? slug, usage: entry.usage } : undefined
}

export function vueInstallCommand(item: string) {
  return `npx @aloneday/lumenui@latest add ${item} --framework vue`
}
