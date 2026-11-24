"use client";

import { XIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Bar, BarChart, Cell } from "recharts";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import { Card } from "@/components/ui/Card";
import { Chart, ChartTooltip, chartColor } from "@/components/ui/Chart";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperTitle,
} from "@/components/ui/Stepper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  Timeline,
  TimelineContent,
  TimelineItem,
  TimelineMarker,
  TimelineSeparator,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/Timeline";
import { useToastManager } from "@/components/ui/Toast";
import { useQuietCommand } from "@/components/blocks/lumen/use-quiet-command";

const FEATURE_TITLE =
  "font-heading text-2xl leading-tight font-normal tracking-[-0.02em] text-balance md:text-[1.875rem] md:leading-[1.25]";

type HeroRow = { slug: string; file: string; client: boolean };

/** Three files the CLI wrote and the three releases on the timeline, as of 1.2. */
const tableRows: HeroRow[] = [
  { slug: "button", file: "Button.tsx", client: true },
  { slug: "card", file: "Card.tsx", client: false },
  { slug: "tabs", file: "Tabs.tsx", client: true },
];

const releases: CarouselRelease[] = [
  { version: "v1.0.7", date: "2026-10-29", label: "29 Oct" },
  { version: "v1.1.0", date: "2026-11-17", label: "17 Nov" },
  { version: "v1.2.0", date: "2026-11-17", label: "17 Nov", latest: true },
];

const exportsByDay = Array.from({ length: 28 }, (_, index) => ({
  day: index + 1,
  files: 34 + ((index * 37) % 62),
  strong: (index * 7) % 5 < 2,
}));

const strongTone =
  "color-mix(in oklch, var(--primary) 62%, var(--background))";
const softTone = "color-mix(in oklch, var(--primary) 14%, var(--background))";

function Slide({
  name,
  children,
  caption,
}: {
  name: string;
  children: ReactNode;
  caption: string;
}) {
  return (
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
      <Card className="h-full gap-0 py-0 transition-colors hover:border-foreground/25">
        <div className="flex h-56 items-center justify-center px-6">
          {children}
        </div>
        <p className="px-6 pb-7 text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">{name}</span> {caption}
        </p>
      </Card>
    </CarouselItem>
  );
}

function ChartSlide() {
  return (
    <Slide
      name="Chart"
      caption="A bar chart in the primary color, so it follows the theme, light or dark."
    >
      <div className="w-full rounded-[20px] bg-background px-4 py-3.5 ring-1 ring-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Exports</span>
          <span className="font-medium">28 days</span>
        </div>
        <Chart
          config={{ files: { label: "Files" } }}
          className="mt-3 aspect-auto h-16"
        >
          <BarChart
            data={exportsByDay}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            barCategoryGap={3}
          >
            <ChartTooltip />
            <Bar dataKey="files" fill={chartColor("files")} radius={2}>
              {exportsByDay.map((entry) => (
                <Cell
                  key={entry.day}
                  fill={entry.strong ? strongTone : softTone}
                />
              ))}
            </Bar>
          </BarChart>
        </Chart>
      </div>
    </Slide>
  );
}

type CarouselRelease = {
  version: string;
  date: string;
  label: string;
  latest?: boolean;
};

function TimelineSlide({ releases }: { releases: CarouselRelease[] }) {

  return (
    <Slide
      name="Timeline"
      caption="A release history on a rail, with the latest row marked."
    >
      <Timeline className="w-full max-w-64">
        {releases.map((release) => (
          <TimelineItem key={release.version} className="pb-3">
            <TimelineSeparator />
            <TimelineMarker />
            <TimelineContent className="flex items-center gap-2.5">
              <TimelineTime dateTime={release.date}>{release.label}</TimelineTime>
              <TimelineTitle>{release.version}</TimelineTitle>
              {release.latest ? (
                <Badge variant="secondary" className="ms-auto">
                  Latest
                </Badge>
              ) : null}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Slide>
  );
}

function CommandSlide() {
  // cmdk scrolls its selected item into view on mount, which would drag the
  // page down to this slide. Stay unselected until the visitor engages.
  const { active, commandProps } = useQuietCommand("dialog");

  return (
    <Slide
      name="Command"
      caption="Search with groups and keyboard shortcuts, the same palette as the docs."
    >
      <Command
        {...commandProps}
        className="h-auto w-full shadow-lg ring-1 ring-foreground/5"
      >
        <CommandInput placeholder="Search components…" />
        <CommandList className="max-h-36">
          <CommandGroup heading="Overlays">
            {["Dialog", "Drawer", "Popover"].map((name) => (
              <CommandItem
                key={name}
                value={name.toLowerCase()}
                data-active={active === name.toLowerCase()}
                className="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
              >
                {name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </Slide>
  );
}

function TableSlide({ rows }: { rows: HeroRow[] }) {
  return (
    <Slide
      name="Table"
      caption="A quiet table for the files the CLI writes, with a soft hover on each row."
    >
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="h-9 px-4">File</TableHead>
            <TableHead className="h-9 px-4">Directive</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.slug}>
              <TableCell className="px-4 py-2.5 font-mono text-xs">
                {row.file}
              </TableCell>
              <TableCell className="px-4 py-2.5">
                {row.client ? (
                  <Badge variant="outline" className="font-mono text-[11px]">
                    use client
                  </Badge>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Slide>
  );
}

function StepperSlide() {
  return (
    <Slide
      name="Stepper"
      caption="A flow with a ring on the current step, horizontal or vertical."
    >
      <div className="flex w-full flex-col gap-5 rounded-[20px] bg-background px-4 py-4 ring-1 ring-border">
        <p className="text-sm font-medium">New project</p>
        <Stepper>
          <StepperItem status="complete">
            <StepperIndicator>1</StepperIndicator>
            <StepperContent>
              <StepperTitle>Account</StepperTitle>
            </StepperContent>
          </StepperItem>
          <StepperItem status="current">
            <StepperIndicator>2</StepperIndicator>
            <StepperContent>
              <StepperTitle>Project</StepperTitle>
            </StepperContent>
          </StepperItem>
          <StepperItem status="upcoming">
            <StepperIndicator>3</StepperIndicator>
            <StepperContent>
              <StepperTitle>Launch</StepperTitle>
            </StepperContent>
          </StepperItem>
        </Stepper>
      </div>
    </Slide>
  );
}

function ToastSlide() {
  const toast = useToastManager();

  return (
    <Slide
      name="Toast"
      caption="A confirmation that stacks, slides in, and leaves on a swipe."
    >
      <div className="flex w-full flex-col items-center gap-4">
        <div className="relative w-full">
          <div
            aria-hidden
            className="absolute inset-x-3.5 top-0 h-16 rounded-2xl bg-background ring-1 ring-border"
          />
          <div
            aria-hidden
            className="absolute inset-x-1.5 top-1.5 h-16 rounded-2xl bg-background ring-1 ring-border"
          />
          <Card size="sm" className="relative mt-3 flex-row items-start gap-3 border-transparent bg-popover p-3 text-popover-foreground shadow-lg ring-1 ring-foreground/5">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">Copied</p>
              <p className="text-xs text-muted-foreground">
                button.tsx is in your repo.
              </p>
            </div>
            <XIcon className="size-3.5 text-muted-foreground" aria-hidden />
          </Card>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            toast.add({
              title: "Copied",
              description: "button.tsx is in your repo.",
            })
          }
        >
          Show a toast
        </Button>
      </div>
    </Slide>
  );
}

export function ComponentCarousel() {
  return (
    <div className="w-full px-6 py-12">
      <Carousel
        autoplay={5200}
        opts={{ align: "start" }}
        aria-label="Product screens"
        className="gap-0"
      >
        <div className="mb-10 flex items-end justify-between gap-6">
          <div className="max-w-md">
            <h2 className={FEATURE_TITLE}>
              The pieces a product screen is made of.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Charts, tables, search, and toasts. Copy the one the screen
              needs. Each one follows the same tokens as the rest of the
              catalog.
            </p>
          </div>
          <div className="flex gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
        <CarouselContent>
          <ChartSlide />
          <TimelineSlide releases={releases} />
          <CommandSlide />
          <TableSlide rows={tableRows} />
          <StepperSlide />
          <ToastSlide />
        </CarouselContent>
        <CarouselDots className="mt-5" />
      </Carousel>
    </div>
  );
}
