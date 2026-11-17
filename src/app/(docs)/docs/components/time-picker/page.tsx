"use client"

import * as React from "react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Field, FieldLabel } from "@/components/ui/Field"
import { TimePicker } from "@/components/ui/TimePicker"

function TimePickerDemo() {
  const [time, setTime] = React.useState("14:30")
  return (
    <div className="flex flex-col items-center gap-2">
      <TimePicker value={time} onValueChange={setTime} aria-label="Meeting time" />
      <p className="m-0 font-mono text-xs text-muted-foreground">value: {time}</p>
    </div>
  )
}

export default function TimePickerPage() {
  return (
    <ComponentDocs
      name="Time Picker"
      description="Hours and minutes in two scrolling columns, in a Popover. The value is HH:mm in 24-hour time, like a native time input."
      preview={<TimePickerDemo />}
      usage={`import { TimePicker } from "@/components/ui/TimePicker"

const [time, setTime] = React.useState("14:30")

<TimePicker value={time} onValueChange={setTime} aria-label="Meeting time" />`}
      extraHeadings={[
        { id: "hour-cycle", text: "12-hour clock", level: 2 },
        { id: "step", text: "Step", level: 2 },
        { id: "form", text: "In a form", level: 2 },
        { id: "keyboard", text: "Keyboard", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="hour-cycle">12-hour clock</h2>
            <p>
              <code>hourCycle={"{12}"}</code> shows 1 to 12 and an AM / PM column.
              The value stays 24-hour, so the server reads the same format either
              way.
            </p>
            <div>
              <TimePicker hourCycle={12} defaultValue="18:15" aria-label="Pickup time" />
            </div>
            <CodeBlock code={`<TimePicker hourCycle={12} defaultValue="18:15" />`} />
          </section>
          <section className="space-y-4">
            <h2 id="step">Step</h2>
            <p>
              <code>step</code> is the gap between two minute options. The default
              is 15; use 5 for appointments, 1 for logs.
            </p>
            <div>
              <TimePicker step={5} aria-label="Start time" />
            </div>
            <CodeBlock code={`<TimePicker step={5} />`} />
          </section>
          <section className="space-y-4">
            <h2 id="form">In a form</h2>
            <p>
              With <code>name</code>, a hidden input posts the value. Give the
              trigger an <code>id</code> and point the label at it.
            </p>
            <div className="w-fit">
              <Field>
                <FieldLabel htmlFor="opens-at">Opens at</FieldLabel>
                <TimePicker id="opens-at" name="opensAt" defaultValue="09:00" />
              </Field>
            </div>
            <CodeBlock
              code={`<FieldLabel htmlFor="opens-at">Opens at</FieldLabel>
<TimePicker id="opens-at" name="opensAt" defaultValue="09:00" />`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="keyboard">Keyboard</h2>
            <p>
              Opening moves focus to the selected hour. Up and Down move in a
              column, Home and End jump to its ends, Tab goes to the next column.
              Space picks and stays open; Enter on a minute picks and closes.
            </p>
          </section>
        </>
      }
    />
  )
}
