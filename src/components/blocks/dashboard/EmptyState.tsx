import { Inbox, Plus, Upload } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/Empty"

/** A section with nothing in it yet: what goes here, and two ways to start. */
export function EmptyState() {
  return (
    <Card className="min-w-0">
      <CardContent>
        <Empty>
          <EmptyHeader>
            <EmptyMedia>
              <Inbox />
            </EmptyMedia>
            <EmptyTitle>No invoices yet</EmptyTitle>
            <EmptyDescription>
              Invoices show up here once a customer pays. Create one manually or
              connect Stripe to import history.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline">
              <Upload data-icon="inline-start" />
              Import
            </Button>
            <Button>
              <Plus data-icon="inline-start" />
              Create invoice
            </Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
