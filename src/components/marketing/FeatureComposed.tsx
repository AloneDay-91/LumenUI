"use client";

import { CalendarIcon, SparklesIcon } from "lucide-react";

import { FEATURE_TITLE, PANEL_RADIUS } from "@/components/marketing/FeatureIntro";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import { Input } from "@/components/ui/Input";
import { Kbd, KbdGroup } from "@/components/ui/Kbd";
import { menuItemClassName, popupClassName } from "@/components/ui/styles";
import { cn } from "@/lib/utils";

const suggestions = [
  "…a dialog to my project?",
  "…the Stepper component?",
  "…a dark mode toggle?",
];

function Caption({ name, children }: { name: string; children: string }) {
  return (
    <p className="text-sm leading-relaxed text-muted-foreground">
      <span className="font-medium text-foreground">{name}</span> {children}
    </p>
  );
}

export function FeatureComposed() {
  return (
    <section className="reveal mt-24 md:mt-32">
      <h2 className={cn("mb-10 max-w-lg", FEATURE_TITLE)}>
        Composed, not assembled
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-5">
          <div
            className={cn(
              "flex min-h-95 items-center justify-center border border-border p-6 transition-colors hover:border-foreground/25",
              PANEL_RADIUS,
            )}
          >
            <div className="flex w-full max-w-75 flex-col gap-2">
              <Input
                aria-label="Ask a question"
                defaultValue="How do I add"
                readOnly
              />
              <div className={cn(popupClassName, "overflow-hidden p-0")}>
                <div className="flex h-8 items-center gap-2 bg-muted px-3 text-xs font-medium">
                  <SparklesIcon className="size-3.5" aria-hidden />
                  Suggestions
                </div>
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={suggestion}
                      className={cn(
                        menuItemClassName,
                        "min-h-9 rounded-none border-t border-border px-3",
                        index === 0
                          ? "bg-muted"
                          : "text-muted-foreground",
                      )}
                    >
                      {suggestion}
                      {index === 0 ? (
                        <Kbd size="sm" variant="outline" className="ms-auto">
                          Tab
                        </Kbd>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between px-1 pt-1 text-xs text-muted-foreground">
                3 suggestions
                <KbdGroup size="sm">
                  <Kbd size="sm">↑</Kbd>
                  <Kbd size="sm">↓</Kbd>
                  to navigate
                </KbdGroup>
              </div>
            </div>
          </div>
          <Caption name="Autocomplete and Combobox">
            filter as you type, with arrow-key navigation and a visible
            highlight.
          </Caption>
        </div>

        <div className="flex flex-col gap-5">
          <div
            className={cn(
              "flex min-h-95 items-center justify-center border border-border p-6 transition-colors hover:border-foreground/25",
              PANEL_RADIUS,
            )}
          >
            <div className="flex flex-col items-start gap-2">
              <Button
                type="button"
                variant="outline"
                className="min-w-52 justify-start font-normal"
              >
                <CalendarIcon />
                Oct 12, 2026
              </Button>
              <div className={cn(popupClassName, "p-3")}>
                <Calendar
                  mode="single"
                  defaultMonth={new Date(2026, 9, 1)}
                  selected={new Date(2026, 9, 12)}
                />
              </div>
            </div>
          </div>
          <Caption name="Date picker">
            pairs a popover with a calendar. Single dates or ranges, one shared
            style.
          </Caption>
        </div>
      </div>
    </section>
  );
}
