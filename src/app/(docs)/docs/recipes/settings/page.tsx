import { CodeBlock } from "@/components/docs/CodeBlock"
import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { PageIntro, Preview } from "@/components/docs/Preview"
import { Badge } from "@/components/ui/Badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from "@/components/ui/DataList"
import { Label } from "@/components/ui/Label"
import { Switch } from "@/components/ui/Switch"

const command = "npx @aloneday/lumenui@latest add card data-list badge switch label"

export default function SettingsRecipePage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "settings", text: "Settings", level: 1 },
          { id: "order", text: "Copy order", level: 2 },
          { id: "preview", text: "Preview", level: 2 },
        ]}
      />
      <div className="space-y-12">
        <PageIntro
          title="Settings"
          description="One card. A record for the plan and the status, then a switch for the notification."
        />

        <section className="space-y-4">
          <h2 id="order">Copy order</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Card is the surface.</li>
            <li>Data List is the record. Badge is the status.</li>
            <li>Label names the Switch. The switch does not carry its own text.</li>
          </ol>
          <CodeBlock language="bash" code={command} />
        </section>

        <section className="space-y-4">
          <h2 id="preview">Preview</h2>
          <Preview className="items-stretch">
            <Card className="w-full max-w-md text-left">
              <CardHeader>
                <CardTitle>Workspace</CardTitle>
                <CardDescription>Plan, status, and one notification.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <DataList>
                  <DataListItem align="center">
                    <DataListLabel minWidth="5.5rem">Plan</DataListLabel>
                    <DataListValue>Pro</DataListValue>
                  </DataListItem>
                  <DataListItem align="center">
                    <DataListLabel minWidth="5.5rem">Status</DataListLabel>
                    <DataListValue>
                      <Badge color="jade">Active</Badge>
                    </DataListValue>
                  </DataListItem>
                </DataList>
                <Label>
                  <Switch defaultChecked />
                  Email when a deploy finishes
                </Label>
              </CardContent>
            </Card>
          </Preview>
        </section>
      </div>
    </>
  )
}
