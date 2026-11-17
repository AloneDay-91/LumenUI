import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Card, CardContent } from "@/components/ui/Card"
import {
  Stat,
  StatDelta,
  StatDescription,
  StatLabel,
  StatValue,
} from "@/components/ui/Stat"

export default function StatPage() {
  return (
    <ComponentDocs
      name="Stat"
      description="One figure with its label, a change since the last period, and context. Tabular numbers, deltas in the jade and crimson hues."
      preview={
        <Stat>
          <StatLabel>Weekly installs</StatLabel>
          <StatValue>12,480</StatValue>
          <StatDelta trend="up">+8.2%</StatDelta>
        </Stat>
      }
      usage={`import { Stat, StatDelta, StatLabel, StatValue } from "@/components/ui/Stat"

<Stat>
  <StatLabel>Weekly installs</StatLabel>
  <StatValue>12,480</StatValue>
  <StatDelta trend="up">+8.2%</StatDelta>
</Stat>`}
      extraHeadings={[
        { id: "intent", text: "Intent", level: 2 },
        { id: "cards", text: "In cards", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="intent">Intent</h2>
            <p>
              Up reads as good by default. When less is better, such as errors or
              latency, set <code>intent</code> so a drop shows in jade.
            </p>
            <div className="flex flex-wrap gap-10">
              <Stat>
                <StatLabel>Errors</StatLabel>
                <StatValue>31</StatValue>
                <StatDelta trend="down" intent="positive">−42%</StatDelta>
              </Stat>
              <Stat>
                <StatLabel>p95 latency</StatLabel>
                <StatValue>240 ms</StatValue>
                <StatDelta trend="up" intent="negative">+18 ms</StatDelta>
              </Stat>
              <Stat>
                <StatLabel>Uptime</StatLabel>
                <StatValue>99.98%</StatValue>
                <StatDelta>0.00%</StatDelta>
              </Stat>
            </div>
            <CodeBlock
              code={`<StatDelta trend="down" intent="positive">−42%</StatDelta>
<StatDelta trend="up" intent="negative">+18 ms</StatDelta>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="cards">In cards</h2>
            <div className="grid w-full gap-3 sm:grid-cols-3">
              {[
                ["Revenue", "€48.2k", "up", "+12%"],
                ["Customers", "1,204", "up", "+3%"],
                ["Churn", "2.1%", "down", "−0.4 pt"],
              ].map(([label, value, trend, delta]) => (
                <Card key={label}>
                  <CardContent>
                    <Stat>
                      <StatLabel>{label}</StatLabel>
                      <StatValue>{value}</StatValue>
                      <StatDescription className="flex flex-wrap items-center gap-1.5">
                        <StatDelta
                          trend={trend as "up" | "down"}
                          intent={label === "Churn" ? "positive" : undefined}
                        >
                          {delta}
                        </StatDelta>
                        vs last month
                      </StatDescription>
                    </Stat>
                  </CardContent>
                </Card>
              ))}
            </div>
            <CodeBlock
              code={`<Card>
  <CardContent>
    <Stat>
      <StatLabel>Revenue</StatLabel>
      <StatValue>€48.2k</StatValue>
      <StatDescription className="flex items-center gap-1.5">
        <StatDelta trend="up">+12%</StatDelta> vs last month
      </StatDescription>
    </Stat>
  </CardContent>
</Card>`}
            />
          </section>
        </>
      }
    />
  )
}
