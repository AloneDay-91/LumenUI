"use client"

import type { ReactNode } from "react"

import { AiAndNumbers } from "@/components/blocks/lumen/AiAndNumbers"
import { AskPanel } from "@/components/blocks/lumen/AskPanel"
import { BandHero } from "@/components/blocks/lumen/BandHero"
import { CliFeature } from "@/components/blocks/lumen/CliFeature"
import { CommandMenu } from "@/components/blocks/lumen/CommandMenu"
import { ComponentCarousel } from "@/components/blocks/lumen/ComponentCarousel"
import { ComponentIndex } from "@/components/blocks/lumen/ComponentIndex"
import { ComposedFeature } from "@/components/blocks/lumen/ComposedFeature"
import { CopyPaste } from "@/components/blocks/lumen/CopyPaste"
import { DocsHeader } from "@/components/blocks/lumen/DocsHeader"
import { DocsHero } from "@/components/blocks/lumen/DocsHero"
import { DocsSidebar } from "@/components/blocks/lumen/DocsSidebar"
import { ExamplesBento } from "@/components/blocks/lumen/ExamplesBento"
import { FormStates } from "@/components/blocks/lumen/FormStates"
import { FormsFeature } from "@/components/blocks/lumen/FormsFeature"
import { InstallationCta } from "@/components/blocks/lumen/InstallationCta"
import { LandingHero } from "@/components/blocks/lumen/LandingHero"
import { LandingShowcase } from "@/components/blocks/lumen/LandingShowcase"
import { MegaHeader } from "@/components/blocks/lumen/MegaHeader"
import { NotFound } from "@/components/blocks/lumen/NotFound"
import { PaintingHero } from "@/components/blocks/lumen/PaintingHero"
import { PaletteHero } from "@/components/blocks/lumen/PaletteHero"
import { SiteFooter } from "@/components/blocks/lumen/SiteFooter"
import { SiteHeader } from "@/components/blocks/lumen/SiteHeader"
import { SplitHero } from "@/components/blocks/lumen/SplitHero"
import { StackMarquee } from "@/components/blocks/lumen/StackMarquee"
import { StartCta } from "@/components/blocks/lumen/StartCta"
import { Tokens } from "@/components/blocks/lumen/Tokens"
import { TokensFeature } from "@/components/blocks/lumen/TokensFeature"
import { UpdateBanner } from "@/components/blocks/lumen/UpdateBanner"
import type { BlockCategorySlug } from "@/lib/block-categories"
import { lumenBlockMeta } from "@/lib/lumen-blocks"

export type LumenBlock = {
  id: string
  kit: BlockCategorySlug
  title: string
  description: string
  command: string
  code: string
  full?: boolean
  preview: ReactNode
}

/** Room around a section that was cut from a wider page. */
function Pad({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl">{children}</div>
}

const previews: Record<string, ReactNode> = {
  "site-header": <SiteHeader />,
  "mega-header": <MegaHeader />,
  "update-banner": <UpdateBanner />,
  "docs-hero": <DocsHero />,
  "landing-hero": <LandingHero />,
  painting: <PaintingHero />,
  split: <SplitHero />,
  band: <BandHero />,
  "palette-hero": <PaletteHero />,
  "stack-marquee": <StackMarquee />,
  "cli-feature": <Pad><CliFeature /></Pad>,
  "component-carousel": <Pad><ComponentCarousel /></Pad>,
  "ai-and-numbers": <Pad><AiAndNumbers /></Pad>,
  "copy-paste": <CopyPaste />,
  "form-states": <FormStates />,
  "forms-feature": <Pad><div className="px-6 py-12"><FormsFeature /></div></Pad>,
  "composed-feature": <Pad><div className="px-6 py-12"><ComposedFeature /></div></Pad>,
  tokens: <Tokens />,
  "tokens-feature": <Pad><div className="px-6 py-12"><TokensFeature /></div></Pad>,
  "component-index": <ComponentIndex />,
  "landing-showcase": <Pad><div className="px-6 py-12"><LandingShowcase /></div></Pad>,
  "examples-bento": <Pad><div className="px-6 py-12"><ExamplesBento /></div></Pad>,
  "start-cta": <StartCta />,
  installation: <div className="p-4 sm:p-6"><InstallationCta /></div>,
  "site-footer": <SiteFooter />,
  "docs-header": <DocsHeader />,
  "docs-sidebar": <DocsSidebar />,
  "command-menu": <CommandMenu />,
  "ask-panel": <AskPanel />,
  "not-found": <NotFound />,
}

/** Code is empty here: the category page reads each block's files and passes them in. */
export const lumenBlocks: LumenBlock[] = lumenBlockMeta.map((meta) => ({
  id: meta.id,
  kit: meta.kit,
  title: meta.title,
  description: meta.description,
  command: meta.command,
  code: "",
  full: true,
  preview: previews[meta.id],
}))
