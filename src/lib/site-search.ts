import { blockCategories } from "@/lib/block-categories"
import { dashboardBlockMeta } from "@/lib/dashboard-blocks"
import { docsSections } from "@/lib/docs-nav"

export type SiteSearchCategory = "docs" | "blocks" | "pages"

export type SiteSearchItem = {
  id: string
  title: string
  description: string
  href: string
  category: SiteSearchCategory
  /** Extra tokens used only for matching. */
  keywords: string
}

/** Marketing / site pages that are not already in docs-nav. */
const sitePages: Omit<SiteSearchItem, "id">[] = [
  {
    title: "Home",
    description: "Lumen UI landing page — copy-paste components for your app.",
    href: "/",
    category: "pages",
    keywords: "landing marketing home start welcome",
  },
  {
    title: "Examples",
    description: "Live examples of Lumen UI components and patterns.",
    href: "/examples",
    category: "pages",
    keywords: "demo showcase preview examples",
  },
  {
    title: "Customize",
    description: "Theme tokens, appearance, and visual customization.",
    href: "/customize",
    category: "pages",
    keywords: "theme dark light tokens colors appearance customize personnaliser",
  },
  {
    title: "Blocks",
    description: "Ready-made page sections and dashboard screens.",
    href: "/blocks",
    category: "blocks",
    keywords: "gallery templates sections kits blocks blocs",
  },
]

/**
 * Lightweight meta for marketing blocks. Kept here so Ask Lumen does not
 * import the heavy preview modules from lumen-blocks.
 */
const lumenBlockMeta = [
  {
    id: "site-header",
    kit: "headers",
    title: "Site header",
    description:
      "The bar on the marketing site: wordmark, section links, and Documentation.",
  },
  {
    id: "landing-hero",
    kit: "heroes",
    title: "Landing hero",
    description: "The first screen: the sentence, the init command, and the stack.",
  },
  {
    id: "painting",
    kit: "heroes",
    title: "Painting",
    description: "The same hero, with the landing painting behind the type.",
  },
  {
    id: "split",
    kit: "heroes",
    title: "Split",
    description: "The sentence on the left, the painting as a panel on the right.",
  },
  {
    id: "band",
    kit: "heroes",
    title: "Band",
    description: "The type stays on the page color. The painting appears underneath.",
  },
  {
    id: "copy-paste",
    kit: "features",
    title: "Copy-paste",
    description: "The landing explanation of what the CLI writes into the repo.",
  },
  {
    id: "form-states",
    kit: "features",
    title: "Form states",
    description: "The landing form: an invalid email, and a list of components to add.",
  },
  {
    id: "tokens",
    kit: "features",
    title: "Tokens",
    description: "Appearance, then the same card in light and in dark.",
  },
  {
    id: "component-index",
    kit: "features",
    title: "Component index",
    description: "The list at the bottom of the landing page, one link per component.",
  },
  {
    id: "installation",
    kit: "cta",
    title: "Installation",
    description: "The closing line on the landing page.",
  },
  {
    id: "site-footer",
    kit: "footers",
    title: "Site footer",
    description:
      "An inverted panel: the wordmark, the install command, the site links, then the year, the version and GitHub.",
  },
] as const

function buildSiteSearchIndex(): SiteSearchItem[] {
  const items: SiteSearchItem[] = []
  const seen = new Set<string>()

  function push(item: SiteSearchItem) {
    if (seen.has(item.href)) return
    seen.add(item.href)
    items.push(item)
  }

  for (const page of sitePages) {
    push({ ...page, id: page.href })
  }

  for (const section of docsSections) {
    if (section.href) {
      const isComponents = section.href === "/docs/components"
      push({
        id: section.href,
        title: isComponents ? "All components" : section.title,
        description: isComponents
          ? "Full catalog of every component in the design system."
          : `${section.title} section`,
        href: section.href,
        category: "docs",
        keywords: isComponents
          ? "components composants component composant catalogue catalog index list liste tous all every design system"
          : `${section.title} docs documentation`,
      })
    }

    for (const item of section.items) {
      const slug = item.href.split("/").pop() ?? ""
      push({
        id: item.href,
        title: item.name,
        description: `${section.title} documentation`,
        href: item.href,
        category: "docs",
        keywords: `${section.title} ${item.name} ${slug} docs documentation component composant`,
      })
    }
  }

  for (const category of blockCategories) {
    push({
      id: `/blocks/${category.slug}`,
      title: category.title,
      description: category.description,
      href: `/blocks/${category.slug}`,
      category: "blocks",
      keywords: `${category.group} ${category.kit} blocks kit ${category.slug} ${category.title}`,
    })
  }

  for (const block of lumenBlockMeta) {
    const href = `/blocks/${block.kit}#${block.id}`
    push({
      id: href,
      title: block.title,
      description: block.description,
      href,
      category: "blocks",
      keywords: `lumen marketing block ${block.kit} ${block.id} ${block.title}`,
    })
  }

  for (const block of dashboardBlockMeta) {
    const href = `/blocks/${block.kit}#${block.id}`
    push({
      id: href,
      title: block.title,
      description: block.description,
      href,
      category: "blocks",
      keywords: `dashboard block ${block.kit} ${block.id} ${block.title} ${block.command}`,
    })
  }

  return items
}

export const siteSearchIndex = buildSiteSearchIndex()

/** Conversational filler — dropped so phrases become searchable keywords. */
const STOP_WORDS = new Set([
  // EN
  "a",
  "an",
  "the",
  "to",
  "for",
  "of",
  "in",
  "on",
  "at",
  "and",
  "or",
  "is",
  "are",
  "was",
  "be",
  "been",
  "am",
  "how",
  "do",
  "does",
  "did",
  "i",
  "im",
  "i'm",
  "my",
  "me",
  "mine",
  "we",
  "our",
  "can",
  "could",
  "would",
  "should",
  "you",
  "your",
  "yours",
  "what",
  "whats",
  "where's",
  "where",
  "which",
  "who",
  "whom",
  "why",
  "when",
  "find",
  "finding",
  "found",
  "show",
  "showing",
  "get",
  "getting",
  "give",
  "need",
  "needs",
  "want",
  "wanna",
  "looking",
  "look",
  "search",
  "searching",
  "with",
  "without",
  "about",
  "please",
  "thanks",
  "thank",
  "hey",
  "hi",
  "hello",
  "there",
  "here",
  "this",
  "that",
  "these",
  "those",
  "some",
  "any",
  "something",
  "anything",
  "like",
  "just",
  "also",
  "from",
  "into",
  "onto",
  "over",
  "under",
  "have",
  "has",
  "had",
  "help",
  "helping",
  "tell",
  "know",
  "see",
  "use",
  "using",
  "make",
  "making",
  "page",
  "pages",
  "site",
  "docs",
  "documentation",
  "lumen",
  // FR
  "un",
  "une",
  "le",
  "la",
  "les",
  "de",
  "du",
  "des",
  "et",
  "ou",
  "est",
  "sont",
  "je",
  "j",
  "tu",
  "il",
  "elle",
  "nous",
  "vous",
  "mon",
  "ma",
  "mes",
  "ton",
  "ta",
  "tes",
  "son",
  "sa",
  "ses",
  "ce",
  "cet",
  "cette",
  "ces",
  "qui",
  "que",
  "quoi",
  "dont",
  "où",
  "ou",
  "comment",
  "pourquoi",
  "quand",
  "avec",
  "sans",
  "pour",
  "dans",
  "sur",
  "sous",
  "par",
  "pas",
  "plus",
  "moins",
  "tres",
  "très",
  "aussi",
  "bien",
  "svp",
  "merci",
  "salut",
  "bonjour",
  "coucou",
  "hello",
  "aide",
  "aider",
  "trouve",
  "trouver",
  "trouves",
  "cherche",
  "chercher",
  "cherche",
  "recherche",
  "rechercher",
  "montre",
  "montrer",
  "donne",
  "donner",
  "veux",
  "vouloir",
  "voudrais",
  "besoin",
  "peux",
  "pouvoir",
  "pourrais",
  "y",
  "a",
  "il",
  "ya",
  "sais",
  "savoir",
  "dis",
  "dire",
  "fais",
  "faire",
  "utiliser",
  "utilise",
  "page",
  "pages",
  "site",
  "doc",
  "docs",
  "moi",
  "toi",
  "lui",
  "eux",
  "elles",
  "tout",
  "tous",
  "toute",
  "toutes",
  "all",
  "every",
  "entire",
  "full",
  "complete",
  "complet",
  "complete",
  "design",
  "system",
  "systeme",
  "système",
  "lumenui",
  "that",
  "those",
  "these",
])

/**
 * Maps casual / FR / synonym words onto index-friendly English keywords.
 * Values are space-separated expansions added as extra search tokens.
 */
const SYNONYMS: Record<string, string> = {
  // install / start
  install: "installation setup init",
  installer: "installation setup init",
  installation: "installation setup init",
  setup: "installation setup init",
  demarrer: "installation setup init",
  démarrer: "installation setup init",
  commencer: "installation introduction",
  start: "installation introduction",
  init: "installation",
  cli: "installation",
  npx: "installation",
  // navigation / layout
  sidebar: "sidebar sidebars navigation menu",
  "barre": "sidebar header",
  laterale: "sidebar sidebars",
  laterales: "sidebar sidebars",
  latérale: "sidebar sidebars",
  latérales: "sidebar sidebars",
  navigation: "sidebar navigation menu breadcrumb",
  nav: "navigation menu navbar",
  menu: "menu menubar navigation",
  header: "header headers app-header",
  entete: "header headers",
  "en-tete": "header headers",
  "en-tête": "header headers",
  footer: "footer footers",
  pied: "footer footers",
  // components
  bouton: "button",
  boutons: "button button-group",
  button: "button",
  buttons: "button",
  dialogue: "dialog alert-dialog",
  dialog: "dialog",
  modal: "dialog alert-dialog",
  popup: "dialog popover preview-card",
  fenetre: "dialog",
  fenêtre: "dialog",
  formulaire: "form field input textarea",
  form: "form field input",
  champ: "field input",
  input: "input field",
  texte: "textarea typography input",
  table: "table tables",
  tableau: "table tables orders-table",
  graphique: "chart charts",
  chart: "chart charts",
  graphe: "chart charts",
  onglet: "tabs",
  onglets: "tabs",
  tabs: "tabs",
  badge: "badge",
  pastille: "badge",
  avatar: "avatar",
  carte: "card",
  card: "card",
  toast: "toast",
  notification: "toast notification-settings",
  notifications: "toast notification-settings",
  spinner: "spinner",
  chargement: "spinner skeleton progress",
  loading: "spinner skeleton progress",
  progress: "progress meter",
  progression: "progress meter",
  switch: "switch",
  interrupteur: "switch",
  checkbox: "checkbox",
  case: "checkbox",
  radio: "radio-group",
  select: "select combobox",
  // "liste" alone often means “list of …”, not the Select component.
  "liste-deroulante": "select combobox",
  deroulante: "select combobox",
  deroulant: "select combobox",
  dropdown: "select combobox menu",
  combobox: "combobox autocomplete",
  composant: "components",
  composants: "components",
  component: "components",
  components: "components",
  autocomplete: "autocomplete combobox",
  tooltip: "tooltip",
  infobulle: "tooltip",
  drawer: "drawer",
  tiroir: "drawer",
  accordion: "accordion",
  accordéon: "accordion",
  accordioné: "accordion",
  slider: "slider",
  curseur: "slider",
  calendar: "calendar date-picker",
  calendrier: "calendar date-picker",
  date: "date-picker calendar",
  // themes / style
  theme: "customize styles tokens",
  thème: "customize styles tokens",
  dark: "customize styles tokens",
  sombre: "customize styles tokens",
  style: "styles customize",
  styles: "styles customize",
  token: "styles tokens customize",
  tokens: "styles tokens customize",
  couleur: "styles customize color-picker",
  couleurs: "styles customize color-picker",
  // blocks / kits
  block: "blocks",
  blocks: "blocks",
  bloc: "blocks",
  blocs: "blocks",
  dashboard: "dashboard stats charts tables overview",
  tableaudebord: "dashboard",
  hero: "heroes landing-hero",
  heroes: "heroes",
  pricing: "pricing",
  tarif: "pricing",
  tarifs: "pricing",
  login: "login",
  connexion: "login",
  signup: "sign-up",
  inscription: "sign-up",
  settings: "settings profile",
  reglages: "settings",
  réglages: "settings",
  parametres: "settings",
  paramètres: "settings",
  profile: "profile-settings",
  profil: "profile-settings",
  orders: "orders-table",
  commandes: "orders-table",
  stats: "stats stat-cards",
  statistique: "stats",
  statistiques: "stats",
  kpi: "stats stat-cards",
  activity: "activity",
  activite: "activity",
  activité: "activity",
  empty: "empty-states",
  vide: "empty-states",
  // misc
  example: "examples",
  examples: "examples",
  exemple: "examples",
  exemples: "examples",
  customize: "customize",
  personnaliser: "customize",
  customiser: "customize",
  framework: "frameworks",
  frameworks: "frameworks",
  changelog: "changelog",
  nouveautes: "changelog",
  nouveautés: "changelog",
  llm: "llms",
  llms: "llms",
  ai: "llms",
  ia: "llms",
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
}

function stem(token: string) {
  if (token.length <= 3) return token
  if (token.endsWith("ies") && token.length > 4) return `${token.slice(0, -3)}y`
  if (token.endsWith("sses")) return token.slice(0, -2)
  if (token.endsWith("ses") && token.length > 4) return token.slice(0, -1)
  if (token.endsWith("s") && !token.endsWith("ss")) return token.slice(0, -1)
  return token
}

export type ExtractedKeywords = {
  /** Words the user actually said (minus filler). Shown in the chat. */
  spoken: string[]
  /** Spoken words + synonym expansions used for scoring. */
  search: string[]
}

/** Pull meaningful keywords out of a full sentence. */
export function extractKeywords(query: string): ExtractedKeywords {
  const raw = normalize(query.trim())
  if (!raw) return { spoken: [], search: [] }

  const parts = raw
    .split(/[^a-z0-9àâäéèêëïîôùûüç-]+/u)
    .map((part) => part.replace(/^-+|-+$/g, ""))
    .filter(Boolean)

  const spoken: string[] = []
  const search: string[] = []
  const seenSpoken = new Set<string>()
  const seenSearch = new Set<string>()

  function addSearch(token: string) {
    const clean = normalize(token)
    if (!clean || clean.length < 2) return
    if (seenSearch.has(clean)) return
    seenSearch.add(clean)
    search.push(clean)
  }

  function addSpoken(token: string) {
    const clean = normalize(token)
    if (!clean || clean.length < 2) return
    if (STOP_WORDS.has(clean)) return
    const key = stem(clean)
    if (seenSpoken.has(key) || seenSpoken.has(clean)) return
    seenSpoken.add(key)
    seenSpoken.add(clean)
    spoken.push(clean)
    addSearch(clean)

    const synonym = SYNONYMS[clean] ?? SYNONYMS[key]
    if (synonym) {
      for (const extra of synonym.split(/\s+/)) addSearch(extra)
    }
  }

  for (const part of parts) {
    // "barre-laterale" / "app-sidebar" style compounds
    if (part.includes("-")) {
      addSpoken(part.replace(/-/g, ""))
      for (const bit of part.split("-")) addSpoken(bit)
    } else {
      addSpoken(part)
    }
  }

  // Multi-word title phrases still present after stop-word stripping
  // e.g. "app sidebar", "alert dialog", "date picker"
  const joined = parts.filter((p) => !STOP_WORDS.has(normalize(p))).join(" ")
  for (const item of siteSearchIndex) {
    const title = normalize(item.title)
    if (title.includes(" ") && joined.includes(title) && !seenSpoken.has(title)) {
      seenSpoken.add(title)
      spoken.unshift(title)
      addSearch(title)
    }
  }

  return { spoken, search }
}

function scoreItem(item: SiteSearchItem, keywords: string[], raw: string) {
  if (!keywords.length && !raw) return 0

  const title = normalize(item.title)
  const titleStem = stem(title)
  const description = normalize(item.description)
  const keywordsText = normalize(item.keywords)
  const haystack = `${title} ${description} ${keywordsText}`
  const href = normalize(item.href)

  let score = 0
  let matched = 0

  if (raw) {
    if (title === raw) score += 140
    else if (title.includes(raw)) score += 80
  }

  for (const keyword of keywords) {
    const keyStem = stem(keyword)
    let hit = false

    if (title === keyword || titleStem === keyStem) {
      score += 56
      hit = true
    } else if (title.startsWith(keyword) || titleStem.startsWith(keyStem)) {
      score += 42
      hit = true
    } else if (title.includes(keyword) || title.includes(keyStem)) {
      score += 34
      hit = true
    } else if (href.includes(keyword) || href.includes(keyStem)) {
      score += 28
      hit = true
    } else if (keywordsText.includes(keyword) || keywordsText.includes(keyStem)) {
      score += 22
      hit = true
    } else if (description.includes(keyword) || description.includes(keyStem)) {
      score += 14
      hit = true
    } else if (haystack.includes(keyword) || haystack.includes(keyStem)) {
      score += 8
      hit = true
    }

    if (hit) matched += 1
  }

  if (!matched && keywords.length) return 0

  // Prefer results that cover more of the phrase’s keywords.
  if (keywords.length > 1 && matched > 1) {
    score += matched * 18
  }

  return score
}

export type SiteSearchHit = SiteSearchItem & { score: number }

export function searchSite(query: string, limit = 5): SiteSearchHit[] {
  const raw = normalize(query.trim())
  if (!raw) return []

  const { search: keywords } = extractKeywords(raw)
  const hits: SiteSearchHit[] = []

  for (const item of siteSearchIndex) {
    const score = scoreItem(item, keywords, raw)
    if (score > 0) hits.push({ ...item, score })
  }

  hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
  return hits.slice(0, limit)
}

export type AskLumenReply = {
  text: string
  hits: SiteSearchHit[]
  suggestions?: string[]
  /** Keywords that drove the search — useful for debugging / UI. */
  keywords?: string[]
}

const GREETING =
  /^(hi|hello|hey|yo|bonjour|salut|coucou|help|aide)[!?.]*$/i

const INSTALL =
  /\b(install|installation|setup|init|cli|npx|démarrer|demarrer|installer|commencer)\b/i

/** “Give me every component / liste de tous les composants …” */
const ALL_COMPONENTS =
  /\b((tous|toutes|tout|all|every|entire|full|complet|complete|liste|list|catalogue|catalog|index)\b[\s\S]{0,60}\b(composants?|components?)|\b(composants?|components?)\b[\s\S]{0,60}\b(tous|toutes|tout|all|every|liste|list|catalogue|catalog|index)|(quels?|what|which)\b[\s\S]{0,40}\b(composants?|components?))\b/i

const ALL_BLOCKS =
  /\b((tous|toutes|tout|all|every|liste|list|catalogue|catalog)\b[\s\S]{0,60}\b(blocks?|blocs?)|\b(blocks?|blocs?)\b[\s\S]{0,60}\b(tous|toutes|tout|all|every|liste|list))\b/i

function formatKeywordList(keywords: string[]) {
  const shown = keywords.slice(0, 3)
  if (shown.length === 1) return `“${shown[0]}”`
  if (shown.length === 2) return `“${shown[0]}” and “${shown[1]}”`
  return `“${shown[0]}”, “${shown[1]}”, and “${shown[2]}”`
}

function pick<T>(options: T[]) {
  return options[Math.floor(Math.random() * options.length)]!
}

function asHit(item: SiteSearchItem, score = 1000): SiteSearchHit {
  return { ...item, score }
}

function findByHref(href: string) {
  return siteSearchIndex.find((item) => item.href === href)
}

export function answerAskLumen(query: string): AskLumenReply {
  const trimmed = query.trim()
  if (!trimmed) {
    return {
      text: pick([
        "Sure — what should I look for? A component, a block, a theme page… anything on the site.",
        "I’m listening. Throw me a name or a short sentence and I’ll dig around.",
      ]),
      hits: [],
      suggestions: ["Installation", "Button", "App sidebar", "Customize"],
    }
  }

  if (GREETING.test(trimmed)) {
    return {
      text: pick([
        "Hey! What are you trying to find? You can write normally — “a sidebar for my dashboard” works fine.",
        "Hi there. Ask me like you’d ask a teammate — I’ll pull out the useful words and search with them.",
      ]),
      hits: [],
      suggestions: ["Installation", "Button", "Blocks", "Customize"],
    }
  }

  if (ALL_COMPONENTS.test(trimmed)) {
    const catalog = findByHref("/docs/components")
    return {
      text: pick([
        "You want the full component catalog — that’s this page. Everything in the design system is listed there:",
        "Got it — here’s the complete components index. Open it for the full list:",
      ]),
      hits: catalog ? [asHit(catalog)] : [],
      keywords: ["composants"],
      suggestions: ["Button", "Dialog", "Sidebar", "Table"],
    }
  }

  if (ALL_BLOCKS.test(trimmed)) {
    const blocks = findByHref("/blocks")
    return {
      text: "Looking for every block? Start from the blocks gallery:",
      hits: blocks ? [asHit(blocks)] : [],
      keywords: ["blocks"],
      suggestions: ["Sidebars", "Heroes", "Charts"],
    }
  }

  const { spoken: spokenKeywords } = extractKeywords(trimmed)
  let hits = searchSite(trimmed)

  if (INSTALL.test(trimmed)) {
    const install = findByHref("/docs/installation")
    if (install && !hits.some((hit) => hit.href === install.href)) {
      hits = [asHit(install, 999), ...hits].slice(0, 5)
    } else {
      hits = [
        ...hits.filter((hit) => hit.href === "/docs/installation"),
        ...hits.filter((hit) => hit.href !== "/docs/installation"),
      ].slice(0, 5)
    }
  }

  // Prefer the catalog when the only strong signal is “composant(s)”.
  if (
    spokenKeywords.length <= 2 &&
    spokenKeywords.some((word) =>
      /^(composant|composants|component|components)$/.test(word),
    )
  ) {
    const catalog = findByHref("/docs/components")
    if (catalog) {
      hits = [
        asHit(catalog, 900),
        ...hits.filter((hit) => hit.href !== catalog.href),
      ].slice(0, 5)
    }
  }

  if (!hits.length) {
    const hint =
      spokenKeywords.length > 0
        ? ` I looked for ${formatKeywordList(spokenKeywords)}, but nothing lined up.`
        : ""
    return {
      text: pick([
        `Hmm, I’m not sure I got that.${hint} Try a component name, or something like “sidebar for a dashboard”.`,
        `I came up empty.${hint} Maybe “Button”, “Dialog”, or “installation”?`,
      ]),
      hits: [],
      suggestions: ["Button", "Dialog", "App sidebar", "Installation"],
      keywords: spokenKeywords,
    }
  }

  const top = hits[0]
  const keyBit =
    spokenKeywords.length > 0
      ? ` From your message I picked ${formatKeywordList(spokenKeywords)}.`
      : ""

  const text =
    hits.length === 1
      ? keyBit
        ? pick([
            `Got it.${keyBit} “${top.title}” seems to match:`,
            `Alright.${keyBit} I’d start with “${top.title}”:`,
          ])
        : `I think you’re after “${top.title}”. Here you go:`
      : pick([
          `Okay.${keyBit} Here are the closest matches:`,
          `I dug around.${keyBit} These looked most relevant:`,
          `Here’s what turned up.${keyBit}`,
        ])

  return { text, hits, keywords: spokenKeywords }
}

export function categoryLabel(category: SiteSearchCategory) {
  switch (category) {
    case "docs":
      return "Docs"
    case "blocks":
      return "Blocks"
    case "pages":
      return "Pages"
    default: {
      const _exhaustive: never = category
      return _exhaustive
    }
  }
}
