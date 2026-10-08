import { Keyboard, Layers, Moon, SquareStack } from "lucide-react";
import type { ReactNode } from "react";

import { PANEL_RADIUS } from "@/components/marketing/FeatureIntro";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { ToggleGroup } from "@/components/ui/ToggleGroup";
import { cn } from "@/lib/utils";

const highlights = [
  {
    icon: SquareStack,
    title: "Copy-paste",
    body: "You copy the file. It lives in your repo, with no package to version.",
  },
  {
    icon: Layers,
    title: "Base UI",
    body: "Focus, keyboard, and portals come from the primitives.",
  },
  {
    icon: Keyboard,
    title: "Keyboard first",
    body: "Visible focus and native composition on every control.",
  },
  {
    icon: Moon,
    title: "Light and dark",
    body: "One set of tokens, two themes, no interactive blue.",
  },
];

/** Two cards peeking out behind the main one, fading out at the bottom. */
function Stack({ children }: { children: ReactNode }) {
  return (
    <div className="relative mt-7 pt-2.5">
      <div
        aria-hidden
        className="absolute inset-x-6 top-0 h-8 rounded-t-3xl border border-b-0 border-border bg-background"
      />
      <div
        aria-hidden
        className="absolute inset-x-3 top-1.25 h-8 rounded-t-3xl border border-b-0 border-border bg-background"
      />
      <div className="relative rounded-t-3xl border border-b-0 border-border bg-background p-5 mask-[linear-gradient(to_bottom,black_70%,transparent)]">
        {children}
        <div className="h-10" aria-hidden />
      </div>
    </div>
  );
}

function ThemeCard({ dark }: { dark?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-background p-3 text-foreground ring-1 ring-border",
        dark && "dark",
      )}
    >
      <Card size="sm" className="gap-3 py-3">
        <CardHeader className="px-3.5">
          <CardTitle>Invite a teammate</CardTitle>
          <CardDescription>{dark ? "Dark" : "Light"} tokens</CardDescription>
        </CardHeader>
        <CardContent className="px-3.5">
          <Button size="xs" type="button">
            Send
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function FeatureTokens() {
  return (
    <section className="reveal mt-24 md:mt-32">
      <div className="grid gap-px bg-border md:grid-cols-2">
        <div className="bg-background pb-10 md:pe-10">
          <h3 className="text-lg font-medium tracking-tight">
            Light and dark from one set of tokens
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Swap one class on the root and every component follows. Cards move
            to oklch(0.205) and borders become white at 10%.
          </p>
          <Stack>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium">Appearance</span>
              <ToggleGroup defaultValue={["dark"]} aria-label="Appearance">
                <Toggle value="light">Light</Toggle>
                <Toggle value="dark">Dark</Toggle>
                <Toggle value="system">System</Toggle>
              </ToggleGroup>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ThemeCard />
              <ThemeCard dark />
            </div>
          </Stack>
        </div>

        <div className="bg-background pb-10 md:ps-10">
          <h3 className="text-lg font-medium tracking-tight">
            Meters that read at a glance
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Meter and Progress share one rounded track. Segment it for quotas,
            budgets, and limits.
          </p>
          <Stack>
            <p className="text-sm font-medium">Repo size</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Files copied by the CLI, by type
            </p>
            <div className="mt-4 flex h-5 overflow-hidden rounded-full bg-[repeating-linear-gradient(90deg,var(--border)_0_1px,transparent_1px_4px)]">
              <span className="w-1/4 bg-foreground" />
              <span className="w-[15%] bg-muted-foreground" />
            </div>
            <div className="mt-4 flex gap-12">
              <div>
                <p className="text-lg font-medium">40%</p>
                <p className="text-xs text-muted-foreground">Used</p>
              </div>
              <div>
                <p className="text-lg font-medium">60%</p>
                <p className="text-xs text-muted-foreground">Free</p>
              </div>
            </div>
            <ul className="mt-4 flex flex-col gap-1.5 border-t border-dashed border-border pt-3 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-foreground" />
                Components (25%)
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-muted-foreground" />
                Tokens (15%)
              </li>
            </ul>
          </Stack>
        </div>
      </div>

      <ul className="grid gap-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item) => (
          <li key={item.title} className="flex flex-col gap-2.5">
            <span className="inline-flex items-center gap-2 text-sm font-medium">
              <item.icon className="size-4 shrink-0" aria-hidden />
              {item.title}
            </span>
            <span className="text-sm leading-relaxed text-muted-foreground">
              {item.body}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
