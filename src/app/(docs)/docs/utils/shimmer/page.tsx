import { CodeBlock } from "@/components/docs/CodeBlock"
import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { PageIntro, Preview } from "@/components/docs/Preview"
import { Spinner } from "@/components/ui/Spinner"

const classes: [string, string][] = [
  ["shimmer", "A band of light sweeps across the text, on a loop."],
  ["shimmer-once", "One sweep, then the text rests. A reveal when streaming ends."],
  ["shimmer-reverse", "Sweep the other way."],
  ["shimmer-none", "Plain text again, in any class order."],
  ["shimmer-color-<color>", "Band colour from the theme, with an optional /opacity."],
  ["shimmer-color-[<value>]", "Any colour."],
  ["shimmer-duration-<number>", "One sweep in milliseconds. 2000 by default."],
  ["shimmer-spread-<number>", "Band width on the spacing scale. 3ch + 40px by default."],
  ["shimmer-angle-<number>", "Tilt of the band in degrees. 20 by default."],
]

function Sample({ className, label }: { className: string; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <p className={`m-0 text-sm text-muted-foreground ${className}`}>Generating response…</p>
      {label ? <code className="text-[11px]">{label}</code> : null}
    </div>
  )
}

export default function ShimmerPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "shimmer", text: "shimmer", level: 1 },
          { id: "usage", text: "Usage", level: 2 },
          { id: "classes", text: "Classes", level: 2 },
          { id: "status", text: "With a status", level: 2 },
          { id: "options", text: "Colour, speed, and shape", level: 2 },
          { id: "how", text: "How it works", level: 2 },
        ]}
      />
      <div className="space-y-12">
        <PageIntro
          title="shimmer"
          description="A band of light that sweeps across text while something works. Built on the text colour, so it fits any colour and brightens in dark mode. Pure CSS."
        />
        <Preview>
          <Sample className="shimmer" />
        </Preview>

        <section className="space-y-4">
          <h2 id="usage">Usage</h2>
          <p>
            Add <code>shimmer</code> to the text. It is in the Lumen stylesheet that{" "}
            <code>lumenui init</code> writes. Trace, Reasoning, Tool, and every agent
            step use it on their label while they run.
          </p>
          <CodeBlock code={`<p className="shimmer text-muted-foreground">Generating response…</p>`} />
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
          <h2 id="status">With a status</h2>
          <p>
            Pair it with a Spinner in a live region. The Spinner says something is
            happening; the shimmer keeps the words alive without moving them.
          </p>
          <Preview>
            <div role="status" className="flex items-center gap-2 text-xs text-muted-foreground">
              <Spinner role={undefined} aria-label={undefined} aria-hidden className="size-3.5" />
              <span className="shimmer">Reading 4 files…</span>
            </div>
          </Preview>
          <CodeBlock
            code={`<div role="status" className="flex items-center gap-2">
  <Spinner aria-hidden />
  <span className="shimmer">Reading 4 files…</span>
</div>`}
          />
        </section>

        <section className="space-y-4">
          <h2 id="options">Colour, speed, and shape</h2>
          <Preview className="grid grid-cols-2 gap-6">
            <Sample className="shimmer shimmer-color-indigo-solid" label="shimmer-color-indigo-solid" />
            <Sample className="shimmer shimmer-duration-1000" label="shimmer-duration-1000" />
            <Sample className="shimmer shimmer-spread-24" label="shimmer-spread-24" />
            <Sample className="shimmer shimmer-angle-45" label="shimmer-angle-45" />
          </Preview>
          <CodeBlock
            code={`<p className="shimmer shimmer-color-indigo-solid">…</p>
<p className="shimmer shimmer-color-crimson-ink/60">…</p>
<p className="shimmer shimmer-duration-1000">…</p>
<p className="shimmer shimmer-spread-24">…</p>
<p className="shimmer shimmer-angle-45">…</p>
<p className="shimmer md:shimmer-none">…</p>`}
          />
        </section>

        <section className="space-y-4">
          <h2 id="how">How it works</h2>
          <p>
            The text is painted with <code>background-clip: text</code>. The band is
            the current colour lifted in lightness with relative colour syntax, so
            muted text gets a soft band and ink gets a bright one, in both themes.
            The sweep follows the reading direction, right to left in RTL. Under{" "}
            <code>prefers-reduced-motion</code> the animation stops and the text
            renders normally. Browsers without relative colours get no band; wrap it
            in <code>supports-[color:oklch(from_white_l_c_h)]:shimmer</code> if you
            target them.
          </p>
        </section>
      </div>
    </>
  )
}
