import assert from "node:assert/strict"
import { describe, test } from "node:test"

import { decodePreset, defaultPreset, encodePreset } from "./theme-preset.ts"

describe("theme preset links", () => {
  test("round-trips the colors, type, radius, and shadow", () => {
    const preset = {
      ...defaultPreset,
      light: { ...defaultPreset.light, primary: "#ff0000" },
      dark: { ...defaultPreset.dark, primary: "#00ff00" },
      radius: 1,
      fontSize: 18,
      sans: "system" as const,
      heading: "fraunces" as const,
      shadow: "strong" as const,
    }

    assert.deepEqual(decodePreset(encodePreset(preset)), preset)
  })

  test("drops a color that would break out of the stylesheet", () => {
    const preset = {
      ...defaultPreset,
      light: {
        ...defaultPreset.light,
        primary: "red; } body { background: url(https://evil.example)",
      },
    }

    assert.equal(decodePreset(encodePreset(preset)), undefined)
  })

  test("drops a payload that is not a preset", () => {
    assert.equal(decodePreset("not-a-preset"), undefined)
    assert.equal(decodePreset(encodePreset({ ...defaultPreset, radius: 4 })), undefined)
  })
})
