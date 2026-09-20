import { ComponentDocs } from "@/components/docs/ComponentDocs"
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

export default function TimelinePage() {
  return (
    <ComponentDocs
      name="Timeline"
      description="A vertical list of events. Marker, rule, title, time."
      preview={
        <div className="w-full max-w-md">
          <Timeline>
            <TimelineItem>
              <TimelineSeparator />
              <TimelineMarker />
              <TimelineContent>
                <TimelineTitle>0.5.0 tagged</TimelineTitle>
                <TimelineTime dateTime="2026-09-20">20 Sep 2026</TimelineTime>
                <TimelineDescription>
                  Native components, logo favicon, full-width previews.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator />
              <TimelineMarker />
              <TimelineContent>
                <TimelineTitle>0.4.0 tagged</TimelineTitle>
                <TimelineTime dateTime="2026-09-19">19 Sep 2026</TimelineTime>
                <TimelineDescription>
                  API tabs, English docs, copy-paste CSS tokens.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator />
              <TimelineMarker />
              <TimelineContent>
                <TimelineTitle>Examples moved out of docs</TimelineTitle>
                <TimelineTime dateTime="2026-09-18">18 Sep 2026</TimelineTime>
                <TimelineDescription>
                  The bento lives at /examples, without the docs chrome.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
      }
      usage={`import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineSeparator,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/Timeline"

<Timeline>
  <TimelineItem>
    <TimelineSeparator />
    <TimelineMarker />
    <TimelineContent>
      <TimelineTitle>0.5.0 tagged</TimelineTitle>
      <TimelineTime dateTime="2026-09-20">20 Sep 2026</TimelineTime>
      <TimelineDescription>Native components and logo favicon.</TimelineDescription>
    </TimelineContent>
  </TimelineItem>
</Timeline>`}
    />
  )
}
