import { FeatureIntro, PANEL_RADIUS } from "@/components/marketing/FeatureIntro";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import { cn } from "@/lib/utils";

const points = [
  {
    title: "Local files come with it",
    body: "Button brings its variants. Dialog brings the shared popup styles.",
  },
  {
    title: "Packages install themselves",
    body: "Base UI, class-variance-authority, and the rest land in package.json.",
  },
  {
    title: "Remove it the same way",
    body: "rm deletes the component. Shared files stay while something still imports them.",
  },
];

const tree = [
  { name: "lumen.json", indent: false, tag: "new" },
  { name: "src/lib/", indent: false, muted: true },
  { name: "utils.ts", indent: true, tag: "cn()" },
  { name: "src/components/ui/", indent: false, muted: true },
  { name: "Button.tsx", indent: true, tag: "new" },
  { name: "button-variants.ts", indent: true, tag: "new" },
  { name: "Dialog.tsx", indent: true, tag: "new" },
  { name: "styles.ts", indent: true, tag: "new" },
];

export function FeatureCli() {
  return (
    <section
      id="copy"
      className="reveal mt-24 grid grid-cols-1 items-center gap-10 md:mt-32 lg:grid-cols-2 lg:gap-16"
    >
      <div>
        <FeatureIntro label="Copy-paste" title="Add a component. Own the file.">
          The CLI writes the source into your repo. It does not install a
          component package, so there is nothing to version and nothing to
          fork.
        </FeatureIntro>
        <ul className="mt-7 max-w-md divide-y divide-border border-y border-border">
          {points.map((point) => (
            <li key={point.title} className="flex flex-col gap-0.5 py-3.5">
              <span className="text-sm font-medium">{point.title}</span>
              <span className="text-sm leading-relaxed text-muted-foreground">
                {point.body}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={cn("min-w-0 bg-muted p-4 md:p-8", PANEL_RADIUS)}>
        <div className="flex flex-col gap-4 rounded-2xl bg-background p-5 font-mono text-xs leading-[1.7] ring-1 ring-border">
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
      </div>
    </section>
  );
}
