"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Field, FieldControl, FieldLabel } from "@/components/ui/Field"
import { Separator } from "@/components/ui/Separator"
import { Switch } from "@/components/ui/Switch"
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
} from "@/components/ui/Tabs"

const HERO_BACKGROUND =
  "https://images.unsplash.com/photo-1775313088881-649b8d9dc7d8?q=80&w=1600&auto=format&fit=crop"

export function LandingShowcase() {
  return (
    <section
      className="relative overflow-hidden rounded-xl"
      aria-label="Component preview"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BACKGROUND})` }}
        aria-hidden
      />
      <div className="relative z-10 p-3 sm:p-4 lg:p-5">
        <Card variant="secondary" className="gap-0 rounded-lg py-0">
          <div className="flex items-center justify-between gap-3 px-5 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar>
                <AvatarFallback>LU</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">Lumen Studio</p>
                <p className="text-xs text-muted-foreground">Workspace</p>
              </div>
            </div>
            <Badge variant="outline">Copy-paste</Badge>
          </div>
          <Separator />
          <div className="grid gap-8 p-5 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <Field>
                <FieldLabel>Name</FieldLabel>
                <FieldControl defaultValue="Lumen UI" />
              </Field>
              <Field>
                <FieldLabel>Project</FieldLabel>
                <FieldControl placeholder="My application" />
              </Field>
              <div className="flex items-center justify-between gap-3 pt-1">
                <div>
                  <p className="text-sm font-medium">Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Toast for actions.
                  </p>
                </div>
                <Switch defaultChecked aria-label="Enable notifications" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <Button>Save</Button>
                <Button variant="outline">Cancel</Button>
                <Button variant="ghost">Export</Button>
              </div>
              <Tabs defaultValue="tokens">
                <TabsList className="bg-background">
                  <TabsTab value="tokens">Tokens</TabsTab>
                  <TabsTab value="cva">CVA</TabsTab>
                  <TabsTab value="base">Base UI</TabsTab>
                  <TabsIndicator />
                </TabsList>
                <TabsPanels>
                  <TabsPanel
                    value="tokens"
                    className="text-sm text-muted-foreground"
                  >
                    CSS variables, light and dark.
                  </TabsPanel>
                  <TabsPanel
                    value="cva"
                    className="text-sm text-muted-foreground"
                  >
                    Declarative variants, merged with cn().
                  </TabsPanel>
                  <TabsPanel
                    value="base"
                    className="text-sm text-muted-foreground"
                  >
                    Focus, keyboard, portals. The chrome is yours.
                  </TabsPanel>
                </TabsPanels>
              </Tabs>
              <Alert>
                <AlertTitle>Not a library</AlertTitle>
                <AlertDescription>
                  You copy the file. It evolves in your repo.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
