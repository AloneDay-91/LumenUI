"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Pause, Play, Plus, Sparkles } from "lucide-react"

import { ShaderCard } from "@/components/shaders/ShaderCard"
import { ShaderStudio } from "@/components/shaders/ShaderStudio"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/Empty"
import { FilterBar, FilterBarClear } from "@/components/ui/FilterBar"
import { SearchInput } from "@/components/ui/SearchInput"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Stack } from "@/components/ui/Stack"
import { Toggle } from "@/components/ui/Toggle"
import { ToggleGroup } from "@/components/ui/ToggleGroup"
import { TooltipProvider } from "@/components/ui/Tooltip"
import { getShaderRenderer } from "@/lib/shader-renderer"
import {
  BUILTIN_SHADERS,
  SHADER_CATEGORIES,
  createDefaultShaderDraft,
  decodeShaderShareParam,
  type ShaderCategory,
  type ShaderItem,
} from "@/lib/shaders"

const STORAGE_KEY = "lumen-custom-shaders-v1"
const EMPTY_SHADERS: ShaderItem[] = []

type FilterValue = ShaderCategory | "all" | "custom"

// Module-level store backed by localStorage for hydration-safe useSyncExternalStore.
const storeListeners = new Set<() => void>()
let cachedRaw: string | null | undefined = undefined
let cachedParsed: ShaderItem[] = EMPTY_SHADERS

function emitStoreChange() {
  cachedRaw = undefined
  for (const listener of storeListeners) listener()
}

function subscribeCustomShaders(listener: () => void) {
  storeListeners.add(listener)
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) emitStoreChange()
  }
  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage)
  }
  return () => {
    storeListeners.delete(listener)
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage)
    }
  }
}

function getCustomShadersSnapshot(): ShaderItem[] {
  if (typeof window === "undefined") return EMPTY_SHADERS
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw === cachedRaw) return cachedParsed
    cachedRaw = raw
    if (!raw) {
      cachedParsed = EMPTY_SHADERS
      return cachedParsed
    }
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) {
      cachedParsed = EMPTY_SHADERS
      return cachedParsed
    }
    cachedParsed = parsed.filter(
      (item): item is ShaderItem =>
        Boolean(item) &&
        typeof item === "object" &&
        typeof (item as ShaderItem).id === "string" &&
        typeof (item as ShaderItem).name === "string" &&
        Boolean((item as ShaderItem).config),
    )
    return cachedParsed
  } catch {
    cachedParsed = EMPTY_SHADERS
    return EMPTY_SHADERS
  }
}

function getCustomShadersServerSnapshot(): ShaderItem[] {
  return EMPTY_SHADERS
}

function writeCustomShaders(next: ShaderItem[]) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Storage quota full or unavailable
  }
  emitStoreChange()
}

export function ShadersWorkspace() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const customShaders = React.useSyncExternalStore(
    subscribeCustomShaders,
    getCustomShadersSnapshot,
    getCustomShadersServerSnapshot,
  )

  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState<FilterValue>("all")
  const [animateAll, setAnimateAll] = React.useState(true)

  const [studioState, setStudioState] = React.useState<{
    shader: ShaderItem
    isNew: boolean
    key: string
  } | null>(null)

  const allShaders = React.useMemo(
    () => [...customShaders, ...BUILTIN_SHADERS],
    [customShaders],
  )

  const sharedParam = searchParams.get("s")
  const shaderParam = searchParams.get("shader")
  const createParam = searchParams.get("create")

  const urlStudioState = React.useMemo(() => {
    if (sharedParam) {
      const decoded = decodeShaderShareParam(sharedParam)
      if (decoded) {
        return { shader: decoded, isNew: true, key: `shared-${sharedParam}` }
      }
    }
    if (shaderParam) {
      const found = allShaders.find((s) => s.id === shaderParam)
      if (found) {
        return { shader: found, isNew: false, key: `url-${found.id}` }
      }
    }
    if (createParam === "1") {
      const draft: ShaderItem = {
        ...createDefaultShaderDraft(),
        id: "draft-new",
        config: {
          ...createDefaultShaderDraft().config,
          seed: 4.2,
        },
      }
      return { shader: draft, isNew: true, key: "url-create" }
    }
    return null
  }, [sharedParam, shaderParam, createParam, allShaders])

  const activeStudio = studioState ?? urlStudioState

  const categoryCounts = React.useMemo(() => {
    const counts: Record<FilterValue, number> = {
      all: allShaders.length,
      landscapes: 0,
      "glass-light": 0,
      "smooth-blends": 0,
      "noisy-grainy": 0,
      halftone: 0,
      dither: 0,
      "ascii-glitch": 0,
      cosmic: 0,
      custom: customShaders.length,
    }
    for (const s of allShaders) {
      counts[s.category] = (counts[s.category] ?? 0) + 1
    }
    return counts
  }, [allShaders, customShaders.length])

  const filteredShaders = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return allShaders.filter((shader) => {
      if (category === "custom" && !shader.isCustom) return false
      if (
        category !== "all" &&
        category !== "custom" &&
        shader.category !== category
      ) {
        return false
      }
      if (!q) return true
      return (
        shader.name.toLowerCase().includes(q) ||
        shader.description.toLowerCase().includes(q) ||
        shader.config.engine.toLowerCase().includes(q) ||
        shader.category.toLowerCase().includes(q)
      )
    })
  }, [allShaders, category, query])

  const syncUrl = React.useCallback(
    (nextQuery: string | null) => {
      const target = nextQuery ? `/shaders?${nextQuery}` : "/shaders"
      router.replace(target, { scroll: false })
    },
    [router],
  )

  const openShader = (shader: ShaderItem) => {
    setStudioState({ shader, isNew: false, key: `${shader.id}-${Date.now()}` })
    syncUrl(`shader=${encodeURIComponent(shader.id)}`)
  }

  const openCreateNew = () => {
    const draft = createDefaultShaderDraft()
    setStudioState({ shader: draft, isNew: true, key: draft.id })
    syncUrl("create=1")
  }

  const openRemix = (shader: ShaderItem) => {
    const draft: ShaderItem = {
      ...shader,
      id: `custom-${Date.now()}`,
      name: `${shader.name} Remix`,
      featured: false,
      isCustom: true,
      createdAt: Date.now(),
      config: {
        ...shader.config,
        colors: [...shader.config.colors] as [string, string, string, string],
      },
    }
    setStudioState({ shader: draft, isNew: true, key: draft.id })
    syncUrl("create=1")
  }

  const closeStudio = () => {
    setStudioState(null)
    syncUrl(null)
  }

  const handleSaveShader = (item: ShaderItem, mode: "save" | "remix") => {
    const now = Date.now()
    const saved: ShaderItem =
      mode === "remix" || !item.isCustom || item.id === "draft-new"
        ? {
            ...item,
            id: `custom-${now}`,
            featured: false,
            isCustom: true,
            createdAt: now,
          }
        : {
            ...item,
            isCustom: true,
            createdAt: item.createdAt ?? now,
          }

    const exists = customShaders.some((s) => s.id === saved.id)
    const next = exists
      ? customShaders.map((s) => (s.id === saved.id ? saved : s))
      : [saved, ...customShaders]
    writeCustomShaders(next)

    setStudioState({ shader: saved, isNew: false, key: saved.id })
    syncUrl(`shader=${encodeURIComponent(saved.id)}`)
  }

  const handleDeleteShader = (target: ShaderItem) => {
    const next = customShaders.filter((s) => s.id !== target.id)
    writeCustomShaders(next)
    if (activeStudio?.shader.id === target.id) {
      closeStudio()
    }
  }

  const handleQuickDownload = (shader: ShaderItem) => {
    const dataUrl = getShaderRenderer().exportPngDataUrl(
      shader.config,
      1920,
      1080,
      2.5,
    )
    if (!dataUrl) return
    const link = document.createElement("a")
    const slug = shader.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
    link.download = `${slug || "shader"}-1920x1080.png`
    link.href = dataUrl
    link.click()
  }

  const hasFilters = category !== "all" || query.trim() !== ""

  return (
    <TooltipProvider>
      {activeStudio ? (
        <ShaderStudio
          key={activeStudio.key}
          initialShader={activeStudio.shader}
          isNew={activeStudio.isNew}
          onBack={closeStudio}
          onSave={handleSaveShader}
          onDelete={handleDeleteShader}
        />
      ) : (
        <Stack gap="xl">
          {/* Centered Collections Header */}
          <Stack
            render={<header />}
            align="center"
            gap="sm"
            className="pt-4 text-center"
          >
            <Badge variant="secondary">
              <Sparkles aria-hidden />
              Real-time WebGL Shader Collection
            </Badge>
            <h1 className="font-heading text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Shaders
            </h1>
            <p className="max-w-[54ch] text-sm text-muted-foreground">
              Curated procedural gradients, dither art, and refractive glass
              shaders. Click any shader to customize, export 4K PNG / React
              code, or create your own from scratch.
            </p>
            <Stack
              direction="row"
              align="center"
              justify="center"
              wrap
              gap="sm"
              className="mt-2"
            >
              <Button onClick={openCreateNew}>
                <Plus data-icon="inline-start" />
                Create shader
              </Button>
              <Button
                variant="outline"
                onClick={() => setAnimateAll((v) => !v)}
              >
                {animateAll ? (
                  <>
                    <Pause data-icon="inline-start" />
                    Pause motion
                  </>
                ) : (
                  <>
                    <Play data-icon="inline-start" />
                    Animate all
                  </>
                )}
              </Button>
            </Stack>
          </Stack>

          {/* Split Search & Category Filter Controls using LumenUI SearchInput, Select, ToggleGroup & FilterBar */}
          <Stack gap="sm">
            <Stack
              direction="row"
              align="center"
              justify="between"
              wrap
              gap="sm"
            >
              <SearchInput
                value={query}
                onValueChange={setQuery}
                placeholder="Search shaders..."
                aria-label="Search shaders"
                className="w-full sm:max-w-xs"
              />

              <FilterBar>
                <Select
                  value={category}
                  onValueChange={(value) => {
                    if (value) setCategory(value as FilterValue)
                  }}
                >
                  <SelectTrigger className="min-w-[172px]">
                    <SelectValue>
                      {() =>
                        SHADER_CATEGORIES.find((cat) => cat.id === category)
                          ?.label ?? "All Shaders"
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {SHADER_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        <span className="flex w-full items-center justify-between gap-4">
                          <span>{cat.label}</span>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {categoryCounts[cat.id]}
                          </span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {hasFilters ? (
                  <FilterBarClear
                    onClick={() => {
                      setQuery("")
                      setCategory("all")
                    }}
                  />
                ) : null}
              </FilterBar>
            </Stack>

            <div className="max-w-full overflow-x-auto pb-1">
              <ToggleGroup
                aria-label="Filter shaders by collection"
                value={[category]}
                onValueChange={(next) => {
                  if (next[0]) setCategory(next[0] as FilterValue)
                }}
                className="w-max"
              >
                {SHADER_CATEGORIES.map((cat) => (
                  <Toggle key={cat.id} value={cat.id}>
                    <span>{cat.label}</span>
                    <span className="font-mono text-[10px] opacity-65">
                      {categoryCounts[cat.id]}
                    </span>
                  </Toggle>
                ))}
              </ToggleGroup>
            </div>
          </Stack>

          {/* 3-Column Shader Collection Grid */}
          {filteredShaders.length > 0 ? (
            <section
              aria-label="Shader collection"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredShaders.map((shader) => (
                <ShaderCard
                  key={shader.id}
                  shader={shader}
                  animateAll={animateAll}
                  onOpen={openShader}
                  onRemix={openRemix}
                  onDownload={handleQuickDownload}
                  onDelete={shader.isCustom ? handleDeleteShader : undefined}
                />
              ))}
            </section>
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia>
                  <Sparkles />
                </EmptyMedia>
                <EmptyTitle>
                  {category === "custom"
                    ? "No custom shaders yet"
                    : "No shaders match your filter"}
                </EmptyTitle>
                <EmptyDescription>
                  {category === "custom"
                    ? "Open the Shader Studio to craft your own procedural gradient, dither effect, or custom GLSL shader."
                    : "Try another keyword or clear your active filter."}
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                {hasFilters ? (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQuery("")
                      setCategory("all")
                    }}
                  >
                    Reset filters
                  </Button>
                ) : null}
                <Button onClick={openCreateNew}>
                  <Plus data-icon="inline-start" />
                  Create shader
                </Button>
              </EmptyContent>
            </Empty>
          )}
        </Stack>
      )}
    </TooltipProvider>
  )
}
