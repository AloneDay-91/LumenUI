import type { BlockCategorySlug } from "@/lib/block-categories"

const CLI = "npx @aloneday/lumenui@latest add"

/**
 * Where the Lumen kit sources live. Each block is its own file, frozen: it
 * imports only components/ui and its siblings here, never the site, so
 * changing the landing or the docs never changes a block.
 */
export const LUMEN_BLOCKS_DIR = "src/components/blocks/lumen"

export type LumenBlockMeta = {
  id: string
  kit: BlockCategorySlug
  title: string
  description: string
  command: string
  /** Files shown in the Code tab, the block first. Siblings it imports follow. */
  files: string[]
}

function block(
  meta: Omit<LumenBlockMeta, "command"> & { components: string[] },
): LumenBlockMeta {
  const { components, ...rest } = meta
  return { ...rest, command: `${CLI} ${components.join(" ")}` }
}

export const lumenBlockMeta: LumenBlockMeta[] = [
  // Headers
  block({
    id: "site-header",
    kit: "headers",
    title: "Site header",
    description: "Wordmark, section links, a theme toggle, and Documentation.",
    components: ["button", "theme-toggle", "drawer", "separator"],
    files: ["SiteHeader.tsx", "brand.tsx", "mobile-nav.tsx"],
  }),
  block({
    id: "mega-header",
    kit: "headers",
    title: "Mega menu header",
    description: "The landing bar from 1.2: each section opens a full-width panel with links and a card.",
    components: ["navigation-menu", "button", "drawer", "separator", "theme-toggle"],
    files: ["MegaHeader.tsx", "brand.tsx", "mobile-nav.tsx"],
  }),

  // Banners
  block({
    id: "update-banner",
    kit: "banners",
    title: "Update banner",
    description: "The bar above every page that names the latest release and links the changelog.",
    components: ["button"],
    files: ["UpdateBanner.tsx"],
  }),

  // Heroes
  block({
    id: "docs-hero",
    kit: "heroes",
    title: "Docs hero",
    description: "The 1.2 landing: the sentence on the left, then a flat preview of a docs page on the painting.",
    components: ["button", "card", "tabs"],
    files: ["DocsHero.tsx", "brand.tsx"],
  }),
  block({
    id: "landing-hero",
    kit: "heroes",
    title: "Landing hero",
    description: "The sentence, the init command, and the stack, centered.",
    components: ["button"],
    files: ["LandingHero.tsx", "hero-copy.tsx", "StackMarks.tsx"],
  }),
  block({
    id: "painting",
    kit: "heroes",
    title: "Painting",
    description: "The same hero, with the landing painting behind the type.",
    components: ["button"],
    files: ["PaintingHero.tsx", "hero-copy.tsx", "brand.tsx"],
  }),
  block({
    id: "split",
    kit: "heroes",
    title: "Split",
    description: "The sentence on the left, the painting as a panel on the right.",
    components: ["button"],
    files: ["SplitHero.tsx", "hero-copy.tsx", "brand.tsx"],
  }),
  block({
    id: "band",
    kit: "heroes",
    title: "Band",
    description: "The type stays on the page color. The painting appears underneath.",
    components: ["button"],
    files: ["BandHero.tsx", "hero-copy.tsx", "brand.tsx"],
  }),
  block({
    id: "palette-hero",
    kit: "heroes",
    title: "Palette hero",
    description: "The 1.0 landing: a command palette that searches the catalog, next to a product screen.",
    components: ["button", "badge", "kbd", "card", "table"],
    files: ["PaletteHero.tsx", "use-copy.ts"],
  }),

  // Logo clouds
  block({
    id: "stack-marquee",
    kit: "logos",
    title: "Stack marquee",
    description: "Base UI, Tailwind, React, and the frameworks, scrolling under the hero.",
    components: ["marquee"],
    files: ["StackMarquee.tsx", "StackMarks.tsx", "FrameworkMarks.tsx"],
  }),

  // Features
  block({
    id: "cli-feature",
    kit: "features",
    title: "CLI",
    description: "What init and add write, with the files they leave in the repo, on the painting.",
    components: ["badge", "separator", "card"],
    files: ["CliFeature.tsx", "brand.tsx"],
  }),
  block({
    id: "component-carousel",
    kit: "features",
    title: "Component carousel",
    description: "Chart, timeline, command, table, stepper, and toast as slides that advance on their own.",
    components: ["carousel", "card", "chart", "command", "table", "stepper", "timeline", "toast", "badge"],
    files: ["ComponentCarousel.tsx", "use-quiet-command.ts"],
  }),
  block({
    id: "ai-and-numbers",
    kit: "features",
    title: "AI and numbers",
    description: "Two columns of layered cards, a chat turn and a progress card, then four short notes.",
    components: ["badge", "message", "progress", "trace", "card"],
    files: ["AiAndNumbers.tsx"],
  }),
  block({
    id: "copy-paste",
    kit: "features",
    title: "Copy-paste",
    description: "What the CLI writes into the repo, next to the file tree it leaves.",
    components: ["badge", "separator", "card"],
    files: ["CopyPaste.tsx"],
  }),
  block({
    id: "form-states",
    kit: "features",
    title: "Form states",
    description: "An invalid email, and a list of components to add.",
    components: ["button", "input", "label", "item"],
    files: ["FormStates.tsx"],
  }),
  block({
    id: "forms-feature",
    kit: "features",
    title: "Forms",
    description: "The 1.0 forms section: a field with its states and a composed list.",
    components: ["button", "input", "label", "item"],
    files: ["FormsFeature.tsx"],
  }),
  block({
    id: "composed-feature",
    kit: "features",
    title: "Composed",
    description: "The 1.0 section where a date field, a menu, and a calendar sit on one panel.",
    components: ["button", "calendar", "input", "kbd"],
    files: ["ComposedFeature.tsx"],
  }),
  block({
    id: "tokens",
    kit: "features",
    title: "Tokens",
    description: "Appearance, then the same card in light and in dark, and four notes.",
    components: ["button", "card", "toggle", "toggle-group"],
    files: ["Tokens.tsx", "StackMarks.tsx"],
  }),
  block({
    id: "tokens-feature",
    kit: "features",
    title: "Tokens and stack",
    description: "The 1.1 section: the same card in both themes, with the stack it runs on.",
    components: ["button", "card", "toggle", "toggle-group"],
    files: ["TokensFeature.tsx", "StackMarks.tsx"],
  }),
  block({
    id: "component-index",
    kit: "features",
    title: "Component index",
    description: "Every component as a link, in four columns, with the count.",
    components: ["button"],
    files: ["ComponentIndex.tsx"],
  }),

  // Showcases
  block({
    id: "landing-showcase",
    kit: "showcases",
    title: "Landing showcase",
    description: "The first landing, September 2026: a grid of working components on one page.",
    components: ["button", "card", "badge", "tabs", "select", "switch", "slider", "toggle-group", "progress"],
    files: ["LandingShowcase.tsx"],
  }),
  block({
    id: "examples-bento",
    kit: "showcases",
    title: "Examples bento",
    description: "The 0.6 bento: dozens of components composed into small product cards.",
    components: ["button", "card", "dialog", "menu", "tabs", "table", "calendar", "field", "command", "chart", "stat", "label"],
    files: ["ExamplesBento.tsx"],
  }),

  // Calls to action
  block({
    id: "start-cta",
    kit: "cta",
    title: "Start with Button",
    description: "The 1.2 closing line: two sentences and two actions, centered.",
    components: ["button"],
    files: ["StartCta.tsx"],
  }),
  block({
    id: "installation",
    kit: "cta",
    title: "Installation",
    description: "A filled panel with the next step and two actions.",
    components: ["button", "card"],
    files: ["InstallationCta.tsx"],
  }),

  // Footers
  block({
    id: "site-footer",
    kit: "footers",
    title: "Site footer",
    description: "Logo and two actions, three link columns, then a dotted wordmark with the year and the theme toggle.",
    components: ["button", "theme-toggle"],
    files: ["SiteFooter.tsx", "brand.tsx"],
  }),

  // Docs layout
  block({
    id: "docs-header",
    kit: "docs-layout",
    title: "Docs header",
    description: "Logo, version, Ask, search, and the menu, over a docs page.",
    components: ["button", "kbd", "drawer", "separator", "theme-toggle"],
    files: ["DocsHeader.tsx", "brand.tsx", "mobile-nav.tsx"],
  }),
  block({
    id: "docs-sidebar",
    kit: "docs-layout",
    title: "Docs sidebar",
    description: "Grouped links with a dot for new pages, the version at the foot, next to an article.",
    components: ["breadcrumb"],
    files: ["DocsSidebar.tsx"],
  }),

  // Search and ask
  block({
    id: "command-menu",
    kit: "search",
    title: "Command menu",
    description: "The ⌘K palette of the docs: pages by group, with the keys in the footer.",
    components: ["command", "kbd"],
    files: ["CommandMenu.tsx"],
  }),
  block({
    id: "ask-panel",
    kit: "search",
    title: "Ask panel",
    description: "The panel that answers from the docs, with the sources it read.",
    components: ["button", "message", "prompt-input", "sources", "card"],
    files: ["AskPanel.tsx"],
  }),

  // Error pages
  block({
    id: "not-found",
    kit: "errors",
    title: "Not found",
    description: "A 404 in the site design: the code, a sentence, and the ways back.",
    components: ["button"],
    files: ["NotFound.tsx"],
  }),
]
