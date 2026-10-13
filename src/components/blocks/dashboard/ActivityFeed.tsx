"use client"

import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Tabs, TabsIndicator, TabsList, TabsTab } from "@/components/ui/Tabs"
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
import { cn } from "@/lib/utils"

const activity = [
  { who: "Camille Moreau", what: "upgraded to Pro · annual", detail: "Billing · €1,240 charged to Visa ••12", time: "2m" },
  { who: "System", what: "sent a payout of €12,480", detail: "To Qonto ••42 · arrives Monday", time: "18m" },
  { who: "Noah Fischer", what: "opened ticket #812", detail: "“SSO setup with Okta”", time: "1h" },
  { who: "Elouan Bruzek", what: "deployed v1.0.1 to production", detail: "12 files changed · build 48s", time: "3h", highlight: true },
  { who: "Inès Benali", what: "invited 4 members to Studio B", detail: "Team · 2 seats left", time: "5h" },
  { who: "Hugo Laurent", what: "payment failed", detail: "Card expired · retry scheduled", time: "1d" },
]

/** Workspace events on a Timeline, filtered with Tabs. */
export function ActivityFeed({ count = 6 }: { count?: number }) {
  return (
    <Card className="h-full min-w-0">
      <CardHeader className="flex flex-wrap items-start gap-3">
        <div className="min-w-0 flex-1">
          <CardTitle>Recent activity</CardTitle>
          <CardDescription className="mt-1">Across your workspace</CardDescription>
        </div>
        <Tabs defaultValue="all">
          <TabsList aria-label="Filter activity">
            <TabsTab value="all">All</TabsTab>
            <TabsTab value="billing">Billing</TabsTab>
            <TabsTab value="team">Team</TabsTab>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <Timeline>
          {activity.slice(0, count).map((event) => (
            <TimelineItem key={event.who + event.time} className="pb-5">
              <TimelineMarker
                className={cn(!event.highlight && "bg-muted-foreground/40")}
              />
              <TimelineSeparator />
              <TimelineContent>
                <div className="flex items-baseline gap-3">
                  <TimelineTitle className="flex-1 text-xs">
                    <span>{event.who}</span>{" "}
                    <span className="font-normal text-muted-foreground">
                      {event.what}
                    </span>
                  </TimelineTitle>
                  <TimelineTime>{event.time}</TimelineTime>
                </div>
                <TimelineDescription>{event.detail}</TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button variant="ghost" size="sm" className="w-full">
          View all activity
        </Button>
      </CardFooter>
    </Card>
  )
}
