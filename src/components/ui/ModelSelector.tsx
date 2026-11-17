"use client"

import * as React from "react"
import { BrainIcon } from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { cn } from "@/lib/utils"

type ModelOption = { value: string; label: string; description?: string }
type EffortOption = { value: string; label: string }

const defaultEfforts: EffortOption[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
]

/**
 * Two small menus for the composer toolbar: which model runs, and how hard
 * it thinks. The effort menu hides for models that do not reason.
 */
function ModelSelector({
  models,
  model,
  onModelChange,
  efforts = defaultEfforts,
  effort,
  onEffortChange,
  showEffort = true,
  labels = {},
  className,
}: {
  models: ModelOption[]
  model: string
  onModelChange: (model: string) => void
  efforts?: EffortOption[]
  effort?: string
  onEffortChange?: (effort: string) => void
  showEffort?: boolean
  labels?: { model?: string; effort?: string }
  className?: string
}) {
  const itemsFor = (options: { value: string; label: string }[]) =>
    Object.fromEntries(options.map((option) => [option.value, option.label]))

  return (
    <div data-slot="model-selector" className={cn("flex items-center gap-1", className)}>
      <Select items={itemsFor(models)} value={model} onValueChange={(value) => value && onModelChange(value as string)}>
        <SelectTrigger
          size="sm"
          aria-label={labels.model ?? "Model"}
          className="border-transparent bg-transparent hover:bg-muted dark:bg-transparent"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false} align="start" className="w-auto min-w-56">
          {models.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <span className="flex flex-col gap-0.5">
                <span>{option.label}</span>
                {option.description ? (
                  <span className="text-[11px] whitespace-normal text-muted-foreground">{option.description}</span>
                ) : null}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {showEffort && effort !== undefined && onEffortChange ? (
        <Select items={itemsFor(efforts)} value={effort} onValueChange={(value) => value && onEffortChange(value as string)}>
          <SelectTrigger
            size="sm"
            aria-label={labels.effort ?? "Reasoning effort"}
            className="border-transparent bg-transparent text-muted-foreground hover:bg-muted dark:bg-transparent"
          >
            <BrainIcon aria-hidden className="size-3.5" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false} align="start">
            {efforts.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : null}
    </div>
  )
}

export { ModelSelector }
export type { ModelOption, EffortOption }
