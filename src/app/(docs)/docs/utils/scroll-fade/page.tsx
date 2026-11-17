import { CodeBlock } from "@/components/docs/CodeBlock"
import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { PageIntro, Preview } from "@/components/docs/Preview"

const items = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`)
const tags = ["Design", "Engineering", "Marketing", "Product", "Research", "Sales", "Support", "Operations", "Finance", "Legal"]

const classes: [string, string][] = [
  ["scroll-fade", "Both block edges. Same as scroll-fade-y."],
  ["scroll-fade-x", "Both inline edges, for horizontal scrollers. Follows the reading direction."],
  ["scroll-fade-t / -b", "Top or bottom edge only."],
  ["scroll-fade-s / -e", "Start or end inline edge only. Mirrors in RTL."],
  ["scroll-fade-l / -r", "Physical left or right edge only."],
  ["scroll-fade-<number>", "Fade depth on the spacing scale: scroll-fade-8 is 2rem."],
  ["scroll-fade-[<value>]", "Any length or percentage: scroll-fade-[15%]."],
  ["scroll-fade-{t,b,s,e}-<number>", "Depth of one edge, over the shared one."],
  ["scroll-fade-none", "No fade, in any class order."],
  ["[--scroll-fade-reveal:<length>]", "Scroll distance over which an edge fades in. 96px by default."],
]

function List({ className }: { className: string }) {
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-border bg-card">
      <ul className={`m-0 h-48 list-none overflow-y-auto p-2 ${className}`}>
        {items.map((item) => (
          <li key={item} className="rounded-lg px-3 py-2 text-xs">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ScrollFadePage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "scroll-fade", text: "scroll-fade", level: 1 },
          { id: "usage", text: "Usage", level: 2 },
          { id: "classes", text: "Classes", level: 2 },
          { id: "horizontal", text: "Horizontal", level: 2 },
          { id: "edges", text: "One edge", level: 2 },
          { id: "size", text: "Depth", level: 2 },
          { id: "how", text: "How it works", level: 2 },
        ]}
      />
      <div className="space-y-12">
        <PageIntro
          title="scroll-fade"
          description="Fades the edges of a scroll container as you scroll. The first edge is crisp at rest, both fade mid-scroll, the last sharpens at the end. Pure CSS."
        />
        <Preview>
          <List className="scroll-fade" />
        </Preview>

        <section className="space-y-4">
          <h2 id="usage">Usage</h2>
          <p>
            Put <code>scroll-fade</code> on the element that scrolls, the one with{" "}
            <code>overflow-y-auto</code>. It is in the Lumen stylesheet that{" "}
            <code>lumenui init</code> writes, so there is nothing to install. When
            the scroller sits in a card, keep the border and background on a
            wrapper: the mask dissolves the content, not the card.
          </p>
          <CodeBlock
            code={`<div className="rounded-2xl border bg-card">
  <ul className="scroll-fade h-48 overflow-y-auto">…</ul>
</div>`}
          />
          <p>
            A list that does not overflow shows no fade, so the class can go on
            every list without checking. Message Scroller uses it on its viewport.
          </p>
        </section>

        <section className="space-y-4">
          <h2 id="classes">Classes</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Effect</th>
                </tr>
              </thead>
              <tbody>
                {classes.map(([name, effect]) => (
                  <tr key={name}>
                    <td>
                      <code>{name}</code>
                    </td>
                    <td>{effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h2 id="horizontal">Horizontal</h2>
          <p>
            <code>scroll-fade-x</code> on an <code>overflow-x-auto</code> row. In a{" "}
            <code>dir=&quot;rtl&quot;</code> layout the crisp edge and the fade swap
            sides with no extra class.
          </p>
          <Preview>
            <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-border bg-card">
              <div className="flex scroll-fade-x gap-2 overflow-x-auto p-2">
                {tags.map((tag) => (
                  <span key={tag} className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Preview>
          <CodeBlock code={`<div className="flex scroll-fade-x overflow-x-auto">…</div>`} />
        </section>

        <section className="space-y-4">
          <h2 id="edges">One edge</h2>
          <p>
            <code>scroll-fade-b</code> keeps a hint that more is coming without
            fading the top, for a feed that starts at the top.{" "}
            <code>scroll-fade-t</code> does the opposite, for a log that starts at
            the bottom.
          </p>
          <Preview className="flex-nowrap gap-4">
            <List className="scroll-fade-t" />
            <List className="scroll-fade-b" />
          </Preview>
          <CodeBlock code={`<ul className="scroll-fade-b overflow-y-auto">…</ul>`} />
        </section>

        <section className="space-y-4">
          <h2 id="size">Depth</h2>
          <p>
            The fade is 12% of the container, capped at 40px. Set a depth on the
            spacing scale, an arbitrary value, or one per edge.
          </p>
          <Preview className="flex-nowrap gap-4">
            <List className="scroll-fade scroll-fade-4" />
            <List className="scroll-fade scroll-fade-24" />
          </Preview>
          <CodeBlock
            code={`<ul className="scroll-fade scroll-fade-24 overflow-y-auto">…</ul>
<ul className="scroll-fade scroll-fade-[15%] overflow-y-auto">…</ul>
<ul className="scroll-fade scroll-fade-t-2 scroll-fade-b-8 overflow-y-auto">…</ul>`}
          />
        </section>

        <section className="space-y-4">
          <h2 id="how">How it works</h2>
          <p>
            A <code>mask-image</code> gradient from transparent to black dissolves
            the content itself, so it works on any background. Each edge&apos;s
            depth is driven by a scroll-driven animation over the first and last
            96px of scroll: no JavaScript, no scroll listener. Browsers without
            scroll-driven animations get a static fade on the chosen edges. The
            mask also fades a visible scrollbar at the edges.
          </p>
        </section>
      </div>
    </>
  )
}
