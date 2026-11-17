"use client"

import * as React from "react"
import { CircleDashedIcon, FlaskConicalIcon } from "lucide-react"

import { Trace, TraceContent, TraceStatusIcon, TraceTrigger, type TraceStatus } from "@/components/ui/Trace"
import { cn } from "@/lib/utils"

type TestCase = {
  name: string
  status: "passed" | "failed" | "skipped"
  /** Milliseconds. */
  duration?: number
  error?: string
}

type TestSuite = { name: string; tests: TestCase[] }

const toTrace: Record<TestCase["status"], TraceStatus> = {
  passed: "done",
  failed: "error",
  skipped: "pending",
}

/**
 * A test run: counts and a bar on the row, then each suite. Suites with a
 * failure open by default and show the error under the test.
 */
function TestResults({
  suites,
  running = false,
  title = "Tests",
  className,
  defaultOpen = true,
  ...props
}: Omit<React.ComponentProps<typeof Trace>, "variant" | "status" | "children" | "title"> & {
  suites: TestSuite[]
  running?: boolean
  title?: React.ReactNode
}) {
  const tests = suites.flatMap((suite) => suite.tests)
  const count = (status: TestCase["status"]) => tests.filter((test) => test.status === status).length
  const passed = count("passed")
  const failed = count("failed")
  const skipped = count("skipped")
  const status: TraceStatus = running ? "running" : failed > 0 ? "error" : "done"
  const total = tests.length || 1

  return (
    <Trace data-slot="test-results" variant="card" status={status} defaultOpen={defaultOpen} className={className} {...props}>
      <TraceTrigger
        icon={<FlaskConicalIcon />}
        label={title}
        showStatus={false}
        meta={
          <span className="flex items-center gap-2 font-mono text-[11px]">
            <span className="text-jade-ink">{passed} passed</span>
            {failed > 0 ? <span className="text-crimson-ink">{failed} failed</span> : null}
            {skipped > 0 ? <span>{skipped} skipped</span> : null}
          </span>
        }
      />
      <div aria-hidden className="flex h-1 w-full bg-muted">
        <span className="bg-jade-solid" style={{ width: `${(passed / total) * 100}%` }} />
        <span className="bg-crimson-solid" style={{ width: `${(failed / total) * 100}%` }} />
      </div>
      <TraceContent>
        <div className="flex flex-col">
          {suites.map((suite) => (
            <SuiteRow key={suite.name} suite={suite} />
          ))}
        </div>
      </TraceContent>
    </Trace>
  )
}

function SuiteRow({ suite }: { suite: TestSuite }) {
  const failed = suite.tests.some((test) => test.status === "failed")
  return (
    <details open={failed} className="group/suite border-b border-border last:border-b-0">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2 outline-none select-none hover:bg-muted/50 focus-visible:bg-muted/50 [&::-webkit-details-marker]:hidden">
        <TraceStatusIcon status={failed ? "error" : "done"} />
        <span className="min-w-0 flex-1 truncate font-mono">{suite.name}</span>
        <span className="font-mono text-[11px] text-muted-foreground">{suite.tests.length}</span>
      </summary>
      <ul className="m-0 flex list-none flex-col gap-1 px-3 pb-2.5 ps-8">
        {suite.tests.map((test) => (
          <li key={test.name} className="flex flex-col gap-1">
            <span className="flex items-center gap-2">
              {test.status === "skipped" ? (
                <CircleDashedIcon aria-hidden className="size-3.5 shrink-0 text-muted-foreground" />
              ) : (
                <TraceStatusIcon status={toTrace[test.status]} />
              )}
              <span className={cn("min-w-0 flex-1 truncate", test.status !== "failed" && "text-muted-foreground")}>
                {test.name}
              </span>
              {test.duration !== undefined ? (
                <span className="font-mono text-[11px] text-muted-foreground tabular-nums">{test.duration}ms</span>
              ) : null}
              <span className="sr-only">{test.status}</span>
            </span>
            {test.error ? (
              <pre className="m-0 ms-5.5 overflow-x-auto rounded-lg bg-crimson-wash px-2.5 py-1.5 font-mono text-[11px] leading-4 whitespace-pre-wrap text-crimson-ink">
                {test.error}
              </pre>
            ) : null}
          </li>
        ))}
      </ul>
    </details>
  )
}

export { TestResults }
export type { TestCase, TestSuite }
