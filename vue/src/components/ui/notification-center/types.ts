import type { Component } from "vue"

export type NotificationItem = {
  id: string
  title: string
  description?: string
  date?: Date | string | number
  read?: boolean
  /** A component rendered in the round icon slot, e.g. a lucide icon. */
  icon?: Component
}

export type NotificationCenterLabels = {
  trigger?: (unread: number) => string
  title?: string
  markAllRead?: string
}
