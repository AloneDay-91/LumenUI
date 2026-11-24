import { PAINTING } from "@/components/blocks/lumen/brand";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card"

const points = [
  {
    title: "Init sets the project up",
    body: "It writes lumen.json, the token sheet, and cn(). One command, then the app can take a component.",
  },
  {
    title: "Add copies one component",
    body: "add button writes Button.tsx and its variants. Dialog also brings the shared popup styles.",
  },
  {
    title: "Packages land with the file",
    body: "Base UI and the other dependencies are added to package.json. You do not install a Lumen package.",
  },
  {
    title: "Remove it the same way",
    body: "rm deletes the component. Shared files stay while something in the repo still imports them.",
  },
];

const tree = [
  { name: "lumen.json", indent: false, tag: "new" },
  { name: "src/app/globals.css", indent: false, tag: "tokens" },
  { name: "src/lib/", indent: false, muted: true },
  { name: "utils.ts", indent: true, tag: "cn()" },
  { name: "src/components/ui/", indent: false, muted: true },
  { name: "Button.tsx", indent: true, tag: "new" },
  { name: "button-variants.ts", indent: true, tag: "new" },
  { name: "Dialog.tsx", indent: true, tag: "new" },
  { name: "styles.ts", indent: true, tag: "new" },
];

function PaintBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-70 dark:opacity-40"
      style={{ backgroundImage: `url(${PAINTING})` }}
    />
  );
}

export function CliFeature() {
  return (
    <section className="grid w-full items-center gap-10 px-6 py-12 lg:grid-cols-12 lg:gap-16">
      <div className="flex flex-col gap-5 lg:col-span-5">
        <div>
          <h2 className="max-w-xl font-heading text-2xl leading-tight font-normal tracking-[-0.02em] text-balance md:text-[1.875rem] md:leading-[1.25]">
            The CLI writes the file you edit.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Init prepares the tokens. Add copies a component when you need it.
            The source is yours, so a change is a commit in your repo, not a
            version bump of a package.
          </p>
        </div>
        <ul className="mt-2 flex max-w-md flex-col border-t border-border">
          {points.map((point) => (
            <li key={point.title} className="flex flex-col gap-0.5 border-b border-border py-4 last:border-b-0">
              <span className="text-sm font-medium">{point.title}</span>
              <span className="text-sm leading-relaxed text-muted-foreground">
                {point.body}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Card className="relative min-w-0 gap-0 overflow-hidden rounded-3xl p-5 sm:p-8 lg:col-span-7">
        <PaintBackdrop />
        <div className="relative flex flex-col gap-4 rounded-[20px] border border-border bg-background p-5 font-mono text-xs leading-[1.7] shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col gap-1 overflow-x-auto whitespace-nowrap">
            <p>
              <span className="text-muted-foreground">$</span> npx
              @aloneday/lumenui@latest init
            </p>
            <p>
              <span className="text-muted-foreground">$</span> npx
              @aloneday/lumenui@latest add button dialog
              <span
                aria-hidden
                className="ms-1 inline-block h-3.5 w-1.5 translate-y-0.5 bg-foreground motion-safe:animate-[lumen-blink_1.1s_steps(1)_infinite]"
              />
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
      </Card>
    </section>
  );
}
