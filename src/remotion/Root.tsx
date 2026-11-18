import { loadFont as loadInter } from "@remotion/google-fonts/Inter"
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono"
import type { ComponentType } from "react"
import { Composition, Folder } from "remotion"

import {
  LumenShowcase,
  SHOWCASE_DURATION,
  SHOWCASE_FPS,
  SHOWCASE_HEIGHT,
  SHOWCASE_SCENES,
  SHOWCASE_WIDTH,
} from "@/components/snap-cn/lumen-showcase"
import { StageModeContext, type StageMode } from "@/components/snap-cn/stage"

import "@/app/globals.css"

// On the site next/font sets these on <html>; here the Studio loads the same faces.
const inter = loadInter("normal", { weights: ["400", "500", "600"], subsets: ["latin"] })
const jetbrains = loadJetBrains("normal", { weights: ["400", "500"], subsets: ["latin"] })
if (typeof document !== "undefined") {
  document.documentElement.style.setProperty("--font-inter", inter.fontFamily)
  document.documentElement.style.setProperty("--font-jetbrains", jetbrains.fontFamily)
}

function inMode(Scene: ComponentType, mode: StageMode) {
  function Moded() {
    return (
      <StageModeContext.Provider value={mode}>
        <Scene />
      </StageModeContext.Provider>
    )
  }
  return Moded
}

const scenes = SHOWCASE_SCENES.map((scene) => ({ ...scene, component: inMode(scene.component, "light") }))

const video = { fps: SHOWCASE_FPS, width: SHOWCASE_WIDTH, height: SHOWCASE_HEIGHT }

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="LumenShowcase"
        component={LumenShowcase}
        durationInFrames={SHOWCASE_DURATION}
        defaultProps={{ mode: "light" as StageMode }}
        {...video}
      />
      <Composition
        id="LumenShowcaseDark"
        component={LumenShowcase}
        durationInFrames={SHOWCASE_DURATION}
        defaultProps={{ mode: "dark" as StageMode }}
        {...video}
      />
      <Folder name="Scenes">
        {scenes.map((scene) => (
          <Composition
            key={scene.id}
            id={scene.id}
            component={scene.component}
            durationInFrames={scene.durationInFrames}
            {...video}
          />
        ))}
      </Folder>
    </>
  )
}
