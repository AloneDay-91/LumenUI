"use client"

import { Plus, Users } from "lucide-react"

import { Button } from "@/components/ui/Button"

import { DashboardShell } from "./DashboardShell"
import { PageHeading } from "./PageHeading"
import { ProjectBoard } from "./ProjectBoard"

export function ProjectsPage() {
  return (
    <DashboardShell active="Projects" crumbs={["Workspace", "Projects", "Website relaunch"]}>
      <PageHeading
        title="Website relaunch"
        description="Drag a card to move it, or focus it and press Space, then the arrows."
      >
        <Button variant="outline">
          <Users data-icon="inline-start" />
          Share
        </Button>
        <Button>
          <Plus data-icon="inline-start" />
          New task
        </Button>
      </PageHeading>
      <ProjectBoard />
    </DashboardShell>
  )
}
