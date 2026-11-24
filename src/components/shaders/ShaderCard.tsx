"use client"

import * as React from "react"
import {
  CheckCircle2,
  CopyPlus,
  Download,
  Sparkles,
  Trash2,
} from "lucide-react"

import { ShaderCanvas } from "@/components/shaders/ShaderCanvas"
import { AspectRatio } from "@/components/ui/AspectRatio"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Stack } from "@/components/ui/Stack"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip"
import {
  SHADER_CATEGORIES,
  SHADER_ENGINES,
  type ShaderItem,
} from "@/lib/shaders"

type ShaderCardProps = {
  shader: ShaderItem
  animateAll: boolean
  onOpen: (shader: ShaderItem) => void
  onRemix: (shader: ShaderItem) => void
  onDownload: (shader: ShaderItem) => void
  onDelete?: (shader: ShaderItem) => void
}

export function ShaderCard({
  shader,
  animateAll,
  onOpen,
  onRemix,
  onDownload,
  onDelete,
}: ShaderCardProps) {
  const [hovered, setHovered] = React.useState(false)

  const engineLabel =
    SHADER_ENGINES.find((e) => e.id === shader.config.engine)?.label ?? "GLSL"
  const categoryLabel =
    SHADER_CATEGORIES.find((c) => c.id === shader.category)?.label ??
    shader.category

  return (
    <Card
      size="sm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group gap-3 p-2.5 transition-colors hover:border-foreground/20"
    >
      <CardContent className="p-0">
        <div
          role="button"
          tabIndex={0}
          onClick={() => onOpen(shader)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              onOpen(shader)
            }
          }}
          aria-label={`Open ${shader.name} in Shader Studio`}
          className="relative cursor-pointer overflow-hidden rounded-[min(var(--radius-3xl),18px)] outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
        >
          <AspectRatio ratio={4 / 4.15}>
            <ShaderCanvas
              config={shader.config}
              active={animateAll || hovered}
              maxDpr={1.25}
              maxFps={hovered ? 45 : 24}
              className="transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </AspectRatio>

          {/* Top-left badge using LumenUI Badge */}
          {shader.isCustom ? (
            <Badge
              variant="secondary"
              className="pointer-events-none absolute top-3 left-3 bg-background/85 text-foreground backdrop-blur-md"
            >
              <Sparkles aria-hidden />
              Custom Shader
            </Badge>
          ) : shader.featured ? (
            <Badge
              variant="secondary"
              className="pointer-events-none absolute top-3 left-3 bg-background/85 text-foreground backdrop-blur-md"
            >
              <CheckCircle2 aria-hidden />
              Featured Shader
            </Badge>
          ) : null}

          {/* Top-right hover actions using LumenUI Button + Tooltip */}
          <Stack
            direction="row"
            gap="xs"
            className="absolute top-3 right-3 opacity-0 transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="secondary"
                    size="icon-xs"
                    aria-label={`Remix ${shader.name}`}
                    onClick={() => onRemix(shader)}
                    className="bg-background/85 backdrop-blur-md"
                  >
                    <CopyPlus />
                  </Button>
                }
              />
              <TooltipContent>Remix shader</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="secondary"
                    size="icon-xs"
                    aria-label={`Download ${shader.name} as PNG`}
                    onClick={() => onDownload(shader)}
                    className="bg-background/85 backdrop-blur-md"
                  >
                    <Download />
                  </Button>
                }
              />
              <TooltipContent>Download PNG</TooltipContent>
            </Tooltip>

            {shader.isCustom && onDelete ? (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="destructive"
                      size="icon-xs"
                      aria-label={`Delete ${shader.name}`}
                      onClick={() => onDelete(shader)}
                    >
                      <Trash2 />
                    </Button>
                  }
                />
                <TooltipContent>Delete shader</TooltipContent>
              </Tooltip>
            ) : null}
          </Stack>

          {/* Bottom engine badge on hover */}
          <Stack
            direction="row"
            align="center"
            justify="between"
            className="pointer-events-none absolute inset-x-3 bottom-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            <Badge
              variant="secondary"
              className="bg-background/85 font-mono text-[10px] text-foreground backdrop-blur-md"
            >
              {engineLabel}
            </Badge>
            <Badge variant="default">Open Studio</Badge>
          </Stack>
        </div>
      </CardContent>

      <CardHeader
        className="cursor-pointer gap-1 px-2 pt-0 pb-1"
        onClick={() => onOpen(shader)}
      >
        <Stack direction="row" align="center" justify="between" gap="sm">
          <CardTitle className="truncate">{shader.name}</CardTitle>
          <Stack
            direction="row"
            gap="none"
            align="center"
            className="shrink-0 -space-x-1"
            aria-label="Shader palette"
          >
            {shader.config.colors.map((color, idx) => (
              <span
                key={`${shader.id}-swatch-${idx}`}
                className="size-3 rounded-full ring-1 ring-card"
                style={{ backgroundColor: color }}
              />
            ))}
          </Stack>
        </Stack>
        <Stack direction="row" align="center" justify="between" gap="sm">
          <CardDescription className="min-w-0 flex-1 truncate">
            {shader.description}
          </CardDescription>
          <Badge variant="outline" className="shrink-0 font-mono text-[10px]">
            {categoryLabel}
          </Badge>
        </Stack>
      </CardHeader>
    </Card>
  )
}
