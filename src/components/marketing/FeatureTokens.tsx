import type { ReactNode } from "react";

import { StackMark } from "@/components/marketing/StackMarks";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { ToggleGroup } from "@/components/ui/ToggleGroup";
import { COMPAT } from "@/lib/site";
import { cn } from "@/lib/utils";

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
        dark ? "dark" : "light",
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
        <div className="bg-background md:pe-10">
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

        <div className="bg-background md:ps-10">
          <h3 className="text-lg font-medium tracking-tight">
            Compatible with the stack you already ship
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            React for the tree, Tailwind for the styles, Base UI for behavior.
            The CLI does not add a component package on top.
          </p>
          <Stack>
            <ul className="flex flex-col gap-4">
              {COMPAT.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-border">
                    <StackMark id={item.id} className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-baseline gap-2 text-sm font-medium">
                      {item.name}
                      <span className="font-mono text-xs font-normal text-muted-foreground">
                        {item.version}
                      </span>
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                      {item.body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Stack>
        </div>
      </div>
    </section>
  );
}
