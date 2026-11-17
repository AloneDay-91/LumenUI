import Link from "next/link"
import { SparklesIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import {
  Banner,
  BannerAction,
  BannerClose,
  BannerContent,
  BannerDescription,
  BannerIndicator,
  BannerTitle,
} from "@/components/ui/Banner"

const frame =
  "w-full overflow-hidden rounded-2xl bg-background ring-1 ring-foreground/5 dark:ring-foreground/10"

export default function BannerPage() {
  return (
    <ComponentDocs
      name="Banner"
      description="Announcement bar for the top of a page, or a floating pill above the content. Neutral surface, hued dot, one line."
      preview={
        <div className={frame}>
          <Banner variant="new">
            <BannerIndicator />
            <BannerContent>
              <BannerTitle>Lumen 1.1 is out</BannerTitle>
              <BannerDescription>thirteen new components and status toasts.</BannerDescription>
            </BannerContent>
            <BannerAction render={<Link href="/docs/changelog" />}>Changelog</BannerAction>
            <BannerClose />
          </Banner>
          <div className="h-20" />
        </div>
      }
      usage={`import {
  Banner,
  BannerAction,
  BannerClose,
  BannerContent,
  BannerDescription,
  BannerIndicator,
  BannerTitle,
} from "@/components/ui/Banner"

<Banner variant="new">
  <BannerIndicator />
  <BannerContent>
    <BannerTitle>Lumen 1.1 is out</BannerTitle>
    <BannerDescription>thirteen new components and status toasts.</BannerDescription>
  </BannerContent>
  <BannerAction render={<Link href="/docs/changelog" />}>Changelog</BannerAction>
  <BannerClose />
</Banner>`}
      extraHeadings={[
        { id: "composition", text: "Composition", level: 2 },
        { id: "variants", text: "Variants", level: 2 },
        { id: "floating", text: "Floating", level: 2 },
        { id: "icon", text: "Icon", level: 2 },
        { id: "persist", text: "Remember the dismiss", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="composition">Composition</h2>
            <CodeBlock
              language="text"
              code={`Banner
├── BannerIndicator
├── BannerContent
│   ├── BannerTitle
│   └── BannerDescription
├── BannerAction
└── BannerClose`}
            />
            <p>
              The message stays on one line and truncates. The description hides
              below <code>sm</code>, so a phone shows the title and the action
              only.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="variants">Variants</h2>
            <p>
              The surface is the same for every variant: ink on paper, like the
              rest of the chrome. <code>variant</code> only colours the dot, with
              the hues Badge, Callout, and Alert share.
            </p>
            <div className={frame}>
              <Banner>
                <BannerIndicator />
                <BannerContent><BannerTitle>Docs moved</BannerTitle><BannerDescription>old links redirect for 90 days.</BannerDescription></BannerContent>
              </Banner>
              <Banner variant="info">
                <BannerIndicator />
                <BannerContent><BannerTitle>Maintenance on Sunday</BannerTitle><BannerDescription>02:00 to 03:00 UTC.</BannerDescription></BannerContent>
              </Banner>
              <Banner variant="success">
                <BannerIndicator />
                <BannerContent><BannerTitle>Migration complete</BannerTitle><BannerDescription>every project is on the new runtime.</BannerDescription></BannerContent>
              </Banner>
              <Banner variant="warning">
                <BannerIndicator />
                <BannerContent><BannerTitle>Trial ends in 3 days</BannerTitle></BannerContent>
                <BannerAction href="#variants">Upgrade</BannerAction>
              </Banner>
              <Banner variant="destructive" className="border-b-0">
                <BannerIndicator />
                <BannerContent><BannerTitle>Deploys are paused</BannerTitle><BannerDescription>we are investigating.</BannerDescription></BannerContent>
                <BannerAction href="#variants">Status</BannerAction>
              </Banner>
            </div>
            <CodeBlock
              code={`<Banner variant="info">…</Banner>
<Banner variant="success">…</Banner>
<Banner variant="warning">…</Banner>
<Banner variant="destructive">…</Banner>
<Banner variant="new">…</Banner>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="floating">Floating</h2>
            <p>
              <code>appearance=&quot;floating&quot;</code> draws a pill above the
              content, like a toast that stays. The action becomes a small
              secondary pill and the close button sits inline.
            </p>
            <div className={`${frame} bg-muted/40 py-6`}>
              <Banner appearance="floating" variant="new">
                <BannerIndicator />
                <BannerContent>
                  <BannerTitle>Blocks are here</BannerTitle>
                  <BannerDescription>headers, heroes, and footers.</BannerDescription>
                </BannerContent>
                <BannerAction render={<Link href="/blocks" />}>Browse</BannerAction>
                <BannerClose />
              </Banner>
            </div>
            <CodeBlock
              code={`<Banner appearance="floating" variant="new">
  <BannerIndicator />
  <BannerContent>
    <BannerTitle>Blocks are here</BannerTitle>
    <BannerDescription>headers, heroes, and footers.</BannerDescription>
  </BannerContent>
  <BannerAction render={<Link href="/blocks" />}>Browse</BannerAction>
  <BannerClose />
</Banner>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="icon">Icon</h2>
            <p>Children of <code>BannerIndicator</code> replace the dot.</p>
            <div className={frame}>
              <Banner className="border-b-0">
                <BannerIndicator>
                  <SparklesIcon />
                </BannerIndicator>
                <BannerContent><BannerTitle>Ask Lumen</BannerTitle><BannerDescription>answers from the docs, with sources.</BannerDescription></BannerContent>
              </Banner>
            </div>
            <CodeBlock
              code={`<BannerIndicator>
  <SparklesIcon />
</BannerIndicator>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="persist">Remember the dismiss</h2>
            <p>
              The Banner forgets a dismiss on reload. Control <code>open</code> and
              store the choice yourself to keep it closed.
            </p>
            <CodeBlock
              code={`const [open, setOpen] = React.useState(
  () => localStorage.getItem("banner-1.1") !== "closed"
)

<Banner
  open={open}
  onOpenChange={(next) => {
    setOpen(next)
    if (!next) localStorage.setItem("banner-1.1", "closed")
  }}
>
  …
</Banner>`}
            />
          </section>
        </>
      }
    />
  )
}
