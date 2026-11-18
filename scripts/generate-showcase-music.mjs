// Writes the showcase video's soundtrack: an original, synthesised piece, so it is
// ours to ship. Calm and precise like the design system: a soft pad, a light
// plucked arpeggio, a sub bass and a discreet pulse, at 96 BPM over
// Cmaj9 → Am9 → Fmaj9 → G6/9.
//
//   node scripts/generate-showcase-music.mjs [seconds]
//
// Renders a WAV in memory, normalises it to −16 LUFS / −1 dBTP and encodes it to
// public/video/lumen-theme.mp3 with the ffmpeg Remotion bundles (`npx remotion
// ffmpeg`), so nothing else is needed.

import { spawnSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"

const SECONDS = Number(process.argv[2] ?? 40)
const RATE = 44100
const BPM = 96
const BEAT = 60 / BPM
const BAR = BEAT * 4
const N = Math.ceil(SECONDS * RATE)
const OUT = path.join(process.cwd(), "public/video/lumen-theme.mp3")

const left = new Float32Array(N)
const right = new Float32Array(N)
const sendL = new Float32Array(N)
const sendR = new Float32Array(N)

const hz = (midi) => 440 * 2 ** ((midi - 69) / 12)
// Deterministic noise, so every run writes the same file.
let seed = 0x2f6b
const noise = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff
  return (seed / 0x7fffffff) * 2 - 1
}

/** Voicings, low to high. */
const CHORDS = [
  [48, 55, 59, 62, 64], // Cmaj9
  [45, 52, 55, 59, 60], // Am9
  [41, 48, 52, 55, 57], // Fmaj9
  [43, 50, 52, 57, 59], // G6/9
]
const chordAt = (bar) => CHORDS[bar % CHORDS.length]
const BARS = Math.ceil(SECONDS / BAR)

/** Where each part plays, by bar: an intro of pad alone, then the arpeggio, then the pulse. */
const ARP_FROM = 1
const PULSE_FROM = 4
const PULSE_TO = BARS - 2

function add(buffer, start, samples, gain) {
  const s = Math.floor(start * RATE)
  for (let i = 0; i < samples.length && s + i < N; i++) if (s + i >= 0) buffer[s + i] += samples[i] * gain
}

/** A pad voice: three detuned soft oscillators, slow in and out, one-pole low-passed. */
function pad(freq, dur) {
  const len = Math.floor((dur + 1.6) * RATE)
  const out = new Float32Array(len)
  const detune = [-0.006, 0, 0.0055]
  let lp = 0
  const a = 1 - Math.exp((-2 * Math.PI * 1500) / RATE)
  for (let i = 0; i < len; i++) {
    const t = i / RATE
    let v = 0
    for (const d of detune) {
      const ph = 2 * Math.PI * freq * (1 + d) * t
      v += Math.sin(ph) + 0.25 * Math.sin(3 * ph) + 0.1 * Math.sin(5 * ph)
    }
    const env = Math.min(1, t / 1.2) * (t > dur ? Math.exp(-(t - dur) / 0.5) : 1)
    lp += a * (v / 3 - lp)
    out[i] = lp * env
  }
  return out
}

/** A pluck: sine with a touch of second harmonic and a quick bright attack. */
function pluck(freq) {
  const len = Math.floor(0.9 * RATE)
  const out = new Float32Array(len)
  for (let i = 0; i < len; i++) {
    const t = i / RATE
    const env = Math.min(1, t / 0.004) * Math.exp(-t / 0.22)
    const ph = 2 * Math.PI * freq * t
    out[i] = (Math.sin(ph) + 0.35 * Math.sin(2 * ph) * Math.exp(-t / 0.05)) * env
  }
  return out
}

function sub(freq, dur) {
  const len = Math.floor((dur + 0.3) * RATE)
  const out = new Float32Array(len)
  for (let i = 0; i < len; i++) {
    const t = i / RATE
    const env = Math.min(1, t / 0.03) * (t > dur ? Math.exp(-(t - dur) / 0.08) : 1)
    out[i] = Math.sin(2 * Math.PI * freq * t) * env
  }
  return out
}

/** A soft kick: a sine dropping from 90 to 45 Hz. */
function kick() {
  const len = Math.floor(0.35 * RATE)
  const out = new Float32Array(len)
  let ph = 0
  for (let i = 0; i < len; i++) {
    const t = i / RATE
    ph += (2 * Math.PI * (45 + 45 * Math.exp(-t / 0.04))) / RATE
    out[i] = Math.sin(ph) * Math.exp(-t / 0.12)
  }
  return out
}

/** A tick: high-passed noise, very short. */
function tick() {
  const len = Math.floor(0.05 * RATE)
  const out = new Float32Array(len)
  let prev = 0
  for (let i = 0; i < len; i++) {
    const n = noise()
    out[i] = (n - prev) * Math.exp(-(i / RATE) / 0.012)
    prev = n
  }
  return out
}

for (let bar = 0; bar < BARS; bar++) {
  const t0 = bar * BAR
  const chord = chordAt(bar)

  // Pad: every voice, panned across the field, to the reverb as well.
  chord.forEach((note, v) => {
    const voice = pad(hz(note), BAR)
    const pan = (v / (chord.length - 1)) * 0.8 - 0.4
    add(left, t0, voice, 0.05 * (1 - pan))
    add(right, t0, voice, 0.05 * (1 + pan))
    add(sendL, t0, voice, 0.04)
    add(sendR, t0, voice, 0.04)
  })

  if (bar >= ARP_FROM) {
    // Sub bass on the root, two notes a bar.
    const root = chord[0] - 12
    add(left, t0, sub(hz(root), BEAT * 1.8), 0.15)
    add(right, t0, sub(hz(root), BEAT * 1.8), 0.15)
    add(left, t0 + BEAT * 2, sub(hz(root), BEAT * 1.6), 0.12)
    add(right, t0 + BEAT * 2, sub(hz(root), BEAT * 1.6), 0.12)

    // Arpeggio in eighths through the upper voices, an octave up, alternating sides.
    const tones = [chord[1], chord[2], chord[3], chord[4]].map((n) => n + 12)
    const pattern = [0, 1, 2, 3, 2, 1, 3, 2]
    pattern.forEach((k, step) => {
      const t = t0 + step * (BEAT / 2)
      const note = pluck(hz(tones[k]))
      const side = step % 2 === 0 ? 0.65 : 1.35
      const lift = step === 0 ? 1.15 : 1
      add(left, t, note, 0.06 * side * lift)
      add(right, t, note, 0.06 * (2 - side) * lift)
      add(sendL, t, note, 0.05)
      add(sendR, t, note, 0.05)
    })
  }

  if (bar >= PULSE_FROM && bar < PULSE_TO) {
    for (const beat of [0, 2]) {
      add(left, t0 + beat * BEAT, kick(), 0.32)
      add(right, t0 + beat * BEAT, kick(), 0.32)
    }
    for (let off = 0; off < 4; off++) {
      const t = t0 + off * BEAT + BEAT / 2
      add(left, t, tick(), 0.05)
      add(right, t, tick(), 0.035)
    }
  }
}

// Ping-pong delay on the send, three sixteenths, then a small Schroeder reverb.
function delay(inL, inR) {
  const d = Math.floor(BEAT * 0.75 * RATE)
  const outL = new Float32Array(N)
  const outR = new Float32Array(N)
  for (let i = 0; i < N; i++) {
    outL[i] = inL[i] + (i >= d ? outR[i - d] * 0.38 : 0)
    outR[i] = inR[i] + (i >= d ? outL[i - d] * 0.38 : 0)
  }
  return [outL, outR]
}

function reverb(input, spread) {
  const combs = [1557, 1617, 1491, 1422].map((n) => n + spread)
  const out = new Float32Array(N)
  for (const len of combs) {
    const buf = new Float32Array(len)
    let idx = 0
    let lp = 0
    for (let i = 0; i < N; i++) {
      const y = buf[idx]
      lp = y * 0.7 + lp * 0.3
      buf[idx] = input[i] + lp * 0.84
      out[i] += y / combs.length
      idx = (idx + 1) % len
    }
  }
  for (const len of [225 + spread, 556 + spread]) {
    const buf = new Float32Array(len)
    let idx = 0
    for (let i = 0; i < N; i++) {
      const b = buf[idx]
      const y = -out[i] + b
      buf[idx] = out[i] + b * 0.5
      out[i] = y
      idx = (idx + 1) % len
    }
  }
  return out
}

const [dl, dr] = delay(sendL, sendR)
const wetL = reverb(dl, 0)
const wetR = reverb(dr, 23)

// Mix, fade in over a second and out over the last three, soft-clip and normalise.
const mix = new Float32Array(N * 2)
let peak = 0
for (let i = 0; i < N; i++) {
  const t = i / RATE
  const fade = Math.min(1, t / 1) * Math.min(1, (SECONDS - t) / 3)
  const l = Math.tanh((left[i] + wetL[i] * 0.9) * 1.2) * fade
  const r = Math.tanh((right[i] + wetR[i] * 0.9) * 1.2) * fade
  mix[2 * i] = l
  mix[2 * i + 1] = r
  peak = Math.max(peak, Math.abs(l), Math.abs(r))
}
const gain = peak > 0 ? 0.89 / peak : 1

const wav = Buffer.alloc(44 + N * 4)
wav.write("RIFF", 0)
wav.writeUInt32LE(36 + N * 4, 4)
wav.write("WAVEfmt ", 8)
wav.writeUInt32LE(16, 16)
wav.writeUInt16LE(1, 20)
wav.writeUInt16LE(2, 22)
wav.writeUInt32LE(RATE, 24)
wav.writeUInt32LE(RATE * 4, 28)
wav.writeUInt16LE(4, 32)
wav.writeUInt16LE(16, 34)
wav.write("data", 36)
wav.writeUInt32LE(N * 4, 40)
for (let i = 0; i < N * 2; i++) {
  wav.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(mix[i] * gain * 32767))), 44 + i * 2)
}

const dir = mkdtempSync(path.join(tmpdir(), "lumen-theme-"))
const wavPath = path.join(dir, "lumen-theme.wav")
writeFileSync(wavPath, wav)
mkdirSync(path.dirname(OUT), { recursive: true })
// Loudness to today's web norm, in two passes so the gain is exact and linear:
// −16 LUFS integrated, true peak −1.5 dBTP so it stays under −1 after MP3 encoding.
const TARGET = { I: -16, TP: -1.5, LRA: 11 }
const ffmpeg = (args) =>
  spawnSync("npx", ["remotion", "ffmpeg", "-hide_banner", "-nostats", ...args], { encoding: "utf8" })
const loudnorm = `loudnorm=I=${TARGET.I}:TP=${TARGET.TP}:LRA=${TARGET.LRA}`
const pass1 = ffmpeg(["-i", wavPath, "-af", `${loudnorm}:print_format=json`, "-f", "null", "-"])
const measured = JSON.parse(pass1.stderr.slice(pass1.stderr.lastIndexOf("{"), pass1.stderr.lastIndexOf("}") + 1))
const pass2 = ffmpeg([
  "-y",
  "-loglevel",
  "error",
  "-i",
  wavPath,
  "-af",
  `${loudnorm}:measured_I=${measured.input_i}:measured_TP=${measured.input_tp}:measured_LRA=${measured.input_lra}:measured_thresh=${measured.input_thresh}:offset=${measured.target_offset}:linear=true`,
  "-ar",
  String(RATE),
  "-codec:a",
  "libmp3lame",
  "-b:a",
  "192k",
  OUT,
])
if (pass2.status !== 0) throw new Error(pass2.stderr)
rmSync(dir, { recursive: true, force: true })
console.log(`Wrote ${path.relative(process.cwd(), OUT)} (${SECONDS}s, ${BPM} BPM, ${TARGET.I} LUFS)`)
