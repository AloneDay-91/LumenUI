import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Badge } from "@/components/ui/Badge"
import { Marquee } from "@/components/ui/Marquee"

const names = ["Acme", "Globex", "Initech", "Umbrella", "Hooli", "Stark", "Wayne", "Soylent"]

function Logo({ name }: { name: string }) {
  return (
    <span className="font-serif text-lg font-medium whitespace-nowrap text-muted-foreground">
      {name}
    </span>
  )
}

export default function MarqueePage() {
  return (
    <ComponentDocs
      name="Marquee"
      description="Children scroll on a loop, for logos and testimonials. Pauses on hover, stops under reduced motion, fades at the edges."
      preview={
        <Marquee className="w-full" aria-label="Customers">
          {names.map((name) => (
            <Logo key={name} name={name} />
          ))}
        </Marquee>
      }
      usage={`import { Marquee } from "@/components/ui/Marquee"

<Marquee aria-label="Customers">
  {logos.map((logo) => <Logo key={logo.name} {...logo} />)}
</Marquee>`}
      extraHeadings={[
        { id: "options", text: "Speed and direction", level: 2 },
        { id: "vertical", text: "Vertical", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="options">Speed and direction</h2>
            <p>
              <code>duration</code> is the seconds for one loop, <code>gap</code>{" "}
              the space between items, <code>reverse</code> flips the direction.
              Give it enough children to fill the width at least once, or a gap
              shows before the loop.
            </p>
            <div className="w-full space-y-3">
              <Marquee duration={20}>
                {["Button", "Dialog", "Tabs", "Select", "Toast", "Tooltip", "Calendar", "Chart"].map((name) => (
                  <Badge key={name} variant="secondary">
                    {name}
                  </Badge>
                ))}
              </Marquee>
              <Marquee duration={25} reverse>
                {["Banner", "Stat", "Tree View", "Data Table", "Tag Input", "Resizable", "Tour", "Marquee"].map((name) => (
                  <Badge key={name} color="indigo">
                    {name}
                  </Badge>
                ))}
              </Marquee>
            </div>
            <CodeBlock
              code={`<Marquee duration={20}>…</Marquee>
<Marquee duration={25} reverse>…</Marquee>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="vertical">Vertical</h2>
            <div className="h-40 w-full">
              <Marquee orientation="vertical" duration={15} gap="0.75rem" className="h-full">
                {["“Shipped our settings page in a day.”", "“The tokens just work in dark mode.”", "“Finally, a CLI that keeps my edits.”", "“The docs answer before I ask.”"].map((quote) => (
                  <p key={quote} className="m-0 text-center text-sm">
                    {quote}
                  </p>
                ))}
              </Marquee>
            </div>
            <CodeBlock code={`<Marquee orientation="vertical" className="h-40">…</Marquee>`} />
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              The second copy that makes the loop seamless is{" "}
              <code>aria-hidden</code> and <code>inert</code>, so screen readers
              read each item once and links are tabbed once. Motion that runs more
              than five seconds needs a way to stop it (WCAG 2.2.2): a pause button
              appears on hover and focus, and the scroll stops entirely under
              reduced motion.
            </p>
          </section>
        </>
      }
    />
  )
}
