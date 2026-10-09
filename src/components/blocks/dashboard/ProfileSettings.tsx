"use client"

import { Check, Mail, Upload } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardFooter } from "@/components/ui/Card"
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/Field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/InputGroup"
import { Separator } from "@/components/ui/Separator"
import { Textarea } from "@/components/ui/Textarea"

import { SettingsSection } from "./SettingsSection"

export function ProfileSettings() {
  return (
    <SettingsSection
      title="Profile"
      description="How you appear to teammates and in emails sent from Lumen."
    >
      <Card>
        <CardContent className="flex flex-wrap items-center gap-4">
          <Avatar className="size-14">
            <AvatarFallback className="bg-primary text-primary-foreground">
              EB
            </AvatarFallback>
          </Avatar>
          <div className="min-w-40 flex-1">
            <p className="text-xs font-medium">Profile photo</p>
            <p className="text-xs text-muted-foreground">
              PNG or JPG, at least 256×256.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload data-icon="inline-start" />
              Upload
            </Button>
            <Button variant="ghost" size="sm">
              Remove
            </Button>
          </div>
        </CardContent>
        <Separator />
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel>First name</FieldLabel>
              <FieldControl defaultValue="Elouan" />
            </Field>
            <Field>
              <FieldLabel>Last name</FieldLabel>
              <FieldControl defaultValue="Bruzek" />
            </Field>
          </div>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <Mail />
              </InputGroupAddon>
              <InputGroupInput defaultValue="elouan@lumen.dev" aria-label="Email" />
              <InputGroupAddon align="end">
                <Badge variant="success">
                  <Check />
                  Verified
                </Badge>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel>Username</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>lumen.app/</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput defaultValue="elouan" aria-label="Username" />
            </InputGroup>
            <FieldDescription>Lowercase letters, numbers and dashes.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel>Bio</FieldLabel>
            <Textarea
              rows={3}
              aria-label="Bio"
              defaultValue="Designer & developer. Building Lumen UI, a copy-paste design system for React."
            />
            <FieldDescription className="text-right">78 / 160</FieldDescription>
          </Field>
        </CardContent>
        <Separator />
        <CardFooter className="flex-wrap gap-2">
          <span className="flex-1 text-xs text-muted-foreground">
            Last saved 2 days ago
          </span>
          <Button variant="ghost" size="sm">
            Cancel
          </Button>
          <Button size="sm">Save changes</Button>
        </CardFooter>
      </Card>
    </SettingsSection>
  )
}
