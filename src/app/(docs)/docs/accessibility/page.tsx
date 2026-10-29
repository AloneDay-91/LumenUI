import Link from "next/link"

import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { PageIntro } from "@/components/docs/Preview"

const handled = [
  {
    href: "/docs/components/dialog",
    name: "Dialog, Alert Dialog, Drawer, Popover, Menu",
    body: "Focus moves into the layer and returns to the trigger when it closes. Escape closes it.",
  },
  {
    href: "/docs/components/select",
    name: "Select, Combobox, Menu, Tabs, Radio Group",
    body: "Arrow keys move through the options. Typeahead jumps to a matching item when the primitive provides it.",
  },
  {
    href: "/docs/components/switch",
    name: "Switch, Checkbox, Slider",
    body: "They are buttons or sliders with the checked and value state exposed to assistive technology.",
  },
]

const yours = [
  {
    href: "/docs/components/field",
    name: "Name the control",
    body: "Use FieldLabel, or aria-label on an icon button. A placeholder is not a name.",
  },
  {
    href: "/docs/components/dialog",
    name: "Name the layer",
    body: "DialogTitle is the accessible name. DialogDescription is the rest. Do not leave a dialog without a title.",
  },
  {
    href: "/docs/components/alert",
    name: "Interrupt only when it is urgent",
    body: "Alert uses role alert for destructive, and role status for the other variants. A static note should not use alert.",
  },
  {
    href: "/docs/components/field",
    name: "Point at the error",
    body: "FieldError is tied to the control. Set the message for valueMissing or typeMismatch. The invalid state is the field’s, not a color alone.",
  },
  {
    href: "/docs/components/avatar",
    name: "Describe the image",
    body: "AvatarImage needs alt. Decorative icons stay aria-hidden.",
  },
]

export default function AccessibilityPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "accessibility", text: "Accessibility", level: 1 },
          { id: "handled", text: "Already handled", level: 2 },
          { id: "yours", text: "You still name it", level: 2 },
        ]}
      />
      <div className="space-y-12">
        <PageIntro
          title="Accessibility"
          description="Base UI handles focus, the keyboard, and the roles. You name the control, the layer, and the error."
        />

        <section className="space-y-4">
          <h2 id="handled">Already handled</h2>
          <p>
            These behaviors ship with the primitive. Do not rebuild them in the
            copied file.
          </p>
          <ul className="divide-y divide-border border-y border-border">
            {handled.map((item) => (
              <li key={item.name} className="py-4">
                <Link href={item.href} className="text-sm font-medium">
                  {item.name}
                </Link>
                <p className="mt-1">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 id="yours">You still name it</h2>
          <p>
            The component cannot know what the control is for. Pass the name
            and the message.
          </p>
          <ul className="divide-y divide-border border-y border-border">
            {yours.map((item) => (
              <li key={item.name} className="py-4">
                <Link href={item.href} className="text-sm font-medium">
                  {item.name}
                </Link>
                <p className="mt-1">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
