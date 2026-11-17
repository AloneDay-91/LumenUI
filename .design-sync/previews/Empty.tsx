import { InboxIcon } from "lucide-react"
import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "lumen-ui"

export const Default = () => (
  <Empty className="max-w-md">
    <EmptyHeader>
      <EmptyMedia>
        <InboxIcon />
      </EmptyMedia>
      <EmptyTitle>No releases yet</EmptyTitle>
      <EmptyDescription>
        Tag a version and it will land here. Until then the list stays quiet.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button size="sm">Create a release</Button>
      <Button size="sm" variant="ghost">
        Read the changelog
      </Button>
    </EmptyContent>
  </Empty>
)

export const GhostMedia = () => (
  <Empty className="max-w-sm border-0 py-6">
    <EmptyHeader>
      <EmptyMedia variant="ghost">
        <InboxIcon />
      </EmptyMedia>
      <EmptyTitle>Nothing in the inbox</EmptyTitle>
    </EmptyHeader>
  </Empty>
)
