"use client"

import {
  getShaderFragmentSource,
  hexToRgbVec3,
  type ShaderConfig,
} from "@/lib/shaders"

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

type UniformMap = {
  u_time: WebGLUniformLocation | null
  u_resolution: WebGLUniformLocation | null
  u_color1: WebGLUniformLocation | null
  u_color2: WebGLUniformLocation | null
  u_color3: WebGLUniformLocation | null
  u_color4: WebGLUniformLocation | null
  u_speed: WebGLUniformLocation | null
  u_scale: WebGLUniformLocation | null
  u_distortion: WebGLUniformLocation | null
  u_grain: WebGLUniformLocation | null
  u_dither: WebGLUniformLocation | null
  u_aberration: WebGLUniformLocation | null
  u_brightness: WebGLUniformLocation | null
  u_contrast: WebGLUniformLocation | null
  u_vignette: WebGLUniformLocation | null
  u_angle: WebGLUniformLocation | null
  u_seed: WebGLUniformLocation | null
}

type CompiledProgram = {
  program: WebGLProgram
  positionLocation: number
  uniforms: UniformMap
}

type CompileResult =
  | { ok: true; compiled: CompiledProgram }
  | { ok: false; error: string }

/**
 * Single shared offscreen WebGL renderer so a gallery of 12+ live shaders uses
 * only ONE WebGL context (preventing browser context eviction limits) and can
 * also export crisp 2K/4K PNG snapshots on demand.
 */
class PooledShaderRenderer {
  private canvas: HTMLCanvasElement | null = null
  private gl: WebGLRenderingContext | null = null
  private quadBuffer: WebGLBuffer | null = null
  private vertexShader: WebGLShader | null = null
  private cache = new Map<string, CompileResult>()
  private supported: boolean | null = null

  private ensureContext(): WebGLRenderingContext | null {
    if (this.supported === false) return null
    if (this.gl && !this.gl.isContextLost()) return this.gl

    if (typeof document === "undefined") return null

    const canvas = this.canvas ?? document.createElement("canvas")
    this.canvas = canvas

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    })

    if (!gl) {
      this.supported = false
      return null
    }

    this.supported = true
    this.gl = gl
    this.cache.clear()

    const vs = gl.createShader(gl.VERTEX_SHADER)
    if (!vs) {
      this.supported = false
      return null
    }
    gl.shaderSource(vs, VERTEX_SHADER_SOURCE)
    gl.compileShader(vs)
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      this.supported = false
      return null
    }
    this.vertexShader = vs

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    )
    this.quadBuffer = buffer

    return gl
  }

  private getProgram(
    gl: WebGLRenderingContext,
    fragmentSource: string,
  ): CompileResult {
    const cached = this.cache.get(fragmentSource)
    if (cached) return cached

    // Keep cache bounded when users type custom GLSL
    if (this.cache.size > 48) {
      const oldestKey = this.cache.keys().next().value
      if (oldestKey !== undefined) {
        const oldest = this.cache.get(oldestKey)
        if (oldest?.ok) gl.deleteProgram(oldest.compiled.program)
        this.cache.delete(oldestKey)
      }
    }

    const fs = gl.createShader(gl.FRAGMENT_SHADER)
    if (!fs || !this.vertexShader) {
      return { ok: false, error: "Could not allocate WebGL fragment shader." }
    }

    gl.shaderSource(fs, fragmentSource)
    gl.compileShader(fs)

    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(fs) || "Fragment shader compilation failed."
      gl.deleteShader(fs)
      const result: CompileResult = { ok: false, error: error.trim() }
      this.cache.set(fragmentSource, result)
      return result
    }

    const program = gl.createProgram()
    if (!program) {
      gl.deleteShader(fs)
      return { ok: false, error: "Could not create WebGL program." }
    }

    gl.attachShader(program, this.vertexShader)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.deleteShader(fs)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const error = gl.getProgramInfoLog(program) || "Shader program link failed."
      gl.deleteProgram(program)
      const result: CompileResult = { ok: false, error: error.trim() }
      this.cache.set(fragmentSource, result)
      return result
    }

    const compiled: CompiledProgram = {
      program,
      positionLocation: gl.getAttribLocation(program, "a_position"),
      uniforms: {
        u_time: gl.getUniformLocation(program, "u_time"),
        u_resolution: gl.getUniformLocation(program, "u_resolution"),
        u_color1: gl.getUniformLocation(program, "u_color1"),
        u_color2: gl.getUniformLocation(program, "u_color2"),
        u_color3: gl.getUniformLocation(program, "u_color3"),
        u_color4: gl.getUniformLocation(program, "u_color4"),
        u_speed: gl.getUniformLocation(program, "u_speed"),
        u_scale: gl.getUniformLocation(program, "u_scale"),
        u_distortion: gl.getUniformLocation(program, "u_distortion"),
        u_grain: gl.getUniformLocation(program, "u_grain"),
        u_dither: gl.getUniformLocation(program, "u_dither"),
        u_aberration: gl.getUniformLocation(program, "u_aberration"),
        u_brightness: gl.getUniformLocation(program, "u_brightness"),
        u_contrast: gl.getUniformLocation(program, "u_contrast"),
        u_vignette: gl.getUniformLocation(program, "u_vignette"),
        u_angle: gl.getUniformLocation(program, "u_angle"),
        u_seed: gl.getUniformLocation(program, "u_seed"),
      },
    }

    const result: CompileResult = { ok: true, compiled }
    this.cache.set(fragmentSource, result)
    return result
  }

  private drawToInternal(
    config: ShaderConfig,
    width: number,
    height: number,
    timeSeconds: number,
  ): { ok: true; canvas: HTMLCanvasElement } | { ok: false; error: string | null } {
    const gl = this.ensureContext()
    if (!gl || !this.canvas || !this.quadBuffer) {
      return { ok: false, error: null }
    }

    const w = Math.max(2, Math.floor(width))
    const h = Math.max(2, Math.floor(height))
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w
      this.canvas.height = h
    }

    const fragmentSource = getShaderFragmentSource(config)
    const programResult = this.getProgram(gl, fragmentSource)
    if (!programResult.ok) {
      return { ok: false, error: programResult.error }
    }

    const { program, positionLocation, uniforms } = programResult.compiled
    gl.viewport(0, 0, w, h)
    gl.useProgram(program)

    gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer)
    if (positionLocation >= 0) {
      gl.enableVertexAttribArray(positionLocation)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
    }

    const [c1, c2, c3, c4] = config.colors.map(hexToRgbVec3)
    if (uniforms.u_resolution) gl.uniform2f(uniforms.u_resolution, w, h)
    if (uniforms.u_time) gl.uniform1f(uniforms.u_time, timeSeconds)
    if (uniforms.u_color1) gl.uniform3fv(uniforms.u_color1, c1)
    if (uniforms.u_color2) gl.uniform3fv(uniforms.u_color2, c2)
    if (uniforms.u_color3) gl.uniform3fv(uniforms.u_color3, c3)
    if (uniforms.u_color4) gl.uniform3fv(uniforms.u_color4, c4)
    if (uniforms.u_speed) gl.uniform1f(uniforms.u_speed, config.speed)
    if (uniforms.u_scale) gl.uniform1f(uniforms.u_scale, config.scale)
    if (uniforms.u_distortion) gl.uniform1f(uniforms.u_distortion, config.distortion)
    if (uniforms.u_grain) gl.uniform1f(uniforms.u_grain, config.grain)
    if (uniforms.u_dither) gl.uniform1f(uniforms.u_dither, config.dither)
    if (uniforms.u_aberration) {
      gl.uniform1f(uniforms.u_aberration, config.aberration ?? 0)
    }
    if (uniforms.u_brightness) gl.uniform1f(uniforms.u_brightness, config.brightness)
    if (uniforms.u_contrast) gl.uniform1f(uniforms.u_contrast, config.contrast)
    if (uniforms.u_vignette) gl.uniform1f(uniforms.u_vignette, config.vignette)
    if (uniforms.u_angle) gl.uniform1f(uniforms.u_angle, config.angle)
    if (uniforms.u_seed) gl.uniform1f(uniforms.u_seed, config.seed)

    gl.drawArrays(gl.TRIANGLES, 0, 3)
    return { ok: true, canvas: this.canvas }
  }

  private blitWithBlur(
    ctx: CanvasRenderingContext2D,
    source: HTMLCanvasElement,
    width: number,
    height: number,
    blurAmount: number,
  ) {
    if (blurAmount > 0.01) {
      const scaleFactor = Math.min(width, height) / 1000
      const blurPx = blurAmount * Math.max(0.45, scaleFactor)
      const pad = Math.ceil(blurPx * 2.2)
      ctx.save()
      ctx.filter = "none"
      ctx.drawImage(source, 0, 0, width, height)
      ctx.filter = `blur(${blurPx.toFixed(2)}px)`
      ctx.drawImage(source, -pad, -pad, width + pad * 2, height + pad * 2)
      ctx.restore()
    } else {
      ctx.filter = "none"
      ctx.drawImage(source, 0, 0, width, height)
    }
  }

  renderToCanvas(
    target: HTMLCanvasElement,
    config: ShaderConfig,
    timeSeconds: number,
  ): { ok: boolean; error: string | null } {
    const ctx = target.getContext("2d")
    if (!ctx) return { ok: false, error: null }

    const res = this.drawToInternal(config, target.width, target.height, timeSeconds)
    if (!res.ok) return { ok: false, error: res.error }

    this.blitWithBlur(
      ctx,
      res.canvas,
      target.width,
      target.height,
      config.blur ?? 0,
    )
    return { ok: true, error: null }
  }

  exportPngDataUrl(
    config: ShaderConfig,
    width: number,
    height: number,
    timeSeconds = 2.5,
  ): string | null {
    const res = this.drawToInternal(config, width, height, timeSeconds)
    if (!res.ok) return null
    try {
      const blurAmount = config.blur ?? 0
      if (blurAmount > 0.01 && typeof document !== "undefined") {
        const exportCanvas = document.createElement("canvas")
        exportCanvas.width = width
        exportCanvas.height = height
        const ctx = exportCanvas.getContext("2d")
        if (ctx) {
          this.blitWithBlur(ctx, res.canvas, width, height, blurAmount)
          return exportCanvas.toDataURL("image/png")
        }
      }
      return res.canvas.toDataURL("image/png")
    } catch {
      return null
    }
  }
}

let singleton: PooledShaderRenderer | null = null

export function getShaderRenderer(): PooledShaderRenderer {
  if (!singleton) {
    singleton = new PooledShaderRenderer()
  }
  return singleton
}

type Subscriber = (timeSeconds: number) => void

const subscribers = new Set<Subscriber>()
let rafId: number | null = null
let startTime = 0

function tick(now: number) {
  if (subscribers.size === 0) {
    rafId = null
    return
  }
  if (!startTime) startTime = now
  const elapsed = (now - startTime) / 1000
  for (const fn of subscribers) {
    fn(elapsed)
  }
  rafId = window.requestAnimationFrame(tick)
}

export function subscribeShaderFrame(fn: Subscriber): () => void {
  subscribers.add(fn)
  if (rafId === null && typeof window !== "undefined") {
    rafId = window.requestAnimationFrame(tick)
  }
  return () => {
    subscribers.delete(fn)
    if (subscribers.size === 0 && rafId !== null && typeof window !== "undefined") {
      window.cancelAnimationFrame(rafId)
      rafId = null
    }
  }
}
