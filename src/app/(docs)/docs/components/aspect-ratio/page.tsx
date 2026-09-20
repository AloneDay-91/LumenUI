import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Preview } from "@/components/docs/Preview"
import { Logo } from "@/components/Logo"
import { AspectRatio } from "@/components/ui/AspectRatio"

function Frame({
  ratio,
  label,
}: {
  ratio: number
  label: string
}) {
  return (
    <AspectRatio
      ratio={ratio}
      className="rounded-2xl bg-foreground text-background"
    >
      <div className="relative size-full">
        <Logo className="absolute -right-5 -bottom-7 size-[80%] text-background/15" />
        <p className="absolute bottom-3 left-3 font-mono text-[11px] tracking-wide">
          {label}
        </p>
      </div>
    </AspectRatio>
  )
}

export default function AspectRatioPage() {
  return (
    <ComponentDocs
      name="Aspect Ratio"
      description="A frame locked to a ratio. Media covers; everything else is clipped."
      preview={
        <div className="w-full max-w-sm">
          <Frame ratio={16 / 9} label="16 / 9" />
        </div>
      }
      usage={`import { AspectRatio } from "@/components/ui/AspectRatio"

<AspectRatio ratio={16 / 9} className="rounded-2xl">
  <img src="/cover.jpg" alt="" />
</AspectRatio>`}
      extraHeadings={[{ id: "ratios", text: "Ratios", level: 2 }]}
      extra={
        <section className="space-y-4">
          <h2 id="ratios">Ratios</h2>
          <p>
            <code>ratio</code> is width divided by height. Same child, three
            frames — the mark is cropped by the box.
          </p>
          <Preview className="items-end gap-8">
            <div className="w-28">
              <Frame ratio={1} label="1 / 1" />
            </div>
            <div className="w-36">
              <Frame ratio={4 / 3} label="4 / 3" />
            </div>
            <div className="w-48">
              <Frame ratio={16 / 9} label="16 / 9" />
            </div>
          </Preview>
          <CodeBlock
            code={`<AspectRatio ratio={1} />
<AspectRatio ratio={4 / 3} />
<AspectRatio ratio={16 / 9} />`}
          />
        </section>
      }
    />
  )
}
