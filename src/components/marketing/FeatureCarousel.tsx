"use client";

import { XIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Bar, BarChart, Cell } from "recharts";

import { FEATURE_TITLE } from "@/components/marketing/FeatureIntro";
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
import type { HeroRow } from "@/lib/hero-registry";

const exportsByDay = Array.from({ length: 28 }, (_, index) => ({
  day: index + 1,
  files: 34 + ((index * 37) % 62),
  strong: (index * 7) % 5 < 2,
}));

const strongTone =
  "color-mix(in oklch, var(--foreground) 62%, var(--background))";
const softTone = "color-mix(in oklch, var(--foreground) 14%, var(--background))";

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
      caption="draws in shades of foreground, so it follows light and dark with no extra tokens."
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

function TimelineSlide() {
  const releases = [
    { version: "v0.5.0", date: "2026-09-20", label: "20 Sep" },
    { version: "v0.6.0", date: "2026-09-30", label: "30 Sep" },
    { version: "v0.7.0", date: "2026-10-04", label: "4 Oct", latest: true },
  ];

  return (
    <Slide
      name="Timeline"
      caption="lays out history on a rail, with markers and a highlighted row."
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
  return (
    <Slide
      name="Command"
      caption="gives you search, grouped results, and shortcuts with full keyboard navigation."
    >
      <Command className="h-auto w-full shadow-lg ring-1 ring-foreground/5">
        <CommandInput placeholder="Search components…" />
        <CommandList className="max-h-36">
          <CommandGroup heading="Overlays">
            <CommandItem>Dialog</CommandItem>
            <CommandItem>Drawer</CommandItem>
            <CommandItem>Popover</CommandItem>
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
      caption="stays light: a quiet header fill, hairline rows, and a soft hover state."
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
      caption="tracks a flow, horizontal or vertical, with a ring on the current step."
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
      caption="stacks messages with a calm slide-in and swipe to dismiss."
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
          <div className="relative mt-3 flex items-start gap-3 rounded-2xl bg-popover p-3 text-popover-foreground shadow-lg ring-1 ring-foreground/5">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">Copied</p>
              <p className="text-xs text-muted-foreground">
                button.tsx is in your repo.
              </p>
            </div>
            <XIcon className="size-3.5 text-muted-foreground" aria-hidden />
          </div>
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

export function FeatureCarousel({ tableRows }: { tableRows: HeroRow[] }) {
  return (
    <section className="reveal mt-24 md:mt-32">
      <Carousel
        autoplay={5200}
        opts={{ align: "start" }}
        aria-label="Product screens"
        className="gap-0"
      >
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className={`max-w-md ${FEATURE_TITLE}`}>
            Built for real product screens
          </h2>
          <div className="flex gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
        <CarouselContent>
          <ChartSlide />
          <TimelineSlide />
          <CommandSlide />
          <TableSlide rows={tableRows} />
          <StepperSlide />
          <ToastSlide />
        </CarouselContent>
        <CarouselDots className="mt-5" />
      </Carousel>
    </section>
  );
}
