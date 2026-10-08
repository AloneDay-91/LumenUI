import { Link2, Plus, SquareStack } from "lucide-react";

import { PANEL_RADIUS } from "@/components/marketing/FeatureIntro";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/Item";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";

const addable = [
  { name: "Button", description: "Triggers an action. Six variants." },
  { name: "Dialog", description: "A modal with focus management." },
];

export function FeatureForms() {
  return (
    <section className="reveal mt-24 md:mt-32">
      <div
        className={cn(
          "grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2",
          PANEL_RADIUS,
        )}
      >
        <div className="flex flex-col items-center bg-background px-7 pt-12 pb-10">
          <div className="flex h-58 w-full items-center justify-center">
            <div className="flex w-full max-w-70 flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="landing-email">Work email</Label>
                <Input
                  id="landing-email"
                  type="email"
                  defaultValue="elouan@lumenui.fr"
                  aria-invalid
                />
                <p className="text-xs text-destructive">
                  Enter a full address, like name@studio.fr.
                </p>
              </div>
              <div className="flex gap-2">
                <Button type="button">Save changes</Button>
                <Button type="button" variant="secondary" disabled>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-sm font-medium">
              Forms with every state built in
            </h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Field, Input, and Select share one focus ring, one invalid style,
              and one disabled style.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center bg-background px-7 pt-12 pb-10">
          <div className="flex h-58 w-full items-center justify-center">
            <div className="w-full max-w-80 overflow-hidden rounded-[20px] bg-muted ring-1 ring-border">
              <div className="flex h-9 items-center gap-1.5 px-3.5 text-xs font-medium">
                <Link2 className="size-3.5" aria-hidden />
                Add components
              </div>
              <ItemGroup className="rounded-[20px] bg-background px-3 py-1.5 ring-1 ring-border">
                {addable.map((component, index) => (
                  <div key={component.name}>
                    {index > 0 ? (
                      <ItemSeparator className="my-0 border-dashed" />
                    ) : null}
                    <Item className="px-0">
                      <ItemMedia variant="icon">
                        <SquareStack />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{component.name}</ItemTitle>
                        <ItemDescription className="truncate">
                          {component.description}
                        </ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-sm"
                          aria-label={`Add ${component.name}`}
                        >
                          <Plus />
                        </Button>
                      </ItemActions>
                    </Item>
                  </div>
                ))}
              </ItemGroup>
            </div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-sm font-medium">Lists that compose</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Item rows combine media, text, and actions without any custom
              layout.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
