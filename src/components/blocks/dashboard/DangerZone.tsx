import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/Item"
import { Separator } from "@/components/ui/Separator"

import { SettingsSection } from "./SettingsSection"

export function DangerZone() {
  return (
    <SettingsSection
      title="Danger zone"
      description="Irreversible actions. Proceed with care."
    >
      <Card className="gap-0 border-destructive/30 py-0">
        <Item className="flex-wrap rounded-none px-5 py-4">
          <ItemContent className="min-w-48">
            <ItemTitle className="text-xs">Transfer ownership</ItemTitle>
            <ItemDescription>
              Move this workspace to another admin. You will become a member.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Transfer
            </Button>
          </ItemActions>
        </Item>
        <Separator className="bg-destructive/20" />
        <Item className="flex-wrap rounded-none bg-destructive/5 px-5 py-4">
          <ItemContent className="min-w-48">
            <ItemTitle className="text-xs">Delete workspace</ItemTitle>
            <ItemDescription>
              Permanently delete Acme Inc, its 12 projects and all billing
              history. This cannot be undone.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="destructive" size="sm">
              <Trash2 data-icon="inline-start" />
              Delete workspace
            </Button>
          </ItemActions>
        </Item>
      </Card>
    </SettingsSection>
  )
}
