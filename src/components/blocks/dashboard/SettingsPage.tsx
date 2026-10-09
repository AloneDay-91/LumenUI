"use client"

import { Tabs, TabsIndicator, TabsList, TabsTab } from "@/components/ui/Tabs"

import { BillingSettings } from "./BillingSettings"
import { DangerZone } from "./DangerZone"
import { DashboardShell } from "./DashboardShell"
import { NotificationSettings } from "./NotificationSettings"
import { PageHeading } from "./PageHeading"
import { ProfileSettings } from "./ProfileSettings"

const tabs = ["General", "Notifications", "Billing", "Team", "API keys", "Security"]

export function SettingsPage() {
  return (
    <DashboardShell active="Settings" crumbs={["Workspace", "Settings"]}>
      <PageHeading
        title="Settings"
        description="Manage your profile, notifications and workspace billing."
      />
      <div className="overflow-x-auto">
        <Tabs defaultValue="General">
          <TabsList aria-label="Settings">
            {tabs.map((tab) => (
              <TabsTab key={tab} value={tab}>
                {tab}
              </TabsTab>
            ))}
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </div>
      <div className="max-w-[1040px]">
        <ProfileSettings />
        <NotificationSettings />
        <BillingSettings />
        <DangerZone />
      </div>
    </DashboardShell>
  )
}
