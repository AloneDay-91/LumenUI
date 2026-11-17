"use client"

import { useMemo, useState } from "react"
import { CircleAlert, Search } from "lucide-react"

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/Accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
import { Button } from "@/components/ui/Button"
import { ButtonGroup } from "@/components/ui/ButtonGroup"
import { Card } from "@/components/ui/Card"
import { Checkbox } from "@/components/ui/Checkbox"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/InputGroup"
import { Kbd } from "@/components/ui/Kbd"
import { Label } from "@/components/ui/Label"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination"
import { Rating } from "@/components/ui/Rating"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Separator } from "@/components/ui/Separator"
import { Slider } from "@/components/ui/Slider"
import { Spinner } from "@/components/ui/Spinner"
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperTitle,
} from "@/components/ui/Stepper"
import { Switch } from "@/components/ui/Switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
} from "@/components/ui/Tabs"
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineSeparator,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/Timeline"
import { Toggle } from "@/components/ui/Toggle"
import { ToggleGroup } from "@/components/ui/ToggleGroup"
import { useToastManager } from "@/components/ui/Toast"

const HERO_BACKGROUND =
  "https://images.unsplash.com/photo-1775313088881-649b8d9dc7d8?q=80&w=1600&auto=format&fit=crop"

const PAGE_SIZE = 4

type JobStatus = "review" | "ready" | "queued"

type Job = {
  id: string
  file: string
  owner: string
  initials: string
  status: JobStatus
  progress: number
  events: { title: string; detail: string; time: string }[]
}

const JOBS: Job[] = [
  {
    id: "dialog",
    file: "dialog.tsx",
    owner: "Noah B.",
    initials: "NB",
    status: "review",
    progress: 72,
    events: [
      { title: "Copied from docs", detail: "Noah pulled Dialog into the studio.", time: "09:14" },
      { title: "Tests passed", detail: "Focus trap and Escape close.", time: "09:22" },
      { title: "Waiting on you", detail: "Approve before it lands in the repo.", time: "09:40" },
    ],
  },
  {
    id: "button",
    file: "button.tsx",
    owner: "Camille R.",
    initials: "CR",
    status: "ready",
    progress: 100,
    events: [
      { title: "Copied from docs", detail: "Camille took Button as the first file.", time: "08:02" },
      { title: "Tokens applied", detail: "Pills, no interactive blue.", time: "08:18" },
      { title: "Ready to land", detail: "Waiting for the next push.", time: "08:31" },
    ],
  },
  {
    id: "table",
    file: "table.tsx",
    owner: "Lea M.",
    initials: "LM",
    status: "review",
    progress: 48,
    events: [
      { title: "Copied from docs", detail: "Lea started the invoices view.", time: "10:05" },
      { title: "Caption added", detail: "Totals sit in the footer.", time: "10:19" },
      { title: "Hover states", detail: "Needs a second pass on the last row.", time: "10:27" },
    ],
  },
  {
    id: "stepper",
    file: "stepper.tsx",
    owner: "Camille R.",
    initials: "CR",
    status: "queued",
    progress: 18,
    events: [
      { title: "Queued", detail: "Install path after Table.", time: "Yesterday" },
      { title: "Not started", detail: "Rails still need a vertical pass.", time: "—" },
    ],
  },
  {
    id: "accordion",
    file: "accordion.tsx",
    owner: "Noah B.",
    initials: "NB",
    status: "ready",
    progress: 100,
    events: [
      { title: "Copied from docs", detail: "Notes live in collapsible panels.", time: "11:02" },
      { title: "Ready to land", detail: "Default open on the first item.", time: "11:20" },
    ],
  },
  {
    id: "slider",
    file: "slider.tsx",
    owner: "Lea M.",
    initials: "LM",
    status: "review",
    progress: 61,
    events: [
      { title: "Copied from docs", detail: "Quality sits on a range.", time: "11:44" },
      { title: "Thumb pass", detail: "Focus ring still needs a check.", time: "12:01" },
    ],
  },
  {
    id: "rating",
    file: "rating.tsx",
    owner: "Camille R.",
    initials: "CR",
    status: "queued",
    progress: 8,
    events: [
      { title: "Queued", detail: "After Accordion.", time: "Yesterday" },
    ],
  },
  {
    id: "pagination",
    file: "pagination.tsx",
    owner: "Noah B.",
    initials: "NB",
    status: "review",
    progress: 39,
    events: [
      { title: "Copied from docs", detail: "Buttons only, no links.", time: "13:10" },
      { title: "Hover pass", detail: "Ghost vs secondary on the current page.", time: "13:28" },
    ],
  },
]

const STATUS_LABEL: Record<JobStatus, string> = {
  review: "Review",
  ready: "Ready",
  queued: "Queued",
}

export function LandingShowcase() {
  const toast = useToastManager()
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<"all" | JobStatus>("all")
  const [sort, setSort] = useState<"recent" | "owner" | "progress">("recent")
  const [page, setPage] = useState(1)
  const [selectedId, setSelectedId] = useState(JOBS[0].id)
  const [score, setScore] = useState(4)

  const visibleJobs = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const filtered = JOBS.filter((job) => {
      if (filter !== "all" && job.status !== filter) return false
      if (!needle) return true
      return (
        job.file.includes(needle) || job.owner.toLowerCase().includes(needle)
      )
    })

    const ordered = [...filtered]
    switch (sort) {
      case "owner":
        ordered.sort((a, b) => a.owner.localeCompare(b.owner))
        break
      case "progress":
        ordered.sort((a, b) => b.progress - a.progress)
        break
      case "recent":
        break
      default: {
        const _exhaustive: never = sort as never
        return _exhaustive
      }
    }
    return ordered
  }, [filter, query, sort])

  const pageCount = Math.max(1, Math.ceil(visibleJobs.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const pagedJobs = visibleJobs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )
  const selected =
    visibleJobs.find((job) => job.id === selectedId) ?? visibleJobs[0] ?? null
  const reviewCount = JOBS.filter((job) => job.status === "review").length

  return (
    <section
      className="relative overflow-hidden rounded-t-xl"
      aria-label="Studio export queue"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BACKGROUND})` }}
        aria-hidden
      />
      <div className="relative z-10 px-4 pt-6 sm:px-6 sm:pt-8 lg:px-10 lg:pt-8">
        <Card variant="secondary" className="gap-0 rounded-t-lg rounded-b-none py-0">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/docs">Studio</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/docs/components">Exports</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Queue</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Spinner className="size-3.5" />
              Syncing
            </p>
          </div>
          <Separator />
          <div className="flex flex-col gap-3 px-4 py-3 sm:px-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar>
                  <AvatarFallback>LU</AvatarFallback>
                </Avatar>
                <div className="min-w-0 text-left">
                  <p className="truncate text-sm font-medium">Export queue</p>
                  <p className="text-xs text-muted-foreground">
                    Files waiting to land in the repo
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <InputGroup className="w-full sm:w-56">
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                  <InputGroupInput
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value)
                      setPage(1)
                    }}
                    placeholder="Search a file…"
                    aria-label="Search a file"
                  />
                  <InputGroupAddon align="end">
                    <Kbd size="sm" variant="outline">
                      /
                    </Kbd>
                  </InputGroupAddon>
                </InputGroup>
                <Select
                  value={sort}
                  onValueChange={(value) => {
                    if (
                      value === "recent" ||
                      value === "owner" ||
                      value === "progress"
                    ) {
                      setSort(value)
                    }
                  }}
                >
                  <SelectTrigger className="w-34" aria-label="Sort files">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recent</SelectItem>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="progress">Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Tabs defaultValue="queue">
              <TabsList aria-label="Queue views">
                <TabsIndicator />
                <TabsTab value="queue">Queue</TabsTab>
                <TabsTab value="review">Review</TabsTab>
                <TabsTab value="ready">Ready</TabsTab>
              </TabsList>
              <TabsPanels>
                <TabsPanel value="queue" className="space-y-3 pt-1">
                  <Alert variant="info">
                    <CircleAlert />
                    <AlertTitle>{reviewCount} files need a pass</AlertTitle>
                    <AlertDescription>
                      Approve them before they land in the repo.
                    </AlertDescription>
                  </Alert>
                  <Stepper>
                    <StepperItem status="complete">
                      <StepperIndicator>1</StepperIndicator>
                      <StepperContent>
                        <StepperTitle>Copy</StepperTitle>
                        <StepperDescription>From the docs</StepperDescription>
                      </StepperContent>
                    </StepperItem>
                    <StepperItem status="current">
                      <StepperIndicator>2</StepperIndicator>
                      <StepperContent>
                        <StepperTitle>Review</StepperTitle>
                        <StepperDescription>In the studio</StepperDescription>
                      </StepperContent>
                    </StepperItem>
                    <StepperItem status="upcoming">
                      <StepperIndicator>3</StepperIndicator>
                      <StepperContent>
                        <StepperTitle>Land</StepperTitle>
                        <StepperDescription>Next push</StepperDescription>
                      </StepperContent>
                    </StepperItem>
                  </Stepper>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <ToggleGroup
                      value={[filter]}
                      onValueChange={(value) => {
                        const next = value[0]
                        if (
                          next === "all" ||
                          next === "review" ||
                          next === "ready" ||
                          next === "queued"
                        ) {
                          setFilter(next)
                          setPage(1)
                        }
                      }}
                      aria-label="Filter by status"
                    >
                      <Toggle value="all">All</Toggle>
                      <Toggle value="review">Review</Toggle>
                      <Toggle value="ready">Ready</Toggle>
                      <Toggle value="queued">Queued</Toggle>
                    </ToggleGroup>
                    <Label className="gap-2 text-xs font-normal text-muted-foreground">
                      <Switch defaultChecked />
                      Watch queue
                    </Label>
                  </div>
                  <div className="grid md:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)] md:rounded-2xl md:border md:border-border">
                    <div className="min-w-0 md:p-3">
                      {pagedJobs.length === 0 ? (
                        <p className="px-2 py-8 text-sm text-muted-foreground">
                          No file matches.
                        </p>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>File</TableHead>
                              <TableHead>Owner</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="w-28">Progress</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {pagedJobs.map((job) => (
                              <TableRow
                                key={job.id}
                                data-state={
                                  selected?.id === job.id ? "selected" : undefined
                                }
                                className="cursor-pointer"
                                onClick={() => setSelectedId(job.id)}
                              >
                                <TableCell className="font-mono text-xs">
                                  {job.file}
                                </TableCell>
                                <TableCell>
                                  <span className="inline-flex items-center gap-2">
                                    <Avatar className="size-6 text-[10px]">
                                      <AvatarFallback>{job.initials}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{job.owner}</span>
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">
                                    {STATUS_LABEL[job.status]}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div
                                    className="h-1.5 overflow-hidden rounded-full bg-muted"
                                    role="progressbar"
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-valuenow={job.progress}
                                    aria-label={`${job.file} progress`}
                                  >
                                    <div
                                      className="h-full bg-primary"
                                      style={{ width: `${job.progress}%` }}
                                    />
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                      <Pagination className="mt-4">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              disabled={currentPage === 1}
                              onClick={() => setPage((value) => Math.max(1, value - 1))}
                            />
                          </PaginationItem>
                          {Array.from({ length: pageCount }, (_, index) => (
                            <PaginationItem key={index + 1}>
                              <PaginationLink
                                isActive={currentPage === index + 1}
                                onClick={() => setPage(index + 1)}
                              >
                                {index + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                          {pageCount > 2 ? (
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                          ) : null}
                          <PaginationItem>
                            <PaginationNext
                              disabled={currentPage === pageCount}
                              onClick={() =>
                                setPage((value) => Math.min(pageCount, value + 1))
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                    <div className="border-t border-border p-5 text-left md:border-t-0 md:border-l">
                      {selected ? (
                        <>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-mono text-sm font-medium">
                                {selected.file}
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {selected.owner} · {STATUS_LABEL[selected.status]}
                              </p>
                            </div>
                            <Badge variant="outline">{selected.progress}%</Badge>
                          </div>
                          <div className="mt-4">
                            <p className="mb-1.5 text-xs text-muted-foreground">
                              Quality
                            </p>
                            <Rating
                              value={score}
                              onValueChange={setScore}
                              label="Export quality"
                            />
                          </div>
                          <Timeline className="mt-5">
                            {selected.events.map((event) => (
                              <TimelineItem key={event.title}>
                                <TimelineMarker />
                                <TimelineSeparator />
                                <TimelineContent>
                                  <div className="flex items-baseline justify-between gap-3">
                                    <TimelineTitle>{event.title}</TimelineTitle>
                                    <TimelineTime>{event.time}</TimelineTime>
                                  </div>
                                  <TimelineDescription>
                                    {event.detail}
                                  </TimelineDescription>
                                </TimelineContent>
                              </TimelineItem>
                            ))}
                          </Timeline>
                          <div className="mt-5 space-y-3">
                            <div>
                              <p className="mb-2 text-xs text-muted-foreground">
                                Export weight
                              </p>
                              <Slider defaultValue={72} />
                            </div>
                            <Label className="gap-2 text-xs font-normal text-muted-foreground">
                              <Checkbox defaultChecked />
                              Include tests
                            </Label>
                          </div>
                          <ButtonGroup className="mt-6 w-full">
                            <Button
                              className="flex-1"
                              disabled={selected.status === "queued"}
                              onClick={() =>
                                toast.add({
                                  title: `${selected.file} approved`,
                                  description:
                                    "It can land in the repo on the next push.",
                                })
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              className="flex-1"
                              variant="outline"
                              onClick={() =>
                                toast.add({
                                  title: "Changes requested",
                                  description: `${selected.owner} gets a note on ${selected.file}.`,
                                })
                              }
                            >
                              Request
                            </Button>
                          </ButtonGroup>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <Accordion defaultValue={["notes"]}>
                    <AccordionItem value="notes">
                      <AccordionTrigger>Review notes</AccordionTrigger>
                      <AccordionPanel>
                        Dialog is ready. Table still needs a last-row pass
                        before it can land.
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem value="tokens">
                      <AccordionTrigger>Token pass</AccordionTrigger>
                      <AccordionPanel>
                        Warm paper, pills, no interactive blue. Inter on the
                        chrome.
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem value="keyboard">
                      <AccordionTrigger>Keyboard</AccordionTrigger>
                      <AccordionPanel>
                        Focus rings stay visible. Escape closes every overlay.
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </TabsPanel>
                <TabsPanel value="review" className="pt-1">
                  <Accordion defaultValue={["dialog"]}>
                    {JOBS.filter((job) => job.status === "review").map((job) => (
                      <AccordionItem key={job.id} value={job.id}>
                        <AccordionTrigger>{job.file}</AccordionTrigger>
                        <AccordionPanel>
                          {job.owner} · {job.progress}% · waiting on a pass.
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsPanel>
                <TabsPanel value="ready" className="pt-1">
                  <ul className="divide-y divide-border text-left">
                    {JOBS.filter((job) => job.status === "ready").map((job) => (
                      <li
                        key={job.id}
                        className="flex items-center justify-between gap-3 py-3"
                      >
                        <span className="font-mono text-xs">{job.file}</span>
                        <Badge variant="outline">Ready</Badge>
                      </li>
                    ))}
                  </ul>
                </TabsPanel>
              </TabsPanels>
            </Tabs>
          </div>
        </Card>
      </div>
    </section>
  )
}
