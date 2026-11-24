"use client"

import * as React from "react"
import {
  AlertCircle,
  ArrowLeft,
  Check,
  Code2,
  CopyPlus,
  Download,
  Eye,
  Images,
  Link2,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Save,
  Shuffle,
  Sparkles,
  Trash2,
} from "lucide-react"

import { ShaderCanvas } from "@/components/shaders/ShaderCanvas"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { AspectRatio } from "@/components/ui/AspectRatio"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { ButtonGroup } from "@/components/ui/ButtonGroup"
import { Card, CardContent, CardFooter } from "@/components/ui/Card"
import { CodeBlock } from "@/components/ui/CodeBlock"
import { ColorPicker } from "@/components/ui/ColorPicker"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog"
import { Field, FieldLabel } from "@/components/ui/Field"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { Separator } from "@/components/ui/Separator"
import { Slider } from "@/components/ui/Slider"
import { Stack } from "@/components/ui/Stack"
import { Switch } from "@/components/ui/Switch"
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
} from "@/components/ui/Tabs"
import { Textarea } from "@/components/ui/Textarea"
import { Toggle } from "@/components/ui/Toggle"
import { ToggleGroup } from "@/components/ui/ToggleGroup"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip"
import { getShaderRenderer } from "@/lib/shader-renderer"
import {
  CURATED_PALETTES,
  DEFAULT_CUSTOM_GLSL,
  SHADER_ENGINES,
  createStyleVariation,
  encodeShaderShareParam,
  generateReactShaderCode,
  getShaderFragmentSource,
  randomizeShaderConfig,
  type ShaderCategory,
  type ShaderConfig,
  type ShaderEngine,
  type ShaderItem,
} from "@/lib/shaders"
import { cn } from "@/lib/utils"

type AspectMode = "fill" | "16:9" | "4:3" | "1:1"
type CodeTabMode = "react" | "glsl" | "editor"

const CATEGORY_OPTIONS: { value: ShaderCategory; label: string }[] = [
  { value: "landscapes", label: "Landscapes & Sky" },
  { value: "glass-light", label: "Glass & Light" },
  { value: "smooth-blends", label: "Smooth Blends" },
  { value: "noisy-grainy", label: "Noisy / Grainy" },
  { value: "halftone", label: "Halftone" },
  { value: "dither", label: "Dither" },
  { value: "ascii-glitch", label: "ASCII & Glitch" },
  { value: "cosmic", label: "Cosmic" },
]

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  suffix = "",
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  suffix?: string
  onChange: (next: number) => void
}) {
  return (
    <Stack gap="sm">
      <Stack direction="row" align="center" justify="between">
        <Label className="font-normal text-muted-foreground">{label}</Label>
        <span className="font-mono text-[11px] tabular-nums text-foreground">
          {Number(value.toFixed(2))}
          {suffix}
        </span>
      </Stack>
      <Slider
        aria-label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        onValueChange={(next) => onChange(Array.isArray(next) ? next[0] : next)}
      />
    </Stack>
  )
}

export type ShaderStudioProps = {
  initialShader: ShaderItem
  isNew: boolean
  onBack: () => void
  onSave: (shader: ShaderItem, mode: "save" | "remix") => void
  onDelete?: (shader: ShaderItem) => void
}

export function ShaderStudio({
  initialShader,
  isNew,
  onBack,
  onSave,
  onDelete,
}: ShaderStudioProps) {
  const [name, setName] = React.useState(initialShader.name)
  const [description, setDescription] = React.useState(initialShader.description)
  const [category, setCategory] = React.useState<ShaderCategory>(
    initialShader.category,
  )
  const [config, setConfig] = React.useState<ShaderConfig>(initialShader.config)

  const [aspect, setAspect] = React.useState<AspectMode>("fill")
  const [showOverlay, setShowOverlay] = React.useState(false)
  const [overlayDark, setOverlayDark] = React.useState(false)
  const [overlayTitle, setOverlayTitle] = React.useState("Lumen Shaders")
  const [overlaySubtitle, setOverlaySubtitle] = React.useState(
    "Real-time WebGL backgrounds crafted for modern interfaces.",
  )
  const [codeMode, setCodeMode] = React.useState<CodeTabMode>(
    initialShader.config.engine === "custom" ? "editor" : "react",
  )
  const [glslError, setGlslError] = React.useState<string | null>(null)
  const [fullscreen, setFullscreen] = React.useState(false)
  const [copiedShare, setCopiedShare] = React.useState(false)
  const [savedNotice, setSavedNotice] = React.useState<string | null>(null)
  const [variationsOpen, setVariationsOpen] = React.useState(false)
  const [variations, setVariations] = React.useState<ShaderConfig[]>([])

  const stageRef = React.useRef<HTMLDivElement | null>(null)
  const timeRef = React.useRef<number>(2.4)

  const currentItem: ShaderItem = React.useMemo(
    () => ({
      ...initialShader,
      name: name.trim() || "Untitled Shader",
      description:
        description.trim() || "Custom WebGL shader created in Lumen Studio.",
      category,
      config,
    }),
    [initialShader, name, description, category, config],
  )

  const updateConfig = React.useCallback(
    <K extends keyof ShaderConfig>(key: K, value: ShaderConfig[K]) => {
      setConfig((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  const updateColor = (index: 0 | 1 | 2 | 3, value: string) => {
    setConfig((prev) => {
      const next = [...prev.colors] as [string, string, string, string]
      next[index] = value
      return { ...prev, colors: next }
    })
  }

  const handleEngineChange = (engine: ShaderEngine) => {
    setGlslError(null)
    if (engine === "custom") {
      setConfig((prev) => ({
        ...prev,
        engine: "custom",
        customGlsl: prev.customGlsl?.trim()
          ? prev.customGlsl
          : getShaderFragmentSource(prev),
      }))
      setCodeMode("editor")
      return
    }
    setConfig((prev) => ({
      ...prev,
      engine,
      dither: engine === "dither" && prev.dither < 0.2 ? 0.55 : prev.dither,
    }))
  }

  const handleExportPng = (
    width: number,
    height: number,
    targetConfig: ShaderConfig = config,
    suffix = "",
  ) => {
    const dataUrl = getShaderRenderer().exportPngDataUrl(
      targetConfig,
      width,
      height,
      timeRef.current,
    )
    if (!dataUrl) return
    const link = document.createElement("a")
    const slug = (name.trim() || "lumen-shader")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
    link.download = `${slug || "shader"}${suffix}-${width}x${height}.png`
    link.href = dataUrl
    link.click()
  }

  const regenerateVariations = React.useCallback(
    (base: ShaderConfig = config) => {
      setVariations([
        createStyleVariation(base, 1),
        createStyleVariation(base, 2),
        createStyleVariation(base, 3),
        createStyleVariation(base, 4),
      ])
    },
    [config],
  )

  const openVariationsDialog = () => {
    regenerateVariations(config)
    setVariationsOpen(true)
  }

  const handleCopyShareUrl = async () => {
    const encoded = encodeShaderShareParam(currentItem)
    if (!encoded || typeof window === "undefined") return
    const url = `${window.location.origin}/shaders?s=${encoded}`
    try {
      await navigator.clipboard.writeText(url)
      setCopiedShare(true)
      window.setTimeout(() => setCopiedShare(false), 1800)
    } catch {
      // Clipboard blocked
    }
  }

  const toggleFullscreen = async () => {
    const el = stageRef.current
    if (!el || typeof document === "undefined") return
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch {
      // Ignore fullscreen rejection
    }
  }

  React.useEffect(() => {
    const onFsChange = () => {
      setFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener("fullscreenchange", onFsChange)
    return () => document.removeEventListener("fullscreenchange", onFsChange)
  }, [])

  const handleSave = (mode: "save" | "remix") => {
    onSave(currentItem, mode)
    setSavedNotice(
      mode === "remix"
        ? "Saved remix to My Shaders"
        : isNew
          ? "Created & saved to My Shaders"
          : "Changes saved",
    )
    window.setTimeout(() => setSavedNotice(null), 2200)
  }

  const reactCode = React.useMemo(
    () => generateReactShaderCode(currentItem),
    [currentItem],
  )
  const glslSource = React.useMemo(
    () => getShaderFragmentSource(config),
    [config],
  )

  const canOverwrite = isNew || Boolean(initialShader.isCustom)

  const canvasOverlay = showOverlay ? (
    <Stack
      align="center"
      justify="center"
      gap="sm"
      className={cn(
        "pointer-events-none absolute inset-0 p-8 text-center",
        overlayDark ? "text-neutral-950" : "text-white",
      )}
    >
      <Badge
        variant="secondary"
        className="bg-background/80 text-foreground backdrop-blur-md"
      >
        <Sparkles aria-hidden />
        Live Overlay Preview
      </Badge>
      <h2 className="max-w-lg text-2xl font-medium tracking-tight sm:text-4xl">
        {overlayTitle}
      </h2>
      <p
        className={cn(
          "max-w-md text-xs sm:text-sm",
          overlayDark ? "text-neutral-800/85" : "text-white/80",
        )}
      >
        {overlaySubtitle}
      </p>
    </Stack>
  ) : null

  const canvasElement = (
    <>
      <ShaderCanvas
        config={config}
        active={config.animated}
        maxDpr={2}
        maxFps={60}
        onCompileError={setGlslError}
        timeRef={timeRef}
      />
      {canvasOverlay}
    </>
  )

  return (
    <Stack gap="lg">
      {/* Studio Top Bar */}
      <Stack direction="row" align="center" justify="between" wrap gap="sm">
        <Stack direction="row" align="center" gap="sm">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft data-icon="inline-start" />
            Back
          </Button>
          <Stack direction="row" align="center" gap="sm">
            <h1 className="text-base font-medium tracking-tight text-foreground sm:text-lg">
              {name.trim() || "Untitled Shader"}
            </h1>
            {isNew ? (
              <Badge color="jade">New</Badge>
            ) : initialShader.isCustom ? (
              <Badge color="indigo">Custom</Badge>
            ) : (
              <Badge variant="secondary">Preset</Badge>
            )}
          </Stack>
        </Stack>

        <Stack direction="row" align="center" wrap gap="sm">
          <Button variant="default" onClick={openVariationsDialog}>
            <Images data-icon="inline-start" />
            Generate images
          </Button>
          <Button
            variant="outline"
            onClick={() => setConfig((prev) => randomizeShaderConfig(prev))}
          >
            <Shuffle data-icon="inline-start" />
            Randomize
          </Button>
          <Button
            variant="outline"
            onClick={() => updateConfig("animated", !config.animated)}
          >
            {config.animated ? (
              <>
                <Pause data-icon="inline-start" />
                Pause
              </>
            ) : (
              <>
                <Play data-icon="inline-start" />
                Play
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleCopyShareUrl}>
            {copiedShare ? (
              <>
                <Check data-icon="inline-start" />
                Link copied
              </>
            ) : (
              <>
                <Link2 data-icon="inline-start" />
                Share URL
              </>
            )}
          </Button>
          <ButtonGroup>
            <Button
              variant="outline"
              onClick={() => handleExportPng(1920, 1080)}
            >
              <Download data-icon="inline-start" />
              PNG 1080p
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleExportPng(3840, 2160)}
            >
              4K PNG
            </Button>
          </ButtonGroup>
        </Stack>
      </Stack>

      {/* Main Split Studio */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_370px]">
        {/* Left: Live WebGL Canvas Stage inside LumenUI Card */}
        <Card
          ref={stageRef}
          className={cn(
            "relative flex w-full items-center justify-center p-0",
            fullscreen
              ? "h-dvh rounded-none border-0"
              : "min-h-[420px] sm:min-h-[540px] lg:h-[calc(100dvh-13rem)] lg:min-h-[580px]",
          )}
        >
          {aspect === "fill" ? (
            <div className="relative h-full w-full">{canvasElement}</div>
          ) : (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center p-8",
              )}
            >
              <AspectRatio
                ratio={aspect === "16:9" ? 16 / 9 : aspect === "4:3" ? 4 / 3 : 1}
                className={cn(
                  "rounded-2xl border border-border",
                  aspect === "1:1" ? "max-h-full max-w-[460px]" : "max-w-[92%]",
                )}
              >
                {canvasElement}
              </AspectRatio>
            </div>
          )}

          {/* Bottom Stage Controls using ToggleGroup + Button */}
          <Stack
            direction="row"
            align="center"
            justify="between"
            wrap
            gap="sm"
            className="absolute inset-x-4 bottom-4"
          >
            <ToggleGroup
              aria-label="Canvas aspect ratio"
              value={[aspect]}
              onValueChange={(next) => {
                if (next[0]) setAspect(next[0] as AspectMode)
              }}
              className="bg-background/85 backdrop-blur-md"
            >
              {(["fill", "16:9", "4:3", "1:1"] as AspectMode[]).map((mode) => (
                <Toggle
                  key={mode}
                  value={mode}
                  className="px-2.5 font-mono text-[10px] uppercase"
                >
                  {mode}
                </Toggle>
              ))}
            </ToggleGroup>

            <Stack direction="row" align="center" gap="xs">
              <Button
                variant={showOverlay ? "default" : "secondary"}
                size="sm"
                onClick={() => setShowOverlay((v) => !v)}
                className={
                  showOverlay ? undefined : "bg-background/85 backdrop-blur-md"
                }
              >
                <Eye data-icon="inline-start" />
                Overlay
              </Button>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="secondary"
                      size="icon-sm"
                      aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
                      onClick={toggleFullscreen}
                      className="bg-background/85 backdrop-blur-md"
                    >
                      {fullscreen ? <Minimize2 /> : <Maximize2 />}
                    </Button>
                  }
                />
                <TooltipContent>
                  {fullscreen ? "Exit fullscreen" : "Fullscreen"}
                </TooltipContent>
              </Tooltip>
            </Stack>
          </Stack>

          {/* GLSL Compile Error using LumenUI Alert */}
          {glslError ? (
            <Alert
              variant="destructive"
              className="absolute inset-x-4 top-4 w-auto shadow-md"
            >
              <AlertCircle />
              <AlertTitle>GLSL Compilation Error</AlertTitle>
              <AlertDescription className="font-mono whitespace-pre-wrap">
                {glslError}
              </AlertDescription>
            </Alert>
          ) : null}
        </Card>

        {/* Right: Inspector & Creator Controls inside LumenUI Card */}
        <Card size="sm" className="gap-0 py-0">
          <CardContent className="p-4">
            <Tabs defaultValue="shape">
              <TabsList className="w-full">
                <TabsTab value="shape" className="flex-1">
                  Shape
                </TabsTab>
                <TabsTab value="colors" className="flex-1">
                  Colors
                </TabsTab>
                <TabsTab value="finish" className="flex-1">
                  Finish
                </TabsTab>
                <TabsTab value="code" className="flex-1">
                  Code
                </TabsTab>
                <TabsIndicator />
              </TabsList>

              <TabsPanels className="mt-4">
              {/* SHAPE TAB */}
              <TabsPanel value="shape">
                <Stack gap="md">
                  <Stack gap="sm">
                    <Label>Shader Engine</Label>
                    <ScrollArea className="h-52 rounded-2xl">
                      <div className="grid grid-cols-2 gap-1.5 pr-2.5">
                        {SHADER_ENGINES.map((engine) => {
                          const active = config.engine === engine.id
                          return (
                            <Button
                              key={engine.id}
                              variant={active ? "default" : "outline"}
                              onClick={() => handleEngineChange(engine.id)}
                              className="h-auto flex-col items-start gap-0.5 rounded-2xl px-3 py-2 text-left"
                            >
                              <span className="text-xs font-medium">
                                {engine.label}
                              </span>
                              <span
                                className={cn(
                                  "text-[10px] font-normal",
                                  active
                                    ? "text-primary-foreground/80"
                                    : "text-muted-foreground",
                                )}
                              >
                                {engine.hint}
                              </span>
                            </Button>
                          )
                        })}
                      </div>
                    </ScrollArea>
                  </Stack>

                  <Card variant="secondary" size="sm" className="py-2.5">
                    <CardContent className="flex items-center justify-between px-3">
                      <Stack gap="none">
                        <Label htmlFor="shader-animate-switch">Animation</Label>
                        <span className="text-[11px] text-muted-foreground">
                          Continuous real-time motion
                        </span>
                      </Stack>
                      <Switch
                        id="shader-animate-switch"
                        checked={config.animated}
                        onCheckedChange={(checked) =>
                          updateConfig("animated", checked)
                        }
                        aria-label="Toggle shader animation"
                      />
                    </CardContent>
                  </Card>

                  <Stack gap="md">
                    <SliderControl
                      label="Speed"
                      value={config.speed}
                      min={0}
                      max={2.5}
                      step={0.05}
                      suffix="×"
                      onChange={(v) => updateConfig("speed", v)}
                    />
                    <SliderControl
                      label="Scale / Density"
                      value={config.scale}
                      min={0.4}
                      max={3.5}
                      step={0.05}
                      onChange={(v) => updateConfig("scale", v)}
                    />
                    <SliderControl
                      label="Distortion / Warp"
                      value={config.distortion}
                      min={0}
                      max={2.5}
                      step={0.05}
                      onChange={(v) => updateConfig("distortion", v)}
                    />
                    <SliderControl
                      label="Angle"
                      value={config.angle}
                      min={-3.14}
                      max={3.14}
                      step={0.05}
                      suffix=" rad"
                      onChange={(v) => updateConfig("angle", v)}
                    />
                    <SliderControl
                      label="Seed"
                      value={config.seed}
                      min={0}
                      max={40}
                      step={0.1}
                      onChange={(v) => updateConfig("seed", v)}
                    />
                  </Stack>
                </Stack>
              </TabsPanel>

              {/* COLORS TAB */}
              <TabsPanel value="colors">
                <Stack gap="md">
                  <Stack direction="row" align="center" justify="between">
                    <Label>Palette Stops</Label>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() =>
                        setConfig((prev) => ({
                          ...prev,
                          colors: [...prev.colors].sort(
                            () => Math.random() - 0.5,
                          ) as [string, string, string, string],
                        }))
                      }
                    >
                      <Shuffle data-icon="inline-start" />
                      Shuffle
                    </Button>
                  </Stack>

                  <div className="grid grid-cols-2 gap-2.5">
                    {([0, 1, 2, 3] as const).map((idx) => (
                      <Field key={idx}>
                        <FieldLabel className="font-normal text-muted-foreground">
                          Color {idx + 1}
                        </FieldLabel>
                        <ColorPicker
                          showValue
                          format="hex"
                          aria-label={`Color ${idx + 1}`}
                          value={config.colors[idx]}
                          onValueChange={(next) => updateColor(idx, next)}
                        />
                      </Field>
                    ))}
                  </div>

                  <Separator />

                  <Stack gap="sm">
                    <Label>Curated Palettes</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {CURATED_PALETTES.map((palette) => (
                        <Button
                          key={palette.name}
                          variant="outline"
                          size="sm"
                          onClick={() => updateConfig("colors", palette.colors)}
                          className="justify-between rounded-2xl px-2.5"
                        >
                          <span className="truncate text-[11px]">
                            {palette.name}
                          </span>
                          <span className="flex shrink-0 -space-x-1">
                            {palette.colors.map((c, i) => (
                              <span
                                key={`${palette.name}-${i}`}
                                className="size-3 rounded-full ring-1 ring-background"
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </Stack>
                </Stack>
              </TabsPanel>

              {/* FINISH TAB */}
              <TabsPanel value="finish">
                <Stack gap="md">
                  <SliderControl
                    label="Blur"
                    value={config.blur ?? 0}
                    min={0}
                    max={24}
                    step={0.5}
                    suffix=" px"
                    onChange={(v) => updateConfig("blur", v)}
                  />
                  <SliderControl
                    label="Film Grain"
                    value={config.grain}
                    min={0}
                    max={1}
                    step={0.02}
                    onChange={(v) => updateConfig("grain", v)}
                  />
                  <SliderControl
                    label="Bayer Dither"
                    value={config.dither}
                    min={0}
                    max={1}
                    step={0.02}
                    onChange={(v) => updateConfig("dither", v)}
                  />
                  <SliderControl
                    label="Chromatic Aberration"
                    value={config.aberration ?? 0}
                    min={0}
                    max={1}
                    step={0.02}
                    onChange={(v) => updateConfig("aberration", v)}
                  />
                  <SliderControl
                    label="Brightness"
                    value={config.brightness}
                    min={0.5}
                    max={1.6}
                    step={0.02}
                    onChange={(v) => updateConfig("brightness", v)}
                  />
                  <SliderControl
                    label="Contrast"
                    value={config.contrast}
                    min={0.5}
                    max={1.8}
                    step={0.02}
                    onChange={(v) => updateConfig("contrast", v)}
                  />
                  <SliderControl
                    label="Vignette"
                    value={config.vignette}
                    min={0}
                    max={1}
                    step={0.02}
                    onChange={(v) => updateConfig("vignette", v)}
                  />

                  <Separator />

                  <Stack gap="sm">
                    <Stack direction="row" align="center" justify="between">
                      <Label htmlFor="overlay-preview-switch">
                        Hero Overlay Preview
                      </Label>
                      <Switch
                        id="overlay-preview-switch"
                        checked={showOverlay}
                        onCheckedChange={setShowOverlay}
                        aria-label="Toggle hero text overlay"
                      />
                    </Stack>
                    {showOverlay ? (
                      <Stack gap="sm">
                        <Input
                          value={overlayTitle}
                          onChange={(e) => setOverlayTitle(e.target.value)}
                          placeholder="Heading text"
                          aria-label="Overlay heading"
                        />
                        <Input
                          value={overlaySubtitle}
                          onChange={(e) => setOverlaySubtitle(e.target.value)}
                          placeholder="Subtitle text"
                          aria-label="Overlay subtitle"
                        />
                        <Stack direction="row" align="center" justify="between">
                          <Label
                            htmlFor="overlay-dark-switch"
                            className="font-normal text-muted-foreground"
                          >
                            Dark ink text
                          </Label>
                          <Switch
                            id="overlay-dark-switch"
                            checked={overlayDark}
                            onCheckedChange={setOverlayDark}
                            aria-label="Use dark text for overlay"
                          />
                        </Stack>
                      </Stack>
                    ) : null}
                  </Stack>
                </Stack>
              </TabsPanel>

              {/* CODE / GLSL TAB */}
              <TabsPanel value="code">
                <Stack gap="sm">
                  <ToggleGroup
                    aria-label="Code view"
                    value={[codeMode]}
                    onValueChange={(next) => {
                      const val = next[0] as CodeTabMode | undefined
                      if (!val) return
                      setCodeMode(val)
                      if (val === "editor" && config.engine !== "custom") {
                        handleEngineChange("custom")
                      }
                    }}
                    className="w-full"
                  >
                    <Toggle value="react" className="flex-1">
                      React
                    </Toggle>
                    <Toggle value="glsl" className="flex-1">
                      GLSL
                    </Toggle>
                    <Toggle value="editor" className="flex-1">
                      Live Editor
                    </Toggle>
                  </ToggleGroup>

                  {codeMode === "react" ? (
                    <CodeBlock
                      title="ShaderBackground.tsx"
                      code={reactCode}
                      maxHeight="280px"
                    />
                  ) : codeMode === "glsl" ? (
                    <Stack gap="sm">
                      <CodeBlock
                        title={`${config.engine}.frag`}
                        code={glslSource}
                        maxHeight="240px"
                      />
                      {config.engine !== "custom" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEngineChange("custom")}
                        >
                          <Code2 data-icon="inline-start" />
                          Fork GLSL into Live Editor
                        </Button>
                      ) : null}
                    </Stack>
                  ) : (
                    <Stack gap="sm">
                      <Stack direction="row" align="center" justify="between">
                        <span className="text-[11px] text-muted-foreground">
                          Fragment Shader (GLSL ES 1.00)
                        </span>
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() =>
                            updateConfig("customGlsl", DEFAULT_CUSTOM_GLSL)
                          }
                        >
                          <RotateCcw data-icon="inline-start" />
                          Reset
                        </Button>
                      </Stack>
                      <Textarea
                        spellCheck={false}
                        value={config.customGlsl ?? DEFAULT_CUSTOM_GLSL}
                        onChange={(e) => {
                          setConfig((prev) => ({
                            ...prev,
                            engine: "custom",
                            customGlsl: e.target.value,
                          }))
                        }}
                        className="min-h-[260px] max-h-[300px] overflow-y-auto bg-background font-mono text-[11px] leading-4.5"
                        aria-label="Custom GLSL fragment shader"
                      />
                    </Stack>
                  )}
                </Stack>
              </TabsPanel>
              </TabsPanels>
            </Tabs>
          </CardContent>

          <Separator />

          {/* Save Metadata Footer */}
          <CardFooter className="flex-col items-stretch gap-2.5 p-4">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Shader name"
                aria-label="Shader name"
              />
              <Select
                value={category}
                onValueChange={(val) => {
                  if (val) setCategory(val as ShaderCategory)
                }}
              >
                <SelectTrigger className="w-[132px]">
                  <SelectValue>
                    {() =>
                      CATEGORY_OPTIONS.find((opt) => opt.value === category)
                        ?.label ?? "Smooth Blends"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description..."
              aria-label="Shader description"
            />

            <Stack direction="row" align="center" gap="sm" className="pt-1">
              {canOverwrite ? (
                <Button className="flex-1" onClick={() => handleSave("save")}>
                  <Save data-icon="inline-start" />
                  {isNew ? "Create shader" : "Save changes"}
                </Button>
              ) : (
                <Button className="flex-1" onClick={() => handleSave("remix")}>
                  <CopyPlus data-icon="inline-start" />
                  Save remix to collection
                </Button>
              )}

              {!isNew && initialShader.isCustom ? (
                <>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label="Duplicate as new shader"
                          onClick={() => handleSave("remix")}
                        >
                          <CopyPlus />
                        </Button>
                      }
                    />
                    <TooltipContent>Duplicate as new shader</TooltipContent>
                  </Tooltip>
                  {onDelete ? (
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Delete shader"
                            onClick={() => onDelete(initialShader)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 />
                          </Button>
                        }
                      />
                      <TooltipContent>Delete shader</TooltipContent>
                    </Tooltip>
                  ) : null}
                </>
              ) : null}
            </Stack>

            {savedNotice ? (
              <Alert variant="success" className="py-2">
                <Check />
                <AlertDescription>{savedNotice}</AlertDescription>
              </Alert>
            ) : null}
          </CardFooter>
        </Card>
      </div>

      {/* Image Variations Generator Dialog (100% LumenUI components) */}
      <Dialog open={variationsOpen} onOpenChange={setVariationsOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Generate images · {name.trim() || "Shader"}</DialogTitle>
            <DialogDescription>
              Four unique procedural compositions generated in this exact visual
              style and palette. Download any frame in HD or 4K PNG, or load it
              into the Studio.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {variations.map((variant, index) => (
              <Card key={`${variant.seed}-${index}`} size="sm" className="gap-2 p-2">
                <CardContent className="p-0">
                  <AspectRatio
                    ratio={
                      aspect === "1:1" ? 1 : aspect === "4:3" ? 4 / 3 : 16 / 9
                    }
                    className="rounded-xl border border-border"
                  >
                    <ShaderCanvas
                      config={variant}
                      active={false}
                      maxDpr={1.5}
                    />
                  </AspectRatio>
                </CardContent>
                <CardFooter className="justify-between gap-2 px-1 pt-0.5">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => {
                      setConfig(variant)
                      setVariationsOpen(false)
                    }}
                  >
                    Use in Studio
                  </Button>
                  <ButtonGroup>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() =>
                        handleExportPng(
                          1920,
                          1080,
                          variant,
                          `-v${index + 1}`,
                        )
                      }
                    >
                      <Download data-icon="inline-start" />
                      1080p
                    </Button>
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() =>
                        handleExportPng(
                          3840,
                          2160,
                          variant,
                          `-v${index + 1}`,
                        )
                      }
                    >
                      4K
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            ))}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => regenerateVariations(config)}
            >
              <Shuffle data-icon="inline-start" />
              Generate 4 new variations
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Stack>
  )
}
