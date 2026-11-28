export type ChangelogKind = "added" | "changed" | "fixed";

export type ChangelogLink = {
  name: string;
  href: string;
  new?: boolean;
};

export type ChangelogItem = {
  kind: ChangelogKind;
  text: string;
  href?: string;
  new?: boolean;
  links?: ChangelogLink[];
};

export type ChangelogRelease = {
  version: string;
  /** A short name for the release, two to five words. Shown next to the version. */
  title: string;
  date: string;
  summary: string;
  items: ChangelogItem[];
};

const addedComponents: ChangelogLink[] = [
  { name: "Accordion", href: "/docs/components/accordion", new: true },
  { name: "Alert Dialog", href: "/docs/components/alert-dialog", new: true },
  { name: "Autocomplete", href: "/docs/components/autocomplete", new: true },
  { name: "Avatar", href: "/docs/components/avatar", new: true },
  { name: "Checkbox", href: "/docs/components/checkbox", new: true },
  {
    name: "Checkbox Group",
    href: "/docs/components/checkbox-group",
    new: true,
  },
  { name: "Collapsible", href: "/docs/components/collapsible", new: true },
  { name: "Combobox", href: "/docs/components/combobox", new: true },
  { name: "Context Menu", href: "/docs/components/context-menu", new: true },
  { name: "Dialog", href: "/docs/components/dialog", new: true },
  { name: "Drawer", href: "/docs/components/drawer", new: true },
  { name: "Field", href: "/docs/components/field", new: true },
  { name: "Fieldset", href: "/docs/components/fieldset", new: true },
  { name: "Form", href: "/docs/components/form", new: true },
  { name: "Menu", href: "/docs/components/menu", new: true },
  { name: "Menubar", href: "/docs/components/menubar", new: true },
  { name: "Meter", href: "/docs/components/meter", new: true },
  {
    name: "Navigation Menu",
    href: "/docs/components/navigation-menu",
    new: true,
  },
  { name: "Number Field", href: "/docs/components/number-field", new: true },
  { name: "OTP Field", href: "/docs/components/otp-field", new: true },
  { name: "Popover", href: "/docs/components/popover", new: true },
  { name: "Preview Card", href: "/docs/components/preview-card", new: true },
  { name: "Progress", href: "/docs/components/progress", new: true },
  { name: "Radio Group", href: "/docs/components/radio-group", new: true },
  { name: "Scroll Area", href: "/docs/components/scroll-area", new: true },
  { name: "Separator", href: "/docs/components/separator", new: true },
  { name: "Slider", href: "/docs/components/slider", new: true },
  { name: "Switch", href: "/docs/components/switch", new: true },
  { name: "Tabs", href: "/docs/components/tabs", new: true },
  { name: "Toast", href: "/docs/components/toast", new: true },
  { name: "Toggle", href: "/docs/components/toggle", new: true },
  { name: "Toggle Group", href: "/docs/components/toggle-group", new: true },
  { name: "Toolbar", href: "/docs/components/toolbar", new: true },
  { name: "Tooltip", href: "/docs/components/tooltip", new: true },
];

const nativeComponents: ChangelogLink[] = [
  { name: "Aspect Ratio", href: "/docs/components/aspect-ratio", new: true },
  { name: "Breadcrumb", href: "/docs/components/breadcrumb", new: true },
  { name: "Button Group", href: "/docs/components/button-group", new: true },
  { name: "Command", href: "/docs/components/command", new: true },
  { name: "Empty", href: "/docs/components/empty", new: true },
  { name: "Input Group", href: "/docs/components/input-group", new: true },
  { name: "Kbd", href: "/docs/components/kbd", new: true },
  { name: "Pagination", href: "/docs/components/pagination", new: true },
  { name: "Rating", href: "/docs/components/rating", new: true },
  { name: "Spinner", href: "/docs/components/spinner", new: true },
  { name: "Stepper", href: "/docs/components/stepper", new: true },
  { name: "Table", href: "/docs/components/table", new: true },
  { name: "Timeline", href: "/docs/components/timeline", new: true },
];

const releaseComponents: ChangelogLink[] = [
  { name: "Calendar", href: "/docs/components/calendar", new: true },
  { name: "Carousel", href: "/docs/components/carousel", new: true },
  { name: "Chart", href: "/docs/components/chart", new: true },
  { name: "Date Picker", href: "/docs/components/date-picker", new: true },
  { name: "Item", href: "/docs/components/item", new: true },
  { name: "Typography", href: "/docs/components/typography", new: true },
];

const designSystemComponents: ChangelogLink[] = [
  { name: "Avatar Group", href: "/docs/components/avatar-group", new: true },
  { name: "Banner", href: "/docs/components/banner", new: true },
  { name: "Container", href: "/docs/components/container", new: true },
  { name: "Data Table", href: "/docs/components/data-table", new: true },
  { name: "File Upload", href: "/docs/components/file-upload", new: true },
  { name: "Password Input", href: "/docs/components/password-input", new: true },
  { name: "Resizable", href: "/docs/components/resizable", new: true },
  { name: "Search Input", href: "/docs/components/search-input", new: true },
  { name: "Stack", href: "/docs/components/stack", new: true },
  { name: "Stat", href: "/docs/components/stat", new: true },
  { name: "Tag Input", href: "/docs/components/tag-input", new: true },
  { name: "Tree View", href: "/docs/components/tree-view", new: true },
  { name: "Visually Hidden", href: "/docs/components/visually-hidden", new: true },
  { name: "Copy Button", href: "/docs/components/copy-button", new: true },
  { name: "Filter Bar", href: "/docs/components/filter-bar", new: true },
  { name: "Sortable List", href: "/docs/components/sortable-list", new: true },
  { name: "Split Button", href: "/docs/components/split-button", new: true },
  { name: "Time Picker", href: "/docs/components/time-picker", new: true },
  { name: "Image Gallery", href: "/docs/components/image-gallery", new: true },
  { name: "Marquee", href: "/docs/components/marquee", new: true },
  { name: "Notification Center", href: "/docs/components/notification-center", new: true },
  { name: "Relative Time", href: "/docs/components/relative-time", new: true },
  { name: "Tour", href: "/docs/components/tour", new: true },
];

const aiComponents: ChangelogLink[] = [
  { name: "AI patterns", href: "/docs/ai", new: true },
  { name: "Chat", href: "/docs/components/chat", new: true },
  { name: "Message", href: "/docs/components/message", new: true },
  { name: "Prompt Input", href: "/docs/components/prompt-input", new: true },
  { name: "Trace", href: "/docs/components/trace", new: true },
  { name: "Reasoning", href: "/docs/components/reasoning", new: true },
  { name: "Tool", href: "/docs/components/tool", new: true },
  { name: "Chain of Thought", href: "/docs/components/chain-of-thought", new: true },
  { name: "Plan", href: "/docs/components/plan", new: true },
  { name: "Task", href: "/docs/components/task", new: true },
  { name: "Queue", href: "/docs/components/queue", new: true },
  { name: "Subagent", href: "/docs/components/subagent", new: true },
  { name: "Confirmation", href: "/docs/components/confirmation", new: true },
  { name: "Terminal", href: "/docs/components/terminal", new: true },
  { name: "Stack Trace", href: "/docs/components/stack-trace", new: true },
  { name: "Test Results", href: "/docs/components/test-results", new: true },
  { name: "File Tree", href: "/docs/components/file-tree", new: true },
  { name: "Sources", href: "/docs/components/sources", new: true },
  { name: "Inline Citation", href: "/docs/components/inline-citation", new: true },
  { name: "Suggestion", href: "/docs/components/suggestion", new: true },
  { name: "Checkpoint", href: "/docs/components/checkpoint", new: true },
  { name: "Context", href: "/docs/components/context", new: true },
  { name: "Model Selector", href: "/docs/components/model-selector", new: true },
  { name: "Message Scroller", href: "/docs/components/message-scroller", new: true },
  { name: "Code Block", href: "/docs/components/code-block", new: true },
  { name: "Attachment", href: "/docs/components/attachment", new: true },
];

const mediaComponents: ChangelogLink[] = [
  { name: "Video", href: "/docs/components/video", new: true },
  { name: "Audio Player", href: "/docs/components/audio-player", new: true },
  { name: "Comparison Slider", href: "/docs/components/comparison-slider", new: true },
];

const workflowComponents: ChangelogLink[] = [
  { name: "Kanban", href: "/docs/components/kanban", new: true },
  { name: "Selection Bar", href: "/docs/components/selection-bar", new: true },
  { name: "Inline Edit", href: "/docs/components/inline-edit", new: true },
  { name: "Diff Viewer", href: "/docs/components/diff-viewer", new: true },
];

const contentComponents: ChangelogLink[] = [
  { name: "Markdown", href: "/docs/components/markdown", new: true },
  { name: "Mention Input", href: "/docs/components/mention-input", new: true },
  { name: "Emoji Picker", href: "/docs/components/emoji-picker", new: true },
];

const dataComponents: ChangelogLink[] = [
  { name: "Event Calendar", href: "/docs/components/event-calendar", new: true },
  { name: "Heatmap", href: "/docs/components/heatmap", new: true },
  { name: "Gauge", href: "/docs/components/gauge", new: true },
  { name: "Number Ticker", href: "/docs/components/number-ticker", new: true },
];

const captureComponents: ChangelogLink[] = [
  { name: "Signature Pad", href: "/docs/components/signature-pad", new: true },
  { name: "Image Cropper", href: "/docs/components/image-cropper", new: true },
  { name: "Onboarding Checklist", href: "/docs/components/onboarding-checklist", new: true },
];

const fieldComponents: ChangelogLink[] = [
  { name: "Phone Input", href: "/docs/components/phone-input", new: true },
  { name: "Currency Input", href: "/docs/components/currency-input", new: true },
];

export const changelog: ChangelogRelease[] = [
  {
    version: "1.4.1",
    title: "Vue 3, Medusa UI, floating nav",
    date: "2026-11-28",
    summary:
      "Vue 3 component library on Reka UI with CLI support, per-stack framework guides, a floating-panel Navigation Menu with Base UI transitions, full Medusa UI preset alignment, and removal of the legacy Blocks section.",
    items: [
      {
        kind: "added",
        text: "Vue 3 support on Reka UI: 130 ported components, 111 interactive Vue examples, a dedicated Vue registry, and `--framework vue` in the CLI (`init`, `add`, `rm`) with auto-detection for Vite, Nuxt, Laravel + Inertia, and Astro.",
        href: "/docs/vue",
        new: true,
      },
      {
        kind: "added",
        text: "Framework switcher in the docs sidebar to toggle component usage and install commands between React and Vue, with a Callout notice on components not yet available for Vue.",
        href: "/docs/vue",
        new: true,
      },
      {
        kind: "added",
        text: "Per-stack framework guides for Next.js, Vite, React Router, Astro, TanStack Start, Vite + Vue, Nuxt, Laravel + Inertia, and Astro + Vue.",
        href: "/docs/frameworks",
        new: true,
      },
      {
        kind: "changed",
        text: "Site header opens as a floating Navigation Menu panel (`variant=\"panel\"`) with smooth Base UI morphing transitions, directional content slide, clipped arrow, and semantic accent hover tokens.",
        href: "/docs/components/navigation-menu",
      },
      {
        kind: "changed",
        text: "Medusa preset aligned with the Medusa UI design system: light/dark surface hierarchy (`#fafafa`/`#ffffff` and `#18181b`/`#212124`), 6px/8px radii, multi-layered card/field/modal/flyout elevations, solid danger buttons, tactile switches/checkboxes/radios, and flush borders.",
        href: "/customize",
      },
      {
        kind: "changed",
        text: "Removed the legacy Blocks section and cleaned up its navigation, search, and sitemap entries.",
      },
    ],
  },
  {
    version: "1.4.0",
    title: "Media, boards, shaders, smarter fields",
    date: "2026-11-24",
    summary:
      "Nineteen components for media, writing, planning, dashboards, and forms, a real-time WebGL Shaders gallery and studio, a Project board block, a fuller Color Picker, and the Lumen theme as the installed default.",
    items: [
      {
        kind: "added",
        text: "Shaders: a real-time WebGL shader gallery and studio built with Lumen components, shipping 53 presets across 25 procedural GLSL engines (fluted and cubic glass, halftone print, ASCII matrix, dither, prism godrays, holographic sheen, hero domes, cloudscapes, and custom GLSL), live Blur and Chromatic Aberration controls, a 4-variation image generator, 1080p/4K PNG and React/GLSL export, and local saved shaders.",
        href: "/shaders",
        new: true,
      },
      {
        kind: "added",
        text: "Media with Lumen controls: Video with a buffered scrubber, speed, captions, and fullscreen; Audio Player with an optional waveform; Comparison Slider to wipe between two images.",
        links: mediaComponents,
      },
      {
        kind: "added",
        text: "Workflow components: Kanban with drag and keyboard moves, a Selection Bar for bulk actions, Inline Edit for text you change in place, and a Diff Viewer, unified or side by side.",
        links: workflowComponents,
      },
      {
        kind: "added",
        text: "Phone Input picks the country, formats as you type, and returns E.164. Currency Input formats amounts for the locale and can switch currency.",
        links: fieldComponents,
      },
      {
        kind: "added",
        text: "Writing: Markdown renders replies and docs with Lumen typography, safely and while they stream; Mention Input opens people on @ and commands on /; Emoji Picker searches emoji by name with skin tones.",
        links: contentComponents,
      },
      {
        kind: "added",
        text: "Planning and dashboards: Event Calendar in day, week, and month views; a Heatmap of daily activity; a Gauge with thresholds; and a Number Ticker that counts up to its value.",
        links: dataComponents,
      },
      {
        kind: "added",
        text: "Signature Pad draws or types a signature, Image Cropper crops to a ratio or a circle and returns the file, and an Onboarding Checklist tracks first steps.",
        links: captureComponents,
      },
      {
        kind: "added",
        text: "A Boards category in the Dashboard kit, with the Project board block and a Projects page built on Kanban.",
        new: true,
      },
      {
        kind: "added",
        text: "The docs sidebar has a What's new card with the latest release, and every docs page links to its source, an edit page, and a new issue on GitHub.",
        href: "/docs/changelog",
      },
      {
        kind: "changed",
        text: "Navigation Menu has a panel variant: a floating list of links under the trigger, and the viewport resizes between panels.",
        href: "/docs/components/navigation-menu",
        new: true,
      },
      {
        kind: "changed",
        text: "Color Picker reads and writes hex, rgb, hsl, and oklch, with an opacity slider, an eyedropper, swatches, a copy button, a field trigger, and ColorPickerPanel for an inline picker.",
        href: "/docs/components/color-picker",
      },
      {
        kind: "changed",
        text: "The Lumen theme is the default: init installs it and Customize opens on it. The warm, black theme stays as the Paper preset.",
        href: "/customize",
      },
      {
        kind: "added",
        text: "Customize adds a Medusa preset from the community Figma: zinc surfaces, tag colors, inverted buttons with their shadows, and a 6px control radius.",
        href: "/customize",
        new: true,
      },
      {
        kind: "changed",
        text: "Styles names the Medusa preset next to Paper.",
        href: "/docs/styles",
        new: true,
      },
      {
        kind: "changed",
        text: "Customize has sections with a preset picker, grouped colours, sliders, and an export pinned to the sidebar, next to a wider two-column preview.",
        href: "/customize",
      },
      {
        kind: "changed",
        text: "Chart series step down from the primary instead of the foreground, so charts take the theme hue: blue on Lumen, grey on Paper.",
        href: "/docs/components/chart",
      },
      {
        kind: "fixed",
        text: "Sidebar menu items and the blocks kit switcher follow the radius token instead of a fixed pill.",
        href: "/docs/components/sidebar",
      },
      {
        kind: "fixed",
        text: "Customize no longer logs a hydration error for visitors in dark mode.",
        href: "/customize",
      },
    ],
  },
  {
    version: "1.3.1",
    title: "Steady showcase film",
    date: "2026-11-18",
    summary: "The showcase film on the landing no longer shifts the page while it loads.",
    items: [
      {
        kind: "fixed",
        text: "The showcase film on the landing keeps its space while it loads, so the page no longer jumps.",
        href: "/",
      },
    ],
  },
  {
    version: "1.3.0",
    title: "Blocks, versions, sharper defaults",
    date: "2026-11-17",
    summary:
      "The Lumen kit as standalone blocks, versioned docs, a new theme, and components that follow the radius token.",
    items: [
      {
        kind: "added",
        text: "The Lumen kit is rebuilt as frozen, standalone blocks: the current landing, the earlier ones, and the site chrome. Blocks sit on the docs layout.",
      },
      {
        kind: "added",
        text: "Docs pages show the version that added them and the last one that changed them, and the header has a version select that opens older docs.",
        href: "/docs/changelog",
      },
      {
        kind: "changed",
        text: "A new theme: white background, blue primary, neutral greys, and a tighter radius.",
      },
      {
        kind: "changed",
        text: "Input, Textarea, Select, Input Group, Tag Input, OTP Field, and Number Field are outlined by default.",
        href: "/docs/components/input",
      },
      {
        kind: "changed",
        text: "Scroll Area, Select, Combobox, Autocomplete, Command, Menu, Context Menu, Notification Center, and Time Picker fade their content at the scroll edges.",
        href: "/docs/utils/scroll-fade",
      },
      {
        kind: "fixed",
        text: "Toggle, Toggle Group, Toolbar, Menubar, Tabs, and Drawer follow the radius token instead of a fixed pill or 24px corner.",
        links: [
          { name: "Toggle Group", href: "/docs/components/toggle-group" },
          { name: "Toolbar", href: "/docs/components/toolbar" },
          { name: "Menubar", href: "/docs/components/menubar" },
          { name: "Tabs", href: "/docs/components/tabs" },
          { name: "Drawer", href: "/docs/components/drawer" },
        ],
      },
      {
        kind: "fixed",
        text: "In dark mode, the Slider thumb uses the foreground colour instead of black.",
        href: "/docs/components/slider",
      },
    ],
  },
  {
    version: "1.2.0",
    title: "Components for AI apps",
    date: "2026-11-17",
    summary:
      "Form, data, and layout components, AI patterns built on one Trace, a loading Button, and status toasts.",
    items: [
      {
        kind: "added",
        text: "Twenty-three components: form fields for passwords, search, tags, files, and time; Data Table, Filter Bar, Tree View, Sortable List, Stat, Image Gallery, and Relative Time for data; Copy Button and Split Button; Banner, Avatar Group, Notification Center, and Tour; Stack, Container, Resizable, Marquee, and Visually Hidden for layout.",
        links: designSystemComponents,
      },
      {
        kind: "added",
        text: "AI patterns: Chat, Message, and Prompt Input for the thread; Reasoning, Tool, Plan, Task, Queue, Chain of Thought, and Subagent for the steps an agent takes, all built on one Trace; Terminal, Test Results, Stack Trace, and File Tree for what it produces; Sources and Inline Citation for where the answer comes from. Message Scroller, Code Block, and Attachment come with them.",
        links: aiComponents,
      },
      {
        kind: "added",
        text: "Button takes loading: a Spinner in place of the leading icon, aria-busy, and focus kept. Toasts show a hued icon for their type, and toast.promise() moves from loading to success or error.",
        href: "/docs/components/button#loading",
        new: true,
      },
      {
        kind: "fixed",
        text: "Destructive takes the crimson hue, so the destructive Button, Alert, and invalid fields match the crimson Badge and Callout.",
        href: "/docs/styles",
      },
      {
        kind: "fixed",
        text: "Secondary, muted, accent, the sidebar, and the gray panel use the warm neutral of the background, and the focus ring is darker so it reads on paper.",
        href: "/docs/styles",
      },
      {
        kind: "fixed",
        text: "Drawer shares the overlay of Dialog and Alert Dialog, and Button, Badge, and Progress animate only the properties that change.",
      },
      {
        kind: "fixed",
        text: "The outline Button has its own light fill instead of the page background, so it no longer reads as a hole.",
        href: "/docs/components/button#variants",
      },
      {
        kind: "fixed",
        text: "In dark mode, an Input inside an Input Group no longer paints its own fill over the group's, so the text area and the icon share one colour.",
        href: "/docs/components/input-group",
      },
      {
        kind: "fixed",
        text: "A long toast description wraps under the title, and the action is a large button at the bottom right.",
        href: "/docs/components/toast",
      },
    ],
  },
  {
    version: "1.1.0",
    title: "Installation and guides",
    date: "2026-10-29",
    summary:
      "A rewritten installation path, Choose and From shadcn, an accessibility page, recipes, a Sidebar that opens on hover, a CLI that keeps your edits, and a docs preview in the hero.",
    items: [
      {
        kind: "changed",
        text: "Installation is five steps from a React app to a rendered Button, then a CLI reference, lumen.json, theming, manual installation, and troubleshooting.",
        href: "/docs/installation",
        new: true,
      },
      {
        kind: "changed",
        text: "Frameworks shows the alias, the stylesheet, and the fonts for Next.js, Vite, React Router, Astro, and TanStack Start.",
        href: "/docs/frameworks",
        new: true,
      },
      {
        kind: "changed",
        text: "Alert info, warning, success, and destructive use the shared hues. Only destructive interrupts with role alert.",
        href: "/docs/components/alert",
        new: true,
      },
      {
        kind: "changed",
        text: "The CLI name for the dropdown is menu. lumenui list hides dropdown-menu. add menu still copies DropdownMenu.tsx, and add dropdown-menu still writes that file.",
        href: "/docs/components/menu",
        new: true,
      },
      {
        kind: "added",
        text: "Choose a component picks Select, Combobox, Autocomplete, or Command, and which menu, message, or layer to open.",
        href: "/docs/choose",
        new: true,
      },
      {
        kind: "added",
        text: "From shadcn maps the names that differ. Dropdown Menu is Menu, Sheet is Drawer, Hover Card is Preview Card, and Sonner is Toast.",
        href: "/docs/shadcn",
        new: true,
      },
      {
        kind: "changed",
        text: "The component list is grouped into Actions, Forms, Overlays, Navigation, Status, and Data. Each page lists the files its install command writes, and the preview can show light and dark together.",
        href: "/docs/components",
        new: true,
      },
      {
        kind: "added",
        text: "Accessibility says what Base UI already handles, and what you still name: the label, the dialog title, and when an alert may interrupt.",
        href: "/docs/accessibility",
        new: true,
      },
      {
        kind: "added",
        text: "The form recipe copies Field, Form, and Button in that order: label, control, error, then submit.",
        href: "/docs/recipes/form",
        new: true,
      },
      {
        kind: "added",
        text: "The settings recipe puts a plan, a status badge, and a notification switch in one card.",
        href: "/docs/recipes/settings",
        new: true,
      },
      {
        kind: "added",
        text: "Sidebar expandOnHover opens the icon rail while the pointer is over it and pushes the page like the trigger does.",
        href: "/docs/components/sidebar",
        new: true,
      },
      {
        kind: "changed",
        text: "Sidebar collapses smoothly: icons stay still in a 3.5rem rail, labels and badges fade, and every docs preview has a variant picker built on the App sidebar block.",
        href: "/docs/components/sidebar",
      },
      {
        kind: "fixed",
        text: "Sidebar keeps the avatar in icon mode, sizes lg rows for an avatar, tells active from hover, and SidebarSeparator no longer overflows.",
        href: "/docs/components/sidebar",
      },
      {
        kind: "added",
        text: "lumenui add skips a file you edited and says so. --overwrite replaces it.",
        href: "/docs/installation#update",
      },
      {
        kind: "changed",
        text: "The home hero shows the real Button docs page, the mega menu has one card per menu, and the 404 page follows the site design.",
      },
      {
        kind: "fixed",
        text: "The token sheet falls back to Inter and the system fonts when the font variables are missing.",
        href: "/docs/installation#layout",
      },
      {
        kind: "fixed",
        text: "Docs pages no longer scroll past the layout, and the Blocks layout no longer scrolls by one pixel.",
      },
      {
        kind: "fixed",
        text: "The Markdown of each page and llms-full.txt keep lists, tables, and subheadings.",
        href: "/docs/llms",
      },
    ],
  },
  {
    version: "1.0.7",
    title: "Shared hues and Callout",
    date: "2026-10-29",
    summary:
      "Callout, shared hues in the global sheet, field-matched cards, Data List, Theme Toggle, drawer and toast motion, pointer cursors, the CLI stylesheet, and the Customize preview.",
    items: [
      {
        kind: "added",
        text: "Callout for a short notice: soft, surface, or outline. The wash is a solid tint, the type reads on it, and the icon lines up with the first line.",
        href: "/docs/components/callout",
        new: true,
      },
      {
        kind: "added",
        text: "Data List lays out a record: one shared label column, and a value that can hold a badge, a link, or an action.",
        href: "/docs/components/data-list",
        new: true,
      },
      {
        kind: "changed",
        text: "Tabs line variant replaces the pill with a sliding underline. Color tints that line.",
        href: "/docs/components/tabs",
        new: true,
      },
      {
        kind: "added",
        text: "Theme Toggle switches light and dark with the sun and moon marks from the docs chrome.",
        href: "/docs/components/theme-toggle",
        new: true,
      },
      {
        kind: "changed",
        text: "Badge color paints gray, indigo, cyan, orange, crimson, and jade. Soft is a tint with saturated type. highContrast fills the pill.",
        href: "/docs/components/badge",
        new: true,
      },
      {
        kind: "changed",
        text: "Styles puts the shared hues in the global sheet: ink, wash, panel, and solid for each color.",
        href: "/docs/styles",
        new: true,
      },
      {
        kind: "changed",
        text: "Card secondary uses the same fill as inputs and selects.",
        href: "/docs/components/card",
        new: true,
      },
      {
        kind: "changed",
        text: "Select uses the same dark fill as inputs.",
        href: "/docs/components/select",
        new: true,
      },
      {
        kind: "fixed",
        text: "Drawer sticks to the edge it opens from, with a backdrop and a swipe transform. The mobile sidebar uses it.",
        href: "/docs/components/drawer",
        new: true,
      },
      {
        kind: "fixed",
        text: "Toasts stack, peek, and animate in and out.",
        href: "/docs/components/toast",
        new: true,
      },
      {
        kind: "fixed",
        text: "Sidebar keeps the desktop panel during hydration, so a mobile Suspense boundary no longer swaps it for an empty drawer.",
        href: "/docs/components/sidebar",
        new: true,
      },
      {
        kind: "fixed",
        text: "Checkboxes, switches, radios, menu rows, select options, and command items use a pointer cursor.",
        href: "/docs/components/button",
        new: true,
      },
      {
        kind: "changed",
        text: "init and add write globals.css, install Tailwind, and add the PostCSS config. An existing sheet without the Lumen tokens is replaced, and the previous file is kept as globals.css.bak.",
        href: "/docs/installation",
      },
      {
        kind: "changed",
        text: "Each component page shows the CLI install command above Usage. Copy includes the same section.",
      },
      {
        kind: "fixed",
        text: "Customize Light and Dark switches the preview to the palette being edited. The controls stay in the site theme.",
        href: "/customize",
      },
    ],
  },
  {
    version: "1.0.6",
    title: "Sharper Kbd, safer CLI",
    date: "2026-10-23",
    summary: "Kbd glyph alignment, CLI path and install hardening",
    items: [
      {
        kind: "fixed",
        text: "Kbd swaps ⌘ and arrow glyphs for Lucide icons at 1em so mono fallbacks no longer dwarf the letter.",
        href: "/docs/components/kbd",
      },
      {
        kind: "fixed",
        text: "CLI rejects path traversal in lumen.json and only installs packages declared in the registry, with --ignore-scripts.",
      },
      {
        kind: "fixed",
        text: "LLM and markdown routes use the canonical SITE_URL instead of request Host / X-Forwarded-* headers.",
      },
    ],
  },
  {
    version: "1.0.5",
    title: "Node.js security pin",
    date: "2026-10-23",
    summary:
      "Node.js pinned to the October 2026 security releases (22.23.4 / 24.22.1).",
    items: [
      {
        kind: "fixed",
        text: "Site, Nixpacks, and .nvmrc require Node 22.23.4. The CLI publish workflow uses Node 24.22.1.",
      },
    ],
  },
  {
    version: "1.0.4",
    title: "Trusted publishing",
    date: "2026-10-15",
    summary: "CLI releases publish to npm through Trusted Publisher (OIDC).",
    items: [
      {
        kind: "changed",
        text: "The Publish CLI workflow uses GitHub OIDC instead of a long-lived npm token.",
      },
    ],
  },
  {
    version: "1.0.3",
    title: "Buttons follow the radius",
    date: "2026-10-15",
    summary:
      "Buttons follow the theme radius token, and outline matches in light and dark.",
    items: [
      {
        kind: "changed",
        text: "Button and ButtonGroup use rounded-4xl so corners track --radius (pill at the default token).",
        href: "/docs/components/button",
      },
      {
        kind: "fixed",
        text: "Outline buttons keep bg-background in dark mode instead of going transparent.",
        href: "/docs/components/button",
      },
    ],
  },
  {
    version: "1.0.2",
    title: "Dashboard kit",
    date: "2026-10-13",
    summary:
      "Dashboard kit, a fixed Blocks layout, Command footer, and search in the header.",
    items: [
      {
        kind: "added",
        text: "Dashboard kit: sidebars, stats, charts, tables, activity, settings and full pages.",
      },
      {
        kind: "added",
        text: "CommandFooter under the list, with a muted ground and keyboard hints.",
        href: "/docs/components/command",
      },
      {
        kind: "added",
        text: "Header search opens a Command palette. Ask Lumen sits next to it.",
      },
      {
        kind: "changed",
        text: "Blocks keep a fixed shell: only the inset content scrolls. The site navbar sits beside the logo; the hamburger holds GitHub and the theme.",
      },
      {
        kind: "changed",
        text: "Sidebar inset matches the paper card pattern: flush panel, bordered SidebarInset.",
        href: "/docs/components/sidebar",
      },
      {
        kind: "fixed",
        text: "Progress and Meter use en-US for aria-valuetext, so SSR and the browser stay in sync.",
      },
    ],
  },
  {
    version: "1.0.1",
    title: "A new logo",
    date: "2026-10-09",
    summary:
      "New logo, a lighter home page, a rounder Blocks layout and an accessibility pass.",
    items: [
      {
        kind: "changed",
        text: "New logo: the Lumen UI symbol and wordmark from the logo kit. The favicon, the app icon and the share image follow.",
      },
      {
        kind: "changed",
        text: "The home page keeps three feature sections, aligns the hero to the left and ends on a footer over the painting, with a back-to-top button.",
      },
      {
        kind: "changed",
        text: "Blocks use a floating sidebar and rounded cards. The kit select moved into the sidebar, and categories with no block yet are hidden.",
      },
      {
        kind: "fixed",
        text: "The light and dark demo shows a light card in dark mode.",
      },
      {
        kind: "fixed",
        text: "Customize no longer scrolls the whole page sideways.",
        href: "/customize",
      },
      {
        kind: "fixed",
        text: "Muted text, and the soft destructive Button and Badge, meet AA contrast.",
      },
      {
        kind: "fixed",
        text: "Docs pages have their own title and description, a main landmark and a focus ring on the main menu. Sliders and progress bars in the examples have names.",
      },
    ],
  },
  {
    version: "1.0.0",
    title: "Customize and Blocks",
    date: "2026-10-08",
    summary: "Customize, blocks, Color Picker and a new home page.",
    items: [
      {
        kind: "added",
        text: "Customize previews colors, type, radius and shadow, then exports a preset for the CLI.",
        href: "/customize",
      },
      {
        kind: "added",
        text: "Blocks ship as copyable kits.",
      },
      {
        kind: "added",
        text: "Color Picker.",
        href: "/docs/components/color-picker",
      },
      {
        kind: "added",
        text: "Frameworks guide.",
        href: "/docs/frameworks",
      },
      {
        kind: "changed",
        text: "The home page shows a product hero with a Command palette and a Customize link in the navbar.",
      },
    ],
  },
  {
    version: "0.7.3",
    title: "Copy the init command",
    date: "2026-10-04",
    summary: "The landing page copies the init command.",
    items: [
      {
        kind: "added",
        text: "The home page copies npx @aloneday/lumenui@latest init.",
      },
    ],
  },
  {
    version: "0.7.2",
    title: "The CLI points home",
    date: "2026-10-04",
    summary: "The CLI homepage is the documentation site.",
    items: [
      {
        kind: "changed",
        text: "The npm package homepage is https://ui.elouanb.fr/.",
        href: "/docs/installation",
      },
    ],
  },
  {
    version: "0.7.1",
    title: "The CLI on npm",
    date: "2026-10-04",
    summary: "The CLI is on npm, at the same version as the site.",
    items: [
      {
        kind: "added",
        text: "npx @aloneday/lumenui@latest installs the CLI. A GitHub release publishes that same version.",
        href: "/docs/installation",
        new: true,
      },
    ],
  },
  {
    version: "0.7.0",
    title: "Charts and a copy CLI",
    date: "2026-10-04",
    summary:
      "Charts, a carousel, a calendar, a date picker, item rows, typography, and a copy CLI.",
    items: [
      {
        kind: "added",
        text: "Chart, carousel, calendar, date picker, item, and typography.",
        links: releaseComponents,
      },
      {
        kind: "added",
        text: "lumenui add, rm, and add all copy a component and install its npm dependencies.",
        href: "/docs/installation",
      },
      {
        kind: "added",
        text: "LLMs page for the plain-text index and the full corpus.",
        href: "/docs/llms",
        new: true,
      },
      {
        kind: "changed",
        text: "The Components section opens the component index.",
        href: "/docs/components",
        new: true,
      },
    ],
  },
  {
    version: "0.6.0",
    title: "Collapsible sidebar",
    date: "2026-09-30",
    summary:
      "A collapsible sidebar, an examples gallery, and an llms.txt corpus for agents.",
    items: [
      {
        kind: "added",
        text: "Collapsible sidebar: expanded, icon, off-canvas, and a drawer below the md breakpoint.",
        href: "/docs/components/sidebar",
        new: true,
      },
      {
        kind: "added",
        text: "Agents can read the whole system at /llms.txt, or the full docs, usage, API, and source at /llms-full.txt.",
      },
      {
        kind: "changed",
        text: "Examples are a card gallery of composed usages.",
      },
      {
        kind: "fixed",
        text: "Separator follows data-orientation, so horizontal and vertical rules stay visible.",
        href: "/docs/components/separator",
      },
    ],
  },
  {
    version: "0.5.0",
    title: "Native components",
    date: "2026-09-20",
    summary:
      "Thirteen new native components, a logo favicon, and full-width docs previews.",
    items: [
      {
        kind: "added",
        text: "Native components outside Base UI — framed table, stepper, command, and more.",
        links: nativeComponents,
      },
      {
        kind: "added",
        text: "Favicon and Apple touch icon from the Lumen mark.",
      },
      {
        kind: "changed",
        text: "Docs previews always fill the card. Smaller examples stay centered.",
      },
      {
        kind: "changed",
        text: "Themes playground removed. /themes and /docs/themes redirect to Styles.",
        href: "/docs/styles",
      },
    ],
  },
  {
    version: "0.4.0",
    title: "English docs",
    date: "2026-09-19",
    summary:
      "English docs, copy-paste CSS tokens, API reference tabs, and expandable code blocks.",
    items: [
      {
        kind: "added",
        text: "API reference tab on every component page: parts, props, types, and defaults.",
      },
      {
        kind: "added",
        text: "Copy-paste CSS variable sheet for consumer globals.css.",
        href: "/docs/styles",
        new: true,
      },
      {
        kind: "changed",
        text: "Default language is English.",
      },
      {
        kind: "changed",
        text: "Long code blocks collapse, with Show more and a larger dialog.",
      },
      {
        kind: "fixed",
        text: "Light-mode highlighter contrast and code block line spacing.",
      },
    ],
  },
  {
    version: "0.3.0",
    title: "A docs changelog",
    date: "2026-09-18",
    summary: "Docs changelog, novelty dots, and a composed examples bento.",
    items: [
      {
        kind: "added",
        text: "Changelog in the docs, novelty indicator, and displayed version.",
        href: "/docs/changelog",
      },
      {
        kind: "added",
        text: "Examples page as a bento of composed usages, outside the docs layout.",
      },
    ],
  },
  {
    version: "0.2.0",
    title: "First release",
    date: "2026-09-18",
    summary:
      "First design-system release: tokens, Base UI catalog, Polar / Medusa docs, landing.",
    items: [
      {
        kind: "added",
        text: "CSS tokens, light / dark theme, and Tailwind v4.",
        href: "/docs/styles",
      },
      {
        kind: "added",
        text: "Polar / Medusa docs: sidebar, breadcrumb, TOC, search.",
        href: "/docs",
      },
      {
        kind: "added",
        text: "Base UI component catalog.",
        links: addedComponents,
      },
      {
        kind: "changed",
        text: "Restyle of existing components: Alert, Badge, Button, Card, Input, Label, Select, Skeleton, Textarea.",
      },
    ],
  },
];

export function getLatestChangelog() {
  const [latest] = changelog;
  if (!latest) {
    throw new Error("Changelog is empty.");
  }
  return latest;
}

export function getNewDocsHrefs(version = getLatestChangelog().version) {
  const latest = changelog.find((entry) => entry.version === version);
  const hrefs = new Set<string>();

  if (!latest) {
    return hrefs;
  }

  for (const release of changelog) {
    if (release.date !== latest.date) {
      continue;
    }
    for (const item of release.items) {
      if (item.new && item.href) {
        hrefs.add(item.href);
      }
      for (const link of item.links ?? []) {
        if (link.new) {
          hrefs.add(link.href);
        }
      }
    }
  }

  return hrefs;
}

const latestNewHrefs = getNewDocsHrefs();

export function isNewDocsPage(href: string) {
  return latestNewHrefs.has(href);
}

export function changelogKindLabel(kind: ChangelogKind) {
  switch (kind) {
    case "added":
      return "Added";
    case "changed":
      return "Changed";
    case "fixed":
      return "Fixed";
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

export function formatChangelogDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}
