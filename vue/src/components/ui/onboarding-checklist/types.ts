import type { Component, VNode } from "vue"

/** Text, a VNode (from h()), or a component to render. */
export type ChecklistContent = string | VNode | Component

export type ChecklistStep = {
  id: string
  title: ChecklistContent
  description?: ChecklistContent
  /** The step's call to action: a Button, a link. Shown on the open step. */
  action?: ChecklistContent
  /** A plain name for announcements when title is not a string. */
  label?: string
}

export type OnboardingChecklistLabels = {
  progress?: (done: number, total: number) => string
  done?: string
  dismiss?: string
  markDone?: (step: string) => string
  markUndone?: (step: string) => string
  allDone?: string
}
