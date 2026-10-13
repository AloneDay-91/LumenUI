"use client"

import { Fragment } from "react"

import { Card } from "@/components/ui/Card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/Item"
import { Switch } from "@/components/ui/Switch"

import { SettingsSection } from "./SettingsSection"

const topics = [
  { title: "Product updates", description: "New components, blocks and releases.", on: true },
  { title: "Billing", description: "Invoices, failed payments and plan changes.", on: true },
  { title: "Mentions", description: "When someone mentions you in a comment.", on: true },
  { title: "Weekly digest", description: "A summary of your workspace every Monday.", on: false },
  { title: "Marketing", description: "Tips, case studies and events.", on: false },
]

export function NotificationSettings() {
  return (
    <SettingsSection
      title="Notifications"
      description="Choose what reaches your inbox. Security alerts are always sent."
    >
      <Card className="gap-0 py-2">
        <ItemGroup className="px-2">
          {topics.map((topic, index) => (
            <Fragment key={topic.title}>
              {index > 0 ? (
                <div className="px-3">
                  <ItemSeparator />
                </div>
              ) : null}
              <Item>
                <ItemContent>
                  <ItemTitle className="text-xs">{topic.title}</ItemTitle>
                  <ItemDescription>{topic.description}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Switch defaultChecked={topic.on} aria-label={topic.title} />
                </ItemActions>
              </Item>
            </Fragment>
          ))}
        </ItemGroup>
      </Card>
    </SettingsSection>
  )
}
