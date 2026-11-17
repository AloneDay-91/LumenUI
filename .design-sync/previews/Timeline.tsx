import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineSeparator,
  TimelineTime,
  TimelineTitle,
} from "lumen-ui"

const releases = [
  {
    title: "0.5.0 tagged",
    dateTime: "2026-09-20",
    date: "20 Sep 2026",
    text: "Native components, logo favicon, full-width previews.",
  },
  {
    title: "0.4.0 tagged",
    dateTime: "2026-09-19",
    date: "19 Sep 2026",
    text: "API tabs, English docs, copy-paste CSS tokens.",
  },
  {
    title: "Previews stay on the page",
    dateTime: "2026-09-18",
    date: "18 Sep 2026",
    text: "Each component keeps its live preview in the docs.",
  },
]

export const Releases = () => (
  <div className="w-full max-w-md">
    <Timeline>
      {releases.map((r) => (
        <TimelineItem key={r.title}>
          <TimelineSeparator />
          <TimelineMarker />
          <TimelineContent>
            <TimelineTitle>{r.title}</TimelineTitle>
            <TimelineTime dateTime={r.dateTime}>{r.date}</TimelineTime>
            <TimelineDescription>{r.text}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  </div>
)

export const Compact = () => (
  <div className="w-full max-w-sm">
    <Timeline>
      {[
        { t: "Order placed", d: "2026-11-01", l: "1 Nov, 09:14" },
        { t: "Shipped from Lyon", d: "2026-11-02", l: "2 Nov, 16:40" },
        { t: "Out for delivery", d: "2026-11-03", l: "3 Nov, 08:05" },
      ].map((e) => (
        <TimelineItem key={e.t}>
          <TimelineSeparator />
          <TimelineMarker />
          <TimelineContent>
            <TimelineTitle>{e.t}</TimelineTitle>
            <TimelineTime dateTime={e.d}>{e.l}</TimelineTime>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  </div>
)
