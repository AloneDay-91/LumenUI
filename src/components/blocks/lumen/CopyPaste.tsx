import { Badge } from "@/components/ui/Badge"
import { Separator } from "@/components/ui/Separator"
import { cn } from "@/lib/utils"

const points = [
  { title: "Local files come with it", body: "Button brings its variants. Dialog brings the shared popup styles." },
  { title: "Packages install themselves", body: "Base UI, class-variance-authority, and the rest land in package.json." },
  { title: "The stylesheet comes with it", body: "globals.css, Tailwind, and the PostCSS config are written with init and add." },
  { title: "Remove it the same way", body: "rm deletes the component. Shared files stay while something still imports them." },
]

const tree = [
  { name: "lumen.json", indent: false, tag: "new" },
  { name: "src/app/globals.css", indent: false, tag: "tokens" },
  { name: "src/lib/", indent: false, muted: true },
  { name: "utils.ts", indent: true, tag: "cn()" },
  { name: "src/components/ui/", indent: false, muted: true },
  { name: "Button.tsx", indent: true, tag: "new" },
  { name: "button-variants.ts", indent: true, tag: "new" },
]

export function CopyPaste() {
  return (
    <section className="grid w-full items-start gap-10 px-6 py-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <Badge variant="outline">Copy-paste</Badge>
        <h2 className="mt-4 max-w-md text-2xl leading-tight font-medium tracking-tight md:text-3xl">
          Add a component. Own the file.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          The CLI writes the source into your repo. It does not install a component package, so there is
          nothing to version and nothing to fork.
        </p>
        <ul className="mt-7 max-w-md divide-y divide-border border-y border-border">
          {points.map((point) => (
            <li key={point.title} className="flex flex-col gap-0.5 py-3.5">
              <span className="text-sm font-medium">{point.title}</span>
              <span className="text-sm leading-relaxed text-muted-foreground">{point.body}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="min-w-0 rounded-[min(var(--radius-4xl),24px)] bg-muted p-4 md:p-8">
        <div className="flex flex-col gap-4 rounded-2xl bg-background p-5 font-mono text-xs leading-[1.7] ring-1 ring-border">
          <div className="flex flex-col gap-1">
            <p>
              <span className="text-muted-foreground">$</span> npx @aloneday/lumenui@latest init
            </p>
            <p>
              <span className="text-muted-foreground">$</span> npx @aloneday/lumenui@latest add button dialog
            </p>
          </div>
          <Separator />
          <ul className="flex flex-col">
            {tree.map((file) => (
              <li
                key={file.name}
                className={cn(
                  "flex min-h-6 items-center justify-between gap-3",
                  file.indent && "ps-4",
                  file.muted && "text-muted-foreground",
                )}
              >
                <span>{file.name}</span>
                {file.tag ? (
                  <Badge variant="secondary" className="h-4.5 px-1.5 text-[10px]">
                    {file.tag}
                  </Badge>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
