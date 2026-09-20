"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRightIcon, MailIcon, PlusIcon, TrashIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Preview } from "@/components/docs/Preview"
import { Button } from "@/components/ui/Button"
import { ButtonGroup } from "@/components/ui/ButtonGroup"
import { buttonVariants } from "@/components/ui/button-variants"
import { Spinner } from "@/components/ui/Spinner"

function LoadingButtonDemo() {
  const [loading, setLoading] = React.useState(false)
  const labelId = React.useId()

  return (
    <Button
      disabled={loading}
      focusableWhenDisabled
      aria-labelledby={labelId}
      onClick={() => {
        setLoading(true)
        setTimeout(() => setLoading(false), 3000)
      }}
    >
      {loading ? <Spinner data-icon="inline-start" /> : null}
      <span id={labelId}>{loading ? "Submitting" : "Submit"}</span>
    </Button>
  )
}

export default function ButtonPage() {
  return (
    <ComponentDocs
      name="Button"
      description="Pill button, built on @base-ui/react/button. Variants via CVA. Composition via the render prop."
      preview={<Button>Continue</Button>}
      usage={`import { Button } from "@/components/ui/Button"

<Button variant="outline">Button</Button>`}
      extraHeadings={[
        { id: "variants", text: "Variants", level: 2 },
        { id: "sizes", text: "Sizes", level: 2 },
        { id: "icon", text: "Icon", level: 2 },
        { id: "with-icon", text: "With icon", level: 2 },
        { id: "spinner", text: "Spinner", level: 2 },
        { id: "loading", text: "Loading state", level: 2 },
        { id: "group", text: "Button group", level: 2 },
        { id: "render", text: "Rendering as another tag", level: 2 },
        { id: "as-link", text: "As link", level: 2 },
        { id: "shape", text: "Shape", level: 2 },
        { id: "cursor", text: "Cursor", level: 2 },
        { id: "rtl", text: "RTL", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="variants">Variants</h2>
            <Preview className="flex-wrap gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </Preview>
          </section>

          <section className="space-y-4">
            <h2 id="sizes">Sizes</h2>
            <Preview className="flex-wrap items-center gap-3">
              <Button size="xs">Extra small</Button>
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
            </Preview>
            <CodeBlock
              code={`<Button size="xs">Extra small</Button>
<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="icon">Icon</h2>
            <p>
              The <code>icon</code> sizes render a square button. Give it an{" "}
              <code>aria-label</code>: an icon alone has no accessible name.
            </p>
            <Preview className="flex-wrap items-center gap-3">
              <Button size="icon-xs" variant="outline" aria-label="Add">
                <PlusIcon />
              </Button>
              <Button size="icon-sm" variant="outline" aria-label="Add">
                <PlusIcon />
              </Button>
              <Button size="icon" variant="outline" aria-label="Add">
                <PlusIcon />
              </Button>
              <Button size="icon-lg" variant="outline" aria-label="Add">
                <PlusIcon />
              </Button>
              <Button size="icon" variant="destructive" aria-label="Delete">
                <TrashIcon />
              </Button>
            </Preview>
            <CodeBlock
              code={`<Button size="icon" variant="outline" aria-label="Add">
  <PlusIcon />
</Button>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="with-icon">With icon</h2>
            <p>
              Mark the icon with <code>data-icon=&quot;inline-start&quot;</code>{" "}
              or <code>data-icon=&quot;inline-end&quot;</code>. The button tightens
              the padding on that side so the icon does not sit too far from the
              edge — without the attribute the label and the icon look off-centre.
            </p>
            <Preview className="flex-wrap items-center gap-3">
              <Button>
                <MailIcon data-icon="inline-start" />
                Email
              </Button>
              <Button variant="outline">
                Continue
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
            </Preview>
            <CodeBlock
              code={`<Button>
  <MailIcon data-icon="inline-start" />
  Email
</Button>

<Button variant="outline">
  Continue
  <ArrowRightIcon data-icon="inline-end" />
</Button>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="spinner">Spinner</h2>
            <p>
              Render a <code>Spinner</code> inside the button for a pending
              action. It takes the icon size of whatever button size it sits in,
              and takes <code>data-icon</code> like any other icon.
            </p>
            <Preview className="flex-wrap items-center gap-3">
              <Button disabled>
                <Spinner data-icon="inline-start" />
                Saving
              </Button>
              <Button size="sm" variant="outline" disabled>
                <Spinner data-icon="inline-start" />
                Saving
              </Button>
              <Button size="icon" variant="secondary" disabled aria-label="Saving">
                <Spinner />
              </Button>
            </Preview>
            <CodeBlock
              code={`<Button disabled>
  <Spinner data-icon="inline-start" />
  Saving
</Button>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="loading">Loading state</h2>
            <p>
              A button that disables itself on click loses focus, which drops the
              reader out of the flow. Pass <code>focusableWhenDisabled</code> to
              keep focus on it. Because some screen readers do not announce text
              changing inside a focused button, point{" "}
              <code>aria-labelledby</code> at the element whose text changes so it
              becomes the button&apos;s explicit accessible name.
            </p>
            <Preview>
              <LoadingButtonDemo />
            </Preview>
            <CodeBlock
              code={`const [loading, setLoading] = React.useState(false)
const labelId = React.useId()

<Button
  disabled={loading}
  focusableWhenDisabled
  aria-labelledby={labelId}
  onClick={() => setLoading(true)}
>
  {loading ? <Spinner data-icon="inline-start" /> : null}
  <span id={labelId}>{loading ? "Submitting" : "Submit"}</span>
</Button>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="group">Button group</h2>
            <p>
              <code>ButtonGroup</code> joins buttons into one control: the outer
              ends keep the pill radius, the inner edges square off.
            </p>
            <Preview className="flex-wrap items-center gap-6">
              <ButtonGroup>
                <Button variant="outline">Day</Button>
                <Button variant="outline">Week</Button>
                <Button variant="outline">Month</Button>
              </ButtonGroup>
              <ButtonGroup orientation="vertical">
                <Button variant="outline" size="sm">
                  Top
                </Button>
                <Button variant="outline" size="sm">
                  Middle
                </Button>
                <Button variant="outline" size="sm">
                  Bottom
                </Button>
              </ButtonGroup>
            </Preview>
            <CodeBlock
              code={`<ButtonGroup>
  <Button variant="outline">Day</Button>
  <Button variant="outline">Week</Button>
  <Button variant="outline">Month</Button>
</ButtonGroup>

<ButtonGroup orientation="vertical">
  <Button variant="outline">Top</Button>
  <Button variant="outline">Bottom</Button>
</ButtonGroup>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="render">Rendering as another tag</h2>
            <p>
              <code>render</code> swaps the underlying tag while keeping button
              semantics — <code>role=&quot;button&quot;</code>, keyboard
              activation and the disabled state. Base UI needs{" "}
              <code>nativeButton=&#123;false&#125;</code> whenever the rendered
              tag is not a <code>button</code>; the Lumen wrapper infers it, so
              passing <code>render</code> is enough.
            </p>
            <Preview>
              <Button render={<div />}>Rendered as a div</Button>
            </Preview>
            <CodeBlock
              code={`// Lumen infers nativeButton={false} from the render prop
<Button render={<div />}>Rendered as a div</Button>

// explicit, and equivalent
<Button render={<div />} nativeButton={false}>
  Rendered as a div
</Button>`}
            />
            <p>
              <code>type=&quot;submit&quot;</code> is not implied the way it is on
              a native button: set it explicitly to submit a form.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="as-link">As link</h2>
            <p>
              Do not render a link through <code>render</code>. Button always
              applies <code>role=&quot;button&quot;</code>, which overrides the
              link role and costs the reader the link behaviours they expect.
              Style the anchor with <code>buttonVariants</code> instead.
            </p>
            <Preview className="flex-wrap items-center gap-3">
              <Link href="/docs" className={buttonVariants()}>
                Documentation
              </Link>
              <Link
                href="/docs/installation"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Installation
              </Link>
            </Preview>
            <CodeBlock
              code={`import { buttonVariants } from "@/components/ui/button-variants"

<Link href="/docs" className={buttonVariants()}>
  Documentation
</Link>

<Link
  href="/docs/installation"
  className={buttonVariants({ variant: "outline", size: "sm" })}
>
  Installation
</Link>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="shape">Shape</h2>
            <p>
              Lumen buttons are pills by default. Override the radius with a
              class when a square corner suits the surface better.
            </p>
            <Preview className="flex-wrap items-center gap-3">
              <Button>Pill</Button>
              <Button className="rounded-2xl">Rounded</Button>
              <Button className="rounded-sm">Square</Button>
            </Preview>
            <CodeBlock code={`<Button className="rounded-sm">Square</Button>`} />
          </section>

          <section className="space-y-4">
            <h2 id="cursor">Cursor</h2>
            <p>
              Tailwind v4 ships buttons with <code>cursor: default</code>. Lumen
              restores the pointer globally in <code>globals.css</code>, so you do
              not need to add it per button.
            </p>
            <CodeBlock
              language="css"
              code={`@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="rtl">RTL</h2>
            <p>
              The icon padding uses logical properties, so{" "}
              <code>inline-start</code> and <code>inline-end</code> follow the
              text direction: under <code>dir=&quot;rtl&quot;</code> an{" "}
              <code>inline-end</code> icon moves to the left, with its tightened
              padding.
            </p>
            <div
              dir="rtl"
              className="flex flex-wrap items-center gap-3 rounded-2xl border border-foreground/5 p-6 dark:border-foreground/10"
            >
              <Button>
                <MailIcon data-icon="inline-start" />
                بريد
              </Button>
              <Button variant="outline">
                متابعة
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
            </div>
          </section>
        </>
      }
    />
  )
}
