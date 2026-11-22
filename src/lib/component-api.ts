export type ApiProp = {
  name: string
  type: string
  default?: string
  description: string
}

export type ApiPart = {
  name: string
  description?: string
  props: ApiProp[]
}

export type ComponentApi = {
  slug: string
  source: string
  primitive?: string
  parts: ApiPart[]
}

const className: ApiProp = {
  name: "className",
  type: "string",
  description: "Merged with the Lumen classes via cn().",
}

const render: ApiProp = {
  name: "render",
  type: "React.ReactElement",
  description: "Compose onto another element. Base UI render prop.",
}

const children: ApiProp = {
  name: "children",
  type: "React.ReactNode",
  description: "Content of the part.",
}

const open: ApiProp = {
  name: "open",
  type: "boolean",
  description: "Controlled open state.",
}

const defaultOpen: ApiProp = {
  name: "defaultOpen",
  type: "boolean",
  description: "Uncontrolled initial open state.",
}

const onOpenChange: ApiProp = {
  name: "onOpenChange",
  type: "(open: boolean, eventDetails) => void",
  description: "Called when the open state changes.",
}

function part(
  name: string,
  description: string,
  props: ApiProp[] = [className]
): ApiPart {
  return { name, description, props }
}

export const componentApis: Record<string, ComponentApi> = {
  accordion: {
    slug: "accordion",
    source: "src/components/ui/Accordion.tsx",
    primitive: "@base-ui/react/accordion",
    parts: [
      part("Accordion", "Root. Accepts Base UI Accordion.Root props.", [
        className,
        {
          name: "defaultValue",
          type: "string[]",
          description: "Open item values on first render.",
        },
        {
          name: "value",
          type: "string[]",
          description: "Controlled open values.",
        },
        {
          name: "onValueChange",
          type: "(value: string[]) => void",
          description: "Called when open items change.",
        },
        {
          name: "multiple",
          type: "boolean",
          default: "false",
          description: "Allow several panels open at once.",
        },
      ]),
      part("AccordionItem", "One collapsible row.", [
        className,
        { name: "value", type: "string", description: "Item identity." },
        { name: "disabled", type: "boolean", description: "Disable this item." },
      ]),
      part("AccordionTrigger", "Header button. Renders a chevron.", [
        className,
        children,
      ]),
      part("AccordionPanel", "Animated panel.", [className, children]),
    ],
  },
  alert: {
    slug: "alert",
    source: "src/components/ui/Alert.tsx",
    parts: [
      part("Alert", "Status surface. Destructive uses role=\"alert\". The others use role=\"status\".", [
        className,
        {
          name: "variant",
          type: '"default" | "destructive" | "warning" | "success" | "info"',
          default: '"default"',
          description:
            "Visual tone. Info, warning, success, and destructive use the shared hues. Pass role to override the live region.",
        },
        {
          name: "role",
          type: "string",
          description:
            "Defaults to alert for destructive and status for every other variant.",
        },
      ]),
      part("AlertTitle", "Short heading.", [className, children]),
      part("AlertDescription", "Supporting copy.", [className, children]),
    ],
  },
  "alert-dialog": {
    slug: "alert-dialog",
    source: "src/components/ui/AlertDialog.tsx",
    primitive: "@base-ui/react/alert-dialog",
    parts: [
      part("AlertDialog", "Root. Accepts Base UI AlertDialog.Root props.", [
        open,
        defaultOpen,
        onOpenChange,
      ]),
      part("AlertDialogTrigger", "Opens the dialog.", [render, children]),
      part("AlertDialogContent", "Portal, backdrop, and popup.", [
        className,
        children,
      ]),
      part("AlertDialogHeader", "Title group.", [className, children]),
      part("AlertDialogFooter", "Actions row.", [className, children]),
      part("AlertDialogTitle", "Accessible title.", [className, children]),
      part("AlertDialogDescription", "Accessible description.", [
        className,
        children,
      ]),
      part("AlertDialogClose", "Closes the dialog.", [render, children]),
    ],
  },
  autocomplete: {
    slug: "autocomplete",
    source: "src/components/ui/Autocomplete.tsx",
    primitive: "@base-ui/react/autocomplete",
    parts: [
      part("Autocomplete", "Root. Accepts Base UI Autocomplete.Root props.", [
        {
          name: "items",
          type: "T[]",
          description: "Collection to filter.",
        },
        {
          name: "value",
          type: "string",
          description: "Controlled input value.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Called as the query changes.",
        },
      ]),
      part("AutocompleteInput", "Filter field.", [className]),
      part("AutocompleteContent", "Popup list.", [className, children]),
      part("AutocompleteList", "Rendered items.", [children]),
      part("AutocompleteItem", "One suggestion.", [
        className,
        { name: "value", type: "T", description: "Item value." },
        children,
      ]),
      part("AutocompleteEmpty", "Shown when nothing matches.", [
        className,
        children,
      ]),
    ],
  },
  avatar: {
    slug: "avatar",
    source: "src/components/ui/Avatar.tsx",
    primitive: "@base-ui/react/avatar",
    parts: [
      part("Avatar", "Root. Accepts Base UI Avatar.Root props.", [className]),
      part("AvatarImage", "Photo.", [
        className,
        { name: "src", type: "string", description: "Image URL." },
        { name: "alt", type: "string", description: "Accessible name." },
      ]),
      part("AvatarFallback", "Initials when the image is missing.", [
        className,
        children,
      ]),
    ],
  },
  badge: {
    slug: "badge",
    source: "src/components/ui/Badge.tsx",
    parts: [
      part("Badge", "Short pill label.", [
        className,
        {
          name: "variant",
          type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "success" | "warning"',
          default: '"default"',
          description:
            "Visual tone. Success is jade, warning is orange, destructive uses the destructive token. Ignored when color is set.",
        },
        {
          name: "color",
          type: '"gray" | "indigo" | "cyan" | "orange" | "crimson" | "jade"',
          description: "Soft hue. Jade is the status green.",
        },
        {
          name: "highContrast",
          type: "boolean",
          default: "false",
          description: "Fills the pill with the hue instead of a wash.",
        },
        render,
        children,
      ]),
    ],
  },
  breadcrumb: {
    slug: "breadcrumb",
    source: "src/components/ui/Breadcrumb.tsx",
    parts: [
      part("Breadcrumb", 'Native <nav> with aria-label="Breadcrumb".', [
        className,
        children,
      ]),
      part("BreadcrumbList", "Ordered list of the steps.", [
        className,
        children,
      ]),
      part("BreadcrumbItem", "One step.", [className, children]),
      part("BreadcrumbLink", "Link to an ancestor step.", [
        className,
        {
          name: "href",
          type: "string",
          description: "Target of the step. Omit it when you pass render.",
        },
        render,
        children,
      ]),
      part("BreadcrumbPage", "Current step. Sets aria-current=\"page\".", [
        className,
        children,
      ]),
      part("BreadcrumbSeparator", "Divider. Defaults to a chevron.", [
        className,
        {
          name: "children",
          type: "React.ReactNode",
          default: "<ChevronRightIcon />",
          description: "Replaces the chevron.",
        },
      ]),
      part(
        "BreadcrumbEllipsis",
        "Native <button> standing in for collapsed steps. Pair it with a DropdownMenuTrigger.",
        [
          className,
          {
            name: "children",
            type: "React.ReactNode",
            default: "<MoreHorizontalIcon />",
            description: "Replaces the ellipsis glyph.",
          },
        ]
      ),
    ],
  },
  button: {
    slug: "button",
    source: "src/components/ui/Button.tsx",
    primitive: "@base-ui/react/button",
    parts: [
      part("Button", "Pill action. Accepts Base UI Button props.", [
        className,
        {
          name: "variant",
          type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"',
          default: '"default"',
          description: "Visual tone.",
        },
        {
          name: "size",
          type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
          default: '"default"',
          description: "Height and padding.",
        },
        render,
        {
          name: "nativeButton",
          type: "boolean",
          description: "Force a native <button>. Defaults to true unless render is set.",
        },
        {
          name: "disabled",
          type: "boolean",
          description: "Disable pointer and fade the chrome.",
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description:
            "Shows a Spinner in place of the leading icon, sets aria-busy, and blocks clicks while keeping focus.",
        },
        {
          name: "focusableWhenDisabled",
          type: "boolean",
          default: "false",
          description:
            "Keep focus on the button while disabled. On by default while loading.",
        },
        {
          name: "type",
          type: '"button" | "submit" | "reset"',
          description:
            "Not implied as on a native button: set \"submit\" to submit a form.",
        },
        children,
      ]),
    ],
  },
  "button-group": {
    slug: "button-group",
    source: "src/components/ui/ButtonGroup.tsx",
    parts: [
      part("ButtonGroup", 'Joins buttons into one control. role="group".', [
        className,
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "Direction the buttons stack in.",
        },
        children,
      ]),
      part(
        "ButtonGroupSeparator",
        "Divider between filled segments. Outline buttons share borders instead.",
        [className]
      ),
    ],
  },
  calendar: {
    slug: "calendar",
    source: "src/components/ui/Calendar.tsx",
    primitive: "@daypicker/react",
    parts: [
      part("Calendar", "Month grid. Forwards DayPicker props.", [
        className,
        {
          name: "mode",
          type: '"single" | "multiple" | "range"',
          description: "What a click selects. Omit it for a calendar with no selection.",
        },
        {
          name: "selected",
          type: "Date | Date[] | DateRange",
          description: "The current selection. The shape follows mode.",
        },
        {
          name: "onSelect",
          type: "(selected, triggerDate, modifiers, event) => void",
          description: "Called when the selection changes.",
        },
        {
          name: "showOutsideDays",
          type: "boolean",
          default: "true",
          description: "Show the days that belong to the previous and next months.",
        },
        {
          name: "navLayout",
          type: '"around" | "after"',
          default: '"around"',
          description: "Around places the chevrons on either side of the month label.",
        },
      ]),
    ],
  },
  callout: {
    slug: "callout",
    source: "src/components/ui/Callout.tsx",
    parts: [
      part("Callout", "Notice. Soft wash, surface, or outline.", [
        className,
        {
          name: "variant",
          type: '"soft" | "surface" | "outline"',
          default: '"soft"',
          description: "Wash, wash plus a line, or the line alone.",
        },
        {
          name: "size",
          type: '"sm" | "default" | "lg"',
          default: '"default"',
          description: "Padding and type size.",
        },
        {
          name: "color",
          type: '"gray" | "indigo" | "cyan" | "orange" | "crimson" | "jade"',
          default: '"gray"',
          description: "Hue of the wash, the line, and the type.",
        },
        {
          name: "highContrast",
          type: "boolean",
          default: "false",
          description: "Deepens the hue.",
        },
        {
          name: "role",
          type: "string",
          description: 'Set to "alert" when the reader must hear it at once.',
        },
        children,
      ]),
      part("CalloutIcon", "Leading icon. Aligns to the first line.", [
        className,
        children,
      ]),
      part("CalloutText", "The sentence. Links are underlined.", [
        className,
        children,
      ]),
    ],
  },
  card: {
    slug: "card",
    source: "src/components/ui/Card.tsx",
    parts: [
      part("Card", "Flat surface.", [
        className,
        {
          name: "variant",
          type: '"default" | "secondary"',
          default: '"default"',
          description: "Outline paper, or the field fill without a border.",
        },
        {
          name: "size",
          type: '"default" | "sm"',
          default: '"default"',
          description: "Padding and gap.",
        },
        children,
      ]),
      part("CardHeader", "Title group.", [className, children]),
      part("CardTitle", "Heading.", [className, children]),
      part("CardDescription", "Supporting copy.", [className, children]),
      part("CardContent", "Body.", [className, children]),
      part("CardFooter", "Actions row.", [className, children]),
    ],
  },
  carousel: {
    slug: "carousel",
    source: "src/components/ui/Carousel.tsx",
    primitive: "embla-carousel-react",
    parts: [
      part("Carousel", "Root. Owns the Embla API and the slide context.", [
        className,
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "Axis. Horizontal chevrons point sideways; vertical ones point up and down.",
        },
        {
          name: "opts",
          type: "EmblaOptionsType",
          description: "Embla options. loop, align, startIndex, dragFree. axis follows orientation unless set here.",
        },
        {
          name: "autoplay",
          type: "boolean | number",
          default: "false",
          description:
            "Advance on a timer. true waits 4s. A number is the delay in ms. Loops unless opts.loop is false. Pauses while the pointer is over the carousel.",
        },
        {
          name: "plugins",
          type: "EmblaPluginType[]",
          description: "Extra Embla plugins, passed through to useEmblaCarousel.",
        },
        {
          name: "setApi",
          type: "(api: CarouselApi) => void",
          description: "Receives the Embla API once it exists.",
        },
        children,
      ]),
      part("CarouselContent", "Viewport. Overflow is clipped here. Set a height for a vertical carousel.", [
        className,
        children,
      ]),
      part("CarouselItem", "One slide. basis-full until you override it.", [
        className,
        children,
      ]),
      part("CarouselPrevious", "Outline icon button. Disabled when Embla cannot scroll back.", [
        className,
      ]),
      part("CarouselNext", "Outline icon button. Disabled when Embla cannot scroll forward.", [
        className,
      ]),
      part("CarouselDots", "Ink dots. The current snap is a short pill.", [className]),
    ],
  },
  chart: {
    slug: "chart",
    source: "src/components/ui/Chart.tsx",
    primitive: "recharts",
    parts: [
      part("Chart", "Responsive frame. Config keys become --color-<key> on the container.", [
        className,
        {
          name: "config",
          type: "Record<string, { label?: string; color?: string }>",
          description: "Series labels. Color defaults to the primary scale; set color to override a tone.",
        },
        children,
      ]),
      part("ChartGrid", "Horizontal hairlines in the border token. Accepts Recharts CartesianGrid props.", [
        className,
      ]),
      part("ChartXAxis", "Muted ticks, no axis line. Accepts Recharts XAxis props.", [className]),
      part("ChartYAxis", "Muted ticks, no axis line. Accepts Recharts YAxis props.", [className]),
      part("ChartTooltip", "Recharts Tooltip with the Lumen popup content.", [className]),
      part("ChartTooltipContent", "Label, ink dot, and a tabular value.", [className]),
      part("ChartLegend", "Recharts Legend with text dots.", [className]),
      part("ChartLegendContent", "Row of series labels.", [className]),
    ],
  },
  checkbox: {
    slug: "checkbox",
    source: "src/components/ui/Checkbox.tsx",
    primitive: "@base-ui/react/checkbox",
    parts: [
      part("Checkbox", "Accepts Base UI Checkbox.Root props.", [
        className,
        {
          name: "checked",
          type: "boolean | \"indeterminate\"",
          description: "Controlled state.",
        },
        {
          name: "defaultChecked",
          type: "boolean",
          description: "Uncontrolled initial state.",
        },
        {
          name: "onCheckedChange",
          type: "(checked: boolean, eventDetails) => void",
          description: "Called when the value changes.",
        },
        { name: "disabled", type: "boolean", description: "Disable the control." },
        { name: "value", type: "string", description: "Value inside a group." },
      ]),
    ],
  },
  "checkbox-group": {
    slug: "checkbox-group",
    source: "src/components/ui/CheckboxGroup.tsx",
    primitive: "@base-ui/react/checkbox-group",
    parts: [
      part("CheckboxGroup", "Shared state for checkboxes.", [
        className,
        {
          name: "value",
          type: "string[]",
          description: "Controlled selected values.",
        },
        {
          name: "defaultValue",
          type: "string[]",
          description: "Uncontrolled initial values.",
        },
        {
          name: "onValueChange",
          type: "(value: string[]) => void",
          description: "Called when the selection changes.",
        },
        children,
      ]),
    ],
  },
  collapsible: {
    slug: "collapsible",
    source: "src/components/ui/Collapsible.tsx",
    primitive: "@base-ui/react/collapsible",
    parts: [
      part("Collapsible", "Root. Accepts Base UI Collapsible.Root props.", [
        open,
        defaultOpen,
        onOpenChange,
      ]),
      part("CollapsibleTrigger", "Toggles the panel.", [render, children]),
      part("CollapsiblePanel", "Animated content.", [className, children]),
    ],
  },
  "color-picker": {
    slug: "color-picker",
    source: "src/components/ui/ColorPicker.tsx",
    parts: [
      part("ColorPicker", "Swatch trigger. The popup edits hue, saturation, brightness, and hex.", [
        className,
        { name: "value", type: "string", description: "Controlled hex color, #rrggbb." },
        { name: "defaultValue", type: "string", default: "#262626", description: "Uncontrolled initial hex." },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Called with a normalized #rrggbb color.",
        },
        { name: "disabled", type: "boolean", description: "Prevents opening the popup." },
        { name: "aria-label", type: "string", default: "Color", description: "Name of the color being edited." },
      ]),
    ],
  },
  combobox: {
    slug: "combobox",
    source: "src/components/ui/Combobox.tsx",
    primitive: "@base-ui/react/combobox",
    parts: [
      part("Combobox", "Root. Accepts Base UI Combobox.Root props.", [
        { name: "items", type: "T[]", description: "Collection to pick from." },
        { name: "value", type: "T", description: "Controlled value." },
        {
          name: "onValueChange",
          type: "(value: T) => void",
          description: "Called when a value is chosen.",
        },
      ]),
      part("ComboboxInput", "Editable field.", [className]),
      part("ComboboxTrigger", "Optional opener.", [className, render]),
      part("ComboboxContent", "Popup list.", [className, children]),
      part("ComboboxList", "Rendered items.", [children]),
      part("ComboboxItem", "One option.", [
        className,
        { name: "value", type: "T", description: "Option value." },
        children,
      ]),
      part("ComboboxEmpty", "Shown when nothing matches.", [className, children]),
    ],
  },
  command: {
    slug: "command",
    source: "src/components/ui/Command.tsx",
    primitive: "cmdk",
    parts: [
      part("Command", "Root. Accepts cmdk Command props.", [
        className,
        {
          name: "value",
          type: "string",
          description: "Controlled value of the highlighted item.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Called when the highlighted item changes.",
        },
        {
          name: "filter",
          type: "(value: string, search: string, keywords?: string[]) => number",
          description: "Custom scoring. Return 0 to hide an item.",
        },
        {
          name: "shouldFilter",
          type: "boolean",
          default: "true",
          description: "Set to false when you filter items yourself.",
        },
        {
          name: "loop",
          type: "boolean",
          default: "false",
          description: "Wrap the selection at both ends of the list.",
        },
      ]),
      part("CommandDialog", "Command wrapped in the Lumen Dialog.", [
        className,
        open,
        onOpenChange,
        {
          name: "title",
          type: "string",
          default: '"Command palette"',
          description: "Screen-reader title of the dialog.",
        },
        {
          name: "description",
          type: "string",
          default: '"Search for a command to run."',
          description: "Screen-reader description of the dialog.",
        },
        children,
      ]),
      part("CommandInput", "Search field. Renders a leading search icon.", [
        className,
        { name: "value", type: "string", description: "Controlled search text." },
        {
          name: "onValueChange",
          type: "(search: string) => void",
          description: "Called when the search text changes.",
        },
        {
          name: "placeholder",
          type: "string",
          description: "Placeholder of the field.",
        },
      ]),
      part("CommandList", "Scrollable container of the results.", [
        className,
        children,
      ]),
      part("CommandEmpty", "Shown when nothing matches.", [className, children]),
      part("CommandGroup", "Titled section of items.", [
        className,
        {
          name: "heading",
          type: "React.ReactNode",
          description: "Label rendered above the items.",
        },
        {
          name: "value",
          type: "string",
          description: "Group identity. Defaults to the heading.",
        },
        children,
      ]),
      part("CommandItem", "One selectable command.", [
        className,
        {
          name: "value",
          type: "string",
          description: "Value matched by the filter. Defaults to the text content.",
        },
        {
          name: "keywords",
          type: "string[]",
          description: "Extra terms the filter matches against.",
        },
        {
          name: "onSelect",
          type: "(value: string) => void",
          description: "Called on click or Enter.",
        },
        {
          name: "disabled",
          type: "boolean",
          description: "Disable this item.",
        },
        children,
      ]),
      part("CommandSeparator", "Divider between groups.", [className]),
      part("CommandShortcut", "Right-aligned Kbd keycap.", [
        className,
        {
          name: "size",
          type: '"sm" | "default" | "lg"',
          default: '"default"',
          description: "Forwarded to Kbd.",
        },
        {
          name: "variant",
          type: '"default" | "outline" | "ghost"',
          default: '"default"',
          description: "Forwarded to Kbd.",
        },
        children,
      ]),
      part("CommandFooter", "Bar under the list for hints or actions.", [
        className,
        children,
      ]),
    ],
  },
  "context-menu": {
    slug: "context-menu",
    source: "src/components/ui/ContextMenu.tsx",
    primitive: "@base-ui/react/context-menu",
    parts: [
      part("ContextMenu", "Root. Accepts Base UI ContextMenu.Root props.", []),
      part("ContextMenuTrigger", "Right-click or long-press target.", [
        className,
        render,
        children,
      ]),
      part("ContextMenuContent", "Portal menu.", [className, children]),
      part("ContextMenuItem", "One action.", [className, children]),
      part("ContextMenuSeparator", "Divider.", [className]),
      part("ContextMenuCheckboxItem", "Checkable row.", [
        className,
        { name: "checked", type: "boolean", description: "Checked state." },
        children,
      ]),
    ],
  },
  "data-list": {
    slug: "data-list",
    source: "src/components/ui/DataList.tsx",
    parts: [
      part("DataList", "Description list. Horizontal rows share one label column.", [
        className,
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "Label beside the value, or above it.",
        },
        {
          name: "size",
          type: '"sm" | "default" | "lg"',
          default: '"default"',
          description: "Row gap, and the size of the value. lg also grows the label.",
        },
        children,
      ]),
      part("DataListItem", "One pair. A horizontal list uses a subgrid so every label lines up.", [
        className,
        {
          name: "align",
          type: '"start" | "center" | "end" | "baseline" | "stretch"',
          default: '"baseline"',
          description: "Aligns the label with the value. Center a badge or a button.",
        },
        children,
      ]),
      part("DataListLabel", "The key. Renders a dt. Horizontal labels start at 7.5rem.", [
        className,
        {
          name: "width",
          type: "React.CSSProperties['width']",
          description: "Fixed label width.",
        },
        {
          name: "minWidth",
          type: "React.CSSProperties['minWidth']",
          description: "Overrides the shared label column. 5.5rem matches a short key.",
        },
        {
          name: "maxWidth",
          type: "React.CSSProperties['maxWidth']",
          description: "Caps the label column.",
        },
        {
          name: "color",
          type: '"gray" | "indigo" | "cyan" | "orange" | "crimson"',
          default: '"gray"',
          description: "Label hue. Gray is the muted default.",
        },
        {
          name: "highContrast",
          type: "boolean",
          default: "false",
          description: "Uses the full ink of the hue instead of the softer tint.",
        },
        children,
      ]),
      part("DataListValue", "The value. Renders a flex dd, so a badge and an action sit on one line.", [
        className,
        children,
      ]),
    ],
  },
  "date-picker": {
    slug: "date-picker",
    source: "src/components/ui/DatePicker.tsx",
    primitive: "@daypicker/react",
    parts: [
      part("DatePicker", "Outline button. Opens a calendar in a popover.", [
        className,
        {
          name: "mode",
          type: '"single" | "range"',
          default: '"single"',
          description: "One day, or a start and an end. Range stays open until both are set.",
        },
        {
          name: "value",
          type: "Date | DateRange",
          description: "Controlled selection. Date in single mode, DateRange in range mode.",
        },
        {
          name: "defaultValue",
          type: "Date | DateRange",
          description: "Initial selection when value is not set.",
        },
        {
          name: "onValueChange",
          type: "(value: Date | DateRange | undefined) => void",
          description: "Called when the selection changes.",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Pick a date"',
          description: "Shown while nothing is selected. Range defaults to Pick a range.",
        },
        {
          name: "disabled",
          type: "boolean",
          description: "Disables the trigger.",
        },
      ]),
    ],
  },
  dialog: {
    slug: "dialog",
    source: "src/components/ui/Dialog.tsx",
    primitive: "@base-ui/react/dialog",
    parts: [
      part("Dialog", "Root. Accepts Base UI Dialog.Root props.", [
        open,
        defaultOpen,
        onOpenChange,
      ]),
      part("DialogTrigger", "Opens the dialog.", [render, children]),
      part("DialogContent", "Portal, backdrop, and popup.", [
        className,
        {
          name: "showClose",
          type: "boolean",
          default: "true",
          description: "Render the top-right close button.",
        },
        children,
      ]),
      part("DialogHeader", "Title group.", [className, children]),
      part("DialogFooter", "Actions row.", [className, children]),
      part("DialogTitle", "Accessible title.", [className, children]),
      part("DialogDescription", "Accessible description.", [className, children]),
      part("DialogClose", "Closes the dialog.", [render, children]),
    ],
  },
  drawer: {
    slug: "drawer",
    source: "src/components/ui/Drawer.tsx",
    primitive: "@base-ui/react/drawer",
    parts: [
      part("DrawerProvider", "Optional scope for nested drawers.", []),
      part("Drawer", "Root. Accepts Base UI Drawer.Root props.", [
        open,
        defaultOpen,
        onOpenChange,
        {
          name: "swipeDirection",
          type: '"up" | "down" | "left" | "right"',
          default: '"down"',
          description: "Edge the panel comes from.",
        },
      ]),
      part("DrawerTrigger", "Opens the drawer.", [render, children]),
      part("DrawerPopup", "Portal, backdrop, viewport, and panel.", [
        className,
        children,
      ]),
      part("DrawerContent", "Inner column.", [className, children]),
      part("DrawerHeader", "Title group.", [className, children]),
      part("DrawerFooter", "Actions row.", [className, children]),
      part("DrawerTitle", "Accessible title.", [className, children]),
      part("DrawerDescription", "Accessible description.", [className, children]),
      part("DrawerClose", "Closes the drawer.", [render, children]),
    ],
  },
  field: {
    slug: "field",
    source: "src/components/ui/Field.tsx",
    primitive: "@base-ui/react/field",
    parts: [
      part("Field", "Root. Accepts Base UI Field.Root props.", [
        className,
        { name: "name", type: "string", description: "Form field name." },
        { name: "invalid", type: "boolean", description: "Force invalid." },
      ]),
      part("FieldLabel", "Visible label.", [className, children]),
      part("FieldControl", "Input chrome.", [className]),
      part("FieldDescription", "Help text.", [className, children]),
      part("FieldError", "Validation message.", [
        className,
        {
          name: "match",
          type: "string",
          description: "Native validity key, e.g. valueMissing.",
        },
        children,
      ]),
    ],
  },
  fieldset: {
    slug: "fieldset",
    source: "src/components/ui/Fieldset.tsx",
    primitive: "@base-ui/react/fieldset",
    parts: [
      part("Fieldset", "Native fieldset. Accepts Base UI Fieldset.Root props.", [
        className,
        children,
      ]),
      part("FieldsetLegend", "Legend.", [className, children]),
    ],
  },
  form: {
    slug: "form",
    source: "src/components/ui/Form.tsx",
    primitive: "@base-ui/react/form",
    parts: [
      part("Form", "Native form with consolidated errors.", [
        className,
        {
          name: "onFormSubmit",
          type: "(formValues: FormData) => void",
          description: "Called with valid values.",
        },
        {
          name: "errors",
          type: "Record<string, string | string[]>",
          description: "Server-side errors keyed by field name.",
        },
        children,
      ]),
    ],
  },
  input: {
    slug: "input",
    source: "src/components/ui/Input.tsx",
    primitive: "@base-ui/react/input",
    parts: [
      part("Input", "Accepts native input props.", [
        className,
        { name: "type", type: "string", default: '"text"', description: "Input type." },
        { name: "disabled", type: "boolean", description: "Disable the field." },
        {
          name: "aria-invalid",
          type: "boolean",
          description: "Draws the destructive ring.",
        },
      ]),
    ],
  },
  kbd: {
    slug: "kbd",
    source: "src/components/ui/Kbd.tsx",
    parts: [
      part("Kbd", "Renders a native <kbd> keycap.", [
        className,
        {
          name: "size",
          type: '"sm" | "default" | "lg"',
          default: '"default"',
          description: "Cap height. Inherited from KbdGroup when unset.",
        },
        {
          name: "variant",
          type: '"default" | "outline" | "ghost"',
          default: '"default"',
          description:
            "Surface of the key. ghost tints the current text colour, for keys on a filled surface.",
        },
        children,
      ]),
      part("KbdGroup", "Row of keys. Separators are plain text.", [
        className,
        {
          name: "size",
          type: '"sm" | "default" | "lg"',
          default: '"default"',
          description: "Sets the gap and cascades to the nested Kbd.",
        },
        children,
      ]),
    ],
  },
  label: {
    slug: "label",
    source: "src/components/ui/Label.tsx",
    parts: [
      part("Label", "Native label. Place it above the control.", [
        className,
        { name: "htmlFor", type: "string", description: "Associated control id." },
        children,
      ]),
    ],
  },
  menu: {
    slug: "menu",
    source: "src/components/ui/Menu.tsx",
    primitive: "@base-ui/react/menu",
    parts: [
      part("Menu", "Root. Accepts Base UI Menu.Root props.", [
        open,
        defaultOpen,
        onOpenChange,
      ]),
      part("MenuTrigger", "Opens the menu.", [render, children]),
      part("MenuContent", "Portal popup.", [className, children]),
      part("MenuItem", "One action.", [className, children]),
      part("MenuSeparator", "Divider.", [className]),
    ],
  },
  menubar: {
    slug: "menubar",
    source: "src/components/ui/Menubar.tsx",
    primitive: "@base-ui/react/menubar",
    parts: [
      part("Menubar", "Application menu bar. Compose with Menu parts.", [
        className,
        children,
      ]),
    ],
  },
  meter: {
    slug: "meter",
    source: "src/components/ui/Meter.tsx",
    primitive: "@base-ui/react/meter",
    parts: [
      part("Meter", "Accepts Base UI Meter.Root props.", [
        className,
        { name: "value", type: "number", description: "Current value." },
        { name: "min", type: "number", default: "0", description: "Range start." },
        { name: "max", type: "number", default: "100", description: "Range end." },
      ]),
    ],
  },
  "navigation-menu": {
    slug: "navigation-menu",
    source: "src/components/ui/NavigationMenu.tsx",
    primitive: "@base-ui/react/navigation-menu",
    parts: [
      part("NavigationMenu", "Root. Accepts Base UI NavigationMenu.Root props.", [
        className,
        children,
      ]),
      part("NavigationMenuList", "Trigger row.", [className, children]),
      part("NavigationMenuItem", "One menu.", [
        className,
        { name: "value", type: "string", description: "Item identity." },
        children,
      ]),
      part("NavigationMenuTrigger", "Opens a panel.", [className, children]),
      part("NavigationMenuContent", "Panel contents.", [className, children]),
      part("NavigationMenuPanel", "Full-width inner grid.", [className, children]),
      part("NavigationMenuGroup", "Labeled column.", [
        className,
        { name: "title", type: "string", description: "Column heading." },
        children,
      ]),
      part("NavigationMenuLink", "Item link.", [
        className,
        {
          name: "variant",
          type: '"default" | "featured" | "muted"',
          default: '"default"',
          description: "Link chrome.",
        },
        { name: "href", type: "string", description: "Destination." },
        render,
        children,
      ]),
      part("NavigationMenuPortal", "Renders the popup. Defaults container to the menu root.", [
        {
          name: "container",
          type: "HTMLElement | null",
          description: "Portal target. Defaults to the NavigationMenu root.",
        },
      ]),
      part("NavigationMenuBackdrop", "Page blur while the mega menu is open. Unmounts on close.", [
        className,
      ]),
      part("NavigationMenuPositioner", "Full-width overlay under the bar.", [
        className,
        {
          name: "side",
          type: '"top" | "bottom" | "left" | "right"',
          default: '"bottom"',
          description: "Popup side.",
        },
        {
          name: "align",
          type: '"start" | "center" | "end"',
          default: '"start"',
          description: "Horizontal alignment.",
        },
      ]),
      part("NavigationMenuPopup", "Animated overlay surface.", [className, children]),
      part("NavigationMenuViewport", "Clips and sizes the open panel.", [className]),
    ],
  },
  "number-field": {
    slug: "number-field",
    source: "src/components/ui/NumberField.tsx",
    primitive: "@base-ui/react/number-field",
    parts: [
      part("NumberField", "Root. Accepts Base UI NumberField.Root props.", [
        className,
        { name: "value", type: "number | null", description: "Controlled value." },
        {
          name: "defaultValue",
          type: "number",
          description: "Uncontrolled initial value.",
        },
        { name: "min", type: "number", description: "Minimum." },
        { name: "max", type: "number", description: "Maximum." },
        { name: "step", type: "number", description: "Increment step." },
      ]),
      part("NumberFieldGroup", "Input plus steppers.", [className, children]),
      part("NumberFieldInput", "Numeric input.", [className]),
      part("NumberFieldIncrement", "Plus control.", [className]),
      part("NumberFieldDecrement", "Minus control.", [className]),
    ],
  },
  "otp-field": {
    slug: "otp-field",
    source: "src/components/ui/OTPField.tsx",
    primitive: "@base-ui/react/otp-field",
    parts: [
      part("OTPField", "Root. Accepts Base UI OTPField.Root props.", [
        className,
        {
          name: "length",
          type: "number",
          description: "Number of cells.",
        },
        { name: "value", type: "string", description: "Controlled code." },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Called as digits are entered.",
        },
      ]),
      part("OTPFieldInput", "One cell. Repeat length times.", [className]),
      part("OTPFieldSeparator", "Optional divider between cells.", [className]),
    ],
  },
  popover: {
    slug: "popover",
    source: "src/components/ui/Popover.tsx",
    primitive: "@base-ui/react/popover",
    parts: [
      part("Popover", "Root. Accepts Base UI Popover.Root props.", [
        open,
        defaultOpen,
        onOpenChange,
      ]),
      part("PopoverTrigger", "Anchor button.", [render, children]),
      part("PopoverContent", "Portal popup.", [className, children]),
      part("PopoverTitle", "Accessible title.", [className, children]),
      part("PopoverDescription", "Supporting copy.", [className, children]),
      part("PopoverClose", "Closes the popover.", [render, children]),
    ],
  },
  "preview-card": {
    slug: "preview-card",
    source: "src/components/ui/PreviewCard.tsx",
    primitive: "@base-ui/react/preview-card",
    parts: [
      part("PreviewCard", "Root. Accepts Base UI PreviewCard.Root props.", [
        open,
        defaultOpen,
        onOpenChange,
      ]),
      part("PreviewCardTrigger", "Hover or focus target, usually a link.", [
        className,
        { name: "href", type: "string", description: "Link destination." },
        children,
      ]),
      part("PreviewCardContent", "Hover preview.", [className, children]),
    ],
  },
  progress: {
    slug: "progress",
    source: "src/components/ui/Progress.tsx",
    primitive: "@base-ui/react/progress",
    parts: [
      part("Progress", "Accepts Base UI Progress.Root props.", [
        className,
        { name: "value", type: "number", description: "Current value, 0–100." },
      ]),
    ],
  },
  "radio-group": {
    slug: "radio-group",
    source: "src/components/ui/RadioGroup.tsx",
    primitive: "@base-ui/react/radio-group",
    parts: [
      part("RadioGroup", "Exclusive choice. Accepts Base UI RadioGroup props.", [
        className,
        { name: "value", type: "string", description: "Controlled value." },
        {
          name: "defaultValue",
          type: "string",
          description: "Uncontrolled initial value.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Called when the selection changes.",
        },
        children,
      ]),
      part("RadioGroupItem", "One radio.", [
        className,
        { name: "value", type: "string", description: "Option value." },
      ]),
    ],
  },
  "scroll-area": {
    slug: "scroll-area",
    source: "src/components/ui/ScrollArea.tsx",
    primitive: "@base-ui/react/scroll-area",
    parts: [
      part("ScrollArea", "Viewport plus custom scrollbar.", [
        className,
        children,
      ]),
    ],
  },
  select: {
    slug: "select",
    source: "src/components/ui/Select.tsx",
    primitive: "@base-ui/react/select",
    parts: [
      part("Select", "Root. Accepts Base UI Select.Root props.", [
        { name: "value", type: "string", description: "Controlled value." },
        {
          name: "defaultValue",
          type: "string",
          description: "Uncontrolled initial value.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Called when an item is chosen.",
        },
      ]),
      part("SelectTrigger", "Closed field.", [
        className,
        {
          name: "size",
          type: '"default" | "sm"',
          default: '"default"',
          description: "Trigger height.",
        },
        children,
      ]),
      part("SelectValue", "Shows the current label.", [className]),
      part("SelectContent", "Portal list.", [
        className,
        {
          name: "side",
          type: '"top" | "bottom" | "left" | "right"',
          default: '"bottom"',
          description: "Popup side.",
        },
        {
          name: "align",
          type: '"start" | "center" | "end"',
          default: '"center"',
          description: "Horizontal alignment.",
        },
        children,
      ]),
      part("SelectItem", "One option.", [
        className,
        { name: "value", type: "string", description: "Option value." },
        children,
      ]),
      part("SelectGroup", "Optional grouping.", [className, children]),
    ],
  },
  separator: {
    slug: "separator",
    source: "src/components/ui/Separator.tsx",
    primitive: "@base-ui/react/separator",
    parts: [
      part("Separator", "Accepts Base UI Separator props.", [
        className,
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "Axis.",
        },
      ]),
    ],
  },
  sidebar: {
    slug: "sidebar",
    source: "src/components/ui/Sidebar.tsx",
    parts: [
      part(
        "SidebarProvider",
        "Shell. Owns open state, the mobile drawer, and the ⌘B / Ctrl+B shortcut.",
        [
          className,
          {
            name: "defaultOpen",
            type: "boolean",
            default: "true",
            description: "Uncontrolled initial desktop state.",
          },
          open,
          {
            name: "onOpenChange",
            type: "(open: boolean) => void",
            description: "Called when the desktop sidebar opens or closes.",
          },
          {
            name: "shortcut",
            type: "boolean",
            default: "true",
            description: "Listen for ⌘B / Ctrl+B. Turn off when several sidebars share a page.",
          },
          children,
        ]
      ),
      part(
        "Sidebar",
        "The panel. Below md it becomes a Drawer. collapsible=\"none\" stays open.",
        [
          className,
          {
            name: "side",
            type: '"left" | "right"',
            default: '"left"',
            description: "Edge the panel sits on.",
          },
          {
            name: "variant",
            type: '"sidebar" | "floating" | "inset"',
            default: '"sidebar"',
            description:
              "Flat column, floating card, or inset — pair inset with SidebarInset.",
          },
          {
            name: "collapsible",
            type: '"offcanvas" | "icon" | "none"',
            default: '"offcanvas"',
            description: "Slides away, shrinks to icons, or stays open.",
          },
          {
            name: "expandOnHover",
            type: "boolean",
            default: "false",
            description:
              "With collapsible=\"icon\": hovering the collapsed rail opens it like the trigger, leaving closes it.",
          },
          children,
        ]
      ),
      part("SidebarTrigger", "Ghost icon button. Toggles desktop or the mobile drawer.", [
        className,
        children,
      ]),
      part("SidebarRail", "Edge hit target that toggles the desktop sidebar.", [
        className,
      ]),
      part("SidebarInset", "Main column. With variant=\"inset\" it becomes the paper card.", [
        className,
        children,
      ]),
      part("SidebarHeader", "Top of the panel.", [className, children]),
      part("SidebarContent", "Scrollable middle. Put groups here.", [
        className,
        children,
      ]),
      part("SidebarFooter", "Pinned to the bottom of the panel.", [
        className,
        children,
      ]),
      part("SidebarGroup", "Section inside the content.", [className, children]),
      part("SidebarGroupLabel", "Section title. Pass render to make it a CollapsibleTrigger.", [
        className,
        render,
        children,
      ]),
      part("SidebarGroupAction", "Icon button at the end of a group label.", [
        className,
        children,
      ]),
      part("SidebarGroupContent", "Body of a group.", [className, children]),
      part("SidebarMenu", "List of actions.", [className, children]),
      part("SidebarMenuItem", "One row. Position anchor for the badge and action.", [
        className,
        children,
      ]),
      part("SidebarMenuButton", "Pill row. Tooltip shows when the sidebar is collapsed to icons.", [
        className,
        {
          name: "isActive",
          type: "boolean",
          default: "false",
          description: "Marks the current destination.",
        },
        {
          name: "tooltip",
          type: "string",
          description: "Label shown beside the icon when collapsed.",
        },
        {
          name: "size",
          type: '"default" | "sm" | "lg"',
          default: '"default"',
          description: "Row height.",
        },
        render,
        children,
      ]),
      part("SidebarMenuAction", "Hover action on the trailing edge of a row.", [
        className,
        children,
      ]),
      part("SidebarMenuBadge", "Outline badge pinned to the row.", [
        className,
        children,
      ]),
      part("SidebarMenuSkeleton", "Placeholder row.", [
        className,
        {
          name: "showIcon",
          type: "boolean",
          default: "false",
          description: "Reserve a square for the icon.",
        },
      ]),
      part("SidebarMenuSub", "Nested list. Hidden in icon mode.", [
        className,
        children,
      ]),
      part("SidebarMenuSubItem", "One nested row.", [className, children]),
      part("SidebarMenuSubButton", "Nested pill. Defaults to an anchor.", [
        className,
        {
          name: "isActive",
          type: "boolean",
          default: "false",
          description: "Marks the current nested destination.",
        },
        render,
        children,
      ]),
      part("SidebarSeparator", "Hairline between sections. Uses Separator.", [
        className,
      ]),
    ],
  },
  skeleton: {
    slug: "skeleton",
    source: "src/components/ui/Skeleton.tsx",
    parts: [
      part("Skeleton", "Loading placeholder. Size it to the content shape.", [
        className,
      ]),
    ],
  },
  slider: {
    slug: "slider",
    source: "src/components/ui/Slider.tsx",
    primitive: "@base-ui/react/slider",
    parts: [
      part("Slider", "Accepts Base UI Slider.Root props.", [
        className,
        { name: "value", type: "number | number[]", description: "Controlled value." },
        {
          name: "defaultValue",
          type: "number | number[]",
          description: "Uncontrolled initial value.",
        },
        {
          name: "onValueChange",
          type: "(value: number | number[]) => void",
          description: "Called as the thumb moves.",
        },
        { name: "min", type: "number", default: "0", description: "Range start." },
        { name: "max", type: "number", default: "100", description: "Range end." },
        { name: "step", type: "number", default: "1", description: "Increment step." },
      ]),
    ],
  },
  spinner: {
    slug: "spinner",
    source: "src/components/ui/Spinner.tsx",
    parts: [
      part(
        "Spinner",
        'Spinning lucide icon. role="status", labelled "Loading".',
        [
          className,
          {
            name: "aria-hidden",
            type: "boolean",
            description:
              "Set it when the surrounding control already announces the pending state.",
          },
        ]
      ),
    ],
  },
  switch: {
    slug: "switch",
    source: "src/components/ui/Switch.tsx",
    primitive: "@base-ui/react/switch",
    parts: [
      part("Switch", "Accepts Base UI Switch.Root props.", [
        className,
        { name: "checked", type: "boolean", description: "Controlled state." },
        {
          name: "defaultChecked",
          type: "boolean",
          description: "Uncontrolled initial state.",
        },
        {
          name: "onCheckedChange",
          type: "(checked: boolean, eventDetails) => void",
          description: "Called when the value changes.",
        },
        { name: "disabled", type: "boolean", description: "Disable the control." },
      ]),
    ],
  },
  tabs: {
    slug: "tabs",
    source: "src/components/ui/Tabs.tsx",
    primitive: "@base-ui/react/tabs",
    parts: [
      part("Tabs", "Root. Accepts Base UI Tabs.Root props.", [
        className,
        { name: "value", type: "string", description: "Controlled tab." },
        {
          name: "defaultValue",
          type: "string",
          description: "Uncontrolled initial tab.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Called when the tab changes.",
        },
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "Tab list axis.",
        },
      ]),
      part("TabsList", "Tab row. Pill by default, or an underline with variant=\"line\".", [
        className,
        {
          name: "variant",
          type: '"pill" | "line"',
          default: '"pill"',
          description: "Pill track, or a bottom rule with a sliding underline.",
        },
        {
          name: "color",
          type: '"gray" | "indigo" | "cyan" | "orange" | "crimson" | "jade"',
          description: "Hue of the line variant: the underline and the active label.",
        },
        {
          name: "highContrast",
          type: "boolean",
          default: "false",
          description: "Deepens the line hue.",
        },
        children,
      ]),
      part("TabsTab", "One tab.", [
        className,
        { name: "value", type: "string", description: "Tab identity." },
        children,
      ]),
      part("TabsIndicator", "Slides behind the active pill, or along the line.", [
        className,
      ]),
      part("TabsPanels", "Panel stack.", [className, children]),
      part("TabsPanel", "One panel.", [
        className,
        { name: "value", type: "string", description: "Matching tab value." },
        {
          name: "keepMounted",
          type: "boolean",
          default: "true",
          description: "Keep inactive panels in the DOM.",
        },
        children,
      ]),
    ],
  },
  textarea: {
    slug: "textarea",
    source: "src/components/ui/Textarea.tsx",
    parts: [
      part("Textarea", "Accepts native textarea props.", [
        className,
        { name: "rows", type: "number", description: "Visible rows." },
        { name: "disabled", type: "boolean", description: "Disable the field." },
      ]),
    ],
  },
  "theme-toggle": {
    slug: "theme-toggle",
    source: "src/components/ui/ThemeToggle.tsx",
    parts: [
      part("ThemeToggle", "Ghost icon button. Sun for light, moon for dark.", [
        className,
      ]),
    ],
  },
  toast: {
    slug: "toast",
    source: "src/components/ui/Toast.tsx",
    primitive: "@base-ui/react/toast",
    parts: [
      part("ToastProvider", "Wrap the tree. Required for useToastManager.", []),
      part("Toaster", "Viewport. Render once near the root.", []),
      part("useToastManager", "Hook. toast.add({ title, description, actionProps }).", [
        {
          name: "title",
          type: "string",
          description: "Passed to toast.add().",
        },
        {
          name: "description",
          type: "string",
          description: "Optional supporting copy.",
        },
        {
          name: "actionProps",
          type: "{ children: React.ReactNode, onClick?: () => void }",
          description: "Optional action button.",
        },
        {
          name: "type",
          type: '"success" | "error" | "warning" | "info" | "loading"',
          description: "Shows the matching icon in its hue. loading shows a Spinner.",
        },
        {
          name: "promise",
          type: "(promise, { loading, success, error }) => Promise",
          description: "toast.promise() opens a loading toast and turns it into success or error.",
        },
      ]),
    ],
  },
  toggle: {
    slug: "toggle",
    source: "src/components/ui/Toggle.tsx",
    primitive: "@base-ui/react/toggle",
    parts: [
      part("Toggle", "Accepts Base UI Toggle props.", [
        className,
        { name: "value", type: "string", description: "Value inside a group." },
        { name: "pressed", type: "boolean", description: "Controlled pressed state." },
        {
          name: "defaultPressed",
          type: "boolean",
          description: "Uncontrolled initial state.",
        },
        children,
      ]),
    ],
  },
  "toggle-group": {
    slug: "toggle-group",
    source: "src/components/ui/ToggleGroup.tsx",
    primitive: "@base-ui/react/toggle-group",
    parts: [
      part("ToggleGroup", "Shared state for Toggles. value is string[].", [
        className,
        { name: "value", type: "string[]", description: "Controlled values." },
        {
          name: "defaultValue",
          type: "string[]",
          description: "Uncontrolled initial values.",
        },
        {
          name: "onValueChange",
          type: "(value: string[]) => void",
          description: "Called when the selection changes.",
        },
        {
          name: "multiple",
          type: "boolean",
          description: "Allow several pressed toggles.",
        },
        children,
      ]),
    ],
  },
  toolbar: {
    slug: "toolbar",
    source: "src/components/ui/Toolbar.tsx",
    primitive: "@base-ui/react/toolbar",
    parts: [
      part("Toolbar", "Root. Accepts Base UI Toolbar.Root props.", [
        className,
        children,
      ]),
      part("ToolbarButton", "Action in the bar.", [className, children]),
      part("ToolbarSeparator", "Divider.", [className]),
      part("ToolbarGroup", "Grouped controls.", [className, children]),
    ],
  },
  tooltip: {
    slug: "tooltip",
    source: "src/components/ui/Tooltip.tsx",
    primitive: "@base-ui/react/tooltip",
    parts: [
      part("TooltipProvider", "Optional delay scope.", [
        {
          name: "delay",
          type: "number",
          description: "Open delay in milliseconds.",
        },
      ]),
      part("Tooltip", "Root. Accepts Base UI Tooltip.Root props.", [
        open,
        defaultOpen,
        onOpenChange,
      ]),
      part("TooltipTrigger", "Hover or focus target.", [render, children]),
      part("TooltipContent", "Hint popup.", [className, children]),
    ],
  },
  typography: {
    slug: "typography",
    source: "src/components/ui/Typography.tsx",
    parts: [
      part(
        "Typography",
        "Styles the HTML inside it. article for reading, compact for a tight panel.",
        [
          className,
          {
            name: "variant",
            type: '"article" | "compact"',
            default: "article",
            description: "Reading rhythm, or a tighter one.",
          },
          children,
        ]
      ),
    ],
  },
  "aspect-ratio": {
    slug: "aspect-ratio",
    source: "src/components/ui/AspectRatio.tsx",
    parts: [
      part("AspectRatio", "Box locked to a ratio. Images cover. Other children clip.", [
        className,
        {
          name: "ratio",
          type: "number",
          default: "16 / 9",
          description: "Width divided by height.",
        },
        children,
      ]),
    ],
  },
  empty: {
    slug: "empty",
    source: "src/components/ui/Empty.tsx",
    parts: [
      part("Empty", "Dashed panel for an empty list or table.", [
        className,
        children,
      ]),
      part("EmptyHeader", "Icon, title, and description stack.", [
        className,
        children,
      ]),
      part("EmptyMedia", "Optional glyph well.", [
        className,
        {
          name: "variant",
          type: '"icon" | "ghost"',
          default: '"icon"',
          description: "Well, or a bare icon on the paper.",
        },
        children,
      ]),
      part("EmptyTitle", "Short heading.", [className, children]),
      part("EmptyDescription", "What is missing, and what to do.", [
        className,
        children,
      ]),
      part("EmptyContent", "Actions under the copy.", [className, children]),
    ],
  },
  "input-group": {
    slug: "input-group",
    source: "src/components/ui/InputGroup.tsx",
    parts: [
      part("InputGroup", "One field with addons. The ring sits on the group.", [
        className,
        children,
      ]),
      part("InputGroupAddon", "Prefix or suffix slot.", [
        className,
        {
          name: "align",
          type: '"start" | "end"',
          default: '"start"',
          description: "Which side the addon sits on.",
        },
        children,
      ]),
      part("InputGroupInput", "The text field. Also accepts the shared Input.", [
        className,
        {
          name: "placeholder",
          type: "string",
          description: "Native placeholder.",
        },
      ]),
      part("InputGroupText", "Mono label inside an addon.", [
        className,
        children,
      ]),
    ],
  },
  item: {
    slug: "item",
    source: "src/components/ui/Item.tsx",
    primitive: "@base-ui/react/use-render",
    parts: [
      part("Item", "One row. Title, description, media, and actions.", [
        className,
        render,
        {
          name: "variant",
          type: '"default" | "outline" | "muted"',
          default: '"default"',
          description: "Bare, card edge, or muted fill.",
        },
        {
          name: "size",
          type: '"default" | "sm" | "xs"',
          default: '"default"',
          description: "Padding, and the size of the media well.",
        },
        children,
      ]),
      part("ItemGroup", "Stack of rows.", [className, children]),
      part("ItemSeparator", "Line between rows. The Separator component.", [
        className,
      ]),
      part("ItemMedia", "Icon well, image, or any leading media.", [
        className,
        {
          name: "variant",
          type: '"default" | "icon" | "image"',
          default: '"default"',
          description: "Bare slot, rounded well for an icon, or a clipped image.",
        },
        children,
      ]),
      part("ItemContent", "Title and description.", [className, children]),
      part("ItemTitle", "Row heading.", [className, children]),
      part("ItemDescription", "Supporting line. Clamped to two lines.", [
        className,
        children,
      ]),
      part("ItemActions", "Buttons or a trailing icon.", [className, children]),
      part("ItemHeader", "Full-width row above the content.", [
        className,
        children,
      ]),
      part("ItemFooter", "Full-width row below the content.", [
        className,
        children,
      ]),
    ],
  },
  pagination: {
    slug: "pagination",
    source: "src/components/ui/Pagination.tsx",
    parts: [
      part("Pagination", 'Native <nav> with aria-label="Pagination".', [
        className,
        children,
      ]),
      part("PaginationContent", "List of items.", [className, children]),
      part("PaginationItem", "One item.", [className, children]),
      part("PaginationLink", "Page Button. Ghost, or secondary when current.", [
        className,
        {
          name: "isActive",
          type: "boolean",
          description: 'Marks the current page and sets aria-current="page".',
        },
        children,
      ]),
      part("PaginationPrevious", "Previous page Button.", [
        className,
        children,
      ]),
      part("PaginationNext", "Next page Button.", [className, children]),
      part("PaginationEllipsis", "Collapsed range. aria-hidden.", [className]),
    ],
  },
  rating: {
    slug: "rating",
    source: "src/components/ui/Rating.tsx",
    parts: [
      part("Rating", "Star radiogroup. Arrow keys move the score.", [
        className,
        {
          name: "value",
          type: "number",
          description: "Controlled score.",
        },
        {
          name: "defaultValue",
          type: "number",
          default: "0",
          description: "Uncontrolled initial score.",
        },
        {
          name: "onValueChange",
          type: "(value: number) => void",
          description: "Called when the score changes.",
        },
        {
          name: "max",
          type: "number",
          default: "5",
          description: "Number of stars.",
        },
        {
          name: "readOnly",
          type: "boolean",
          default: "false",
          description: "Paint the score without making it a control.",
        },
        {
          name: "label",
          type: "string",
          default: '"Rating"',
          description: "Accessible name of the group.",
        },
        {
          name: "name",
          type: "string",
          description: "Optional hidden input name for forms.",
        },
      ]),
    ],
  },
  stepper: {
    slug: "stepper",
    source: "src/components/ui/Stepper.tsx",
    parts: [
      part("Stepper", "Ordered list of steps. The rail is drawn on each item.", [
        className,
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "Layout of the steps.",
        },
        children,
      ]),
      part("StepperItem", "One step.", [
        className,
        {
          name: "status",
          type: '"complete" | "current" | "upcoming"',
          default: '"upcoming"',
          description: 'Current sets aria-current="step".',
        },
        children,
      ]),
      part("StepperIndicator", "Index, replaced by a check when complete.", [
        className,
        children,
      ]),
      part("StepperContent", "Title and description beside or under the index.", [
        className,
        children,
      ]),
      part("StepperTitle", "Step name.", [className, children]),
      part("StepperDescription", "Optional supporting line.", [
        className,
        children,
      ]),
    ],
  },
  table: {
    slug: "table",
    source: "src/components/ui/Table.tsx",
    parts: [
      part("Table", "Native table in a bordered, rounded wrap.", [
        className,
        children,
      ]),
      part("TableHeader", "thead. Muted wash.", [className, children]),
      part("TableBody", "tbody.", [className, children]),
      part("TableFooter", "tfoot. A rule, not a second header.", [
        className,
        children,
      ]),
      part("TableRow", "tr. Hover tint. data-state=selected.", [
        className,
        children,
      ]),
      part("TableHead", "th. Muted, left-aligned.", [className, children]),
      part("TableCell", "td.", [className, children]),
      part("TableCaption", "caption above, inside the wrap.", [
        className,
        children,
      ]),
    ],
  },
  timeline: {
    slug: "timeline",
    source: "src/components/ui/Timeline.tsx",
    parts: [
      part("Timeline", "Vertical list of events.", [className, children]),
      part("TimelineItem", "One event.", [className, children]),
      part("TimelineMarker", "Dot on the rule.", [className]),
      part("TimelineSeparator", "Vertical rule. Hidden on the last item.", [
        className,
      ]),
      part("TimelineContent", "Title, time, and copy.", [className, children]),
      part("TimelineTitle", "Event name.", [className, children]),
      part("TimelineTime", "Native <time>.", [
        className,
        {
          name: "dateTime",
          type: "string",
          description: "Machine-readable timestamp.",
        },
        children,
      ]),
      part("TimelineDescription", "What happened.", [className, children]),
    ],
  },  "avatar-group": {
    slug: "avatar-group",
    source: "src/components/ui/AvatarGroup.tsx",
    parts: [
      part("AvatarGroup", "Overlapping row of Avatar, each ringed in the page background.", [className, children]),
      part("AvatarGroupCount", "Last chip for the avatars left out.", [
        className,
        { name: "count", type: "number", description: "How many avatars are hidden. Shown as +count." },
        { name: "label", type: "string", default: '"{count} more"', description: "Accessible name of the chip." },
      ]),
    ],
  },
  banner: {
    slug: "banner",
    source: "src/components/ui/Banner.tsx",
    parts: [
      part("Banner", "Announcement bar or floating pill. A region landmark.", [
        className,
        { name: "variant", type: '"default" | "new" | "info" | "success" | "warning" | "destructive"', default: '"default"', description: "Hue of the indicator dot. The surface stays neutral." },
        { name: "appearance", type: '"bar" | "floating"', default: '"bar"', description: "Full-width bar with a bottom rule, or a centered pill." },
        open,
        { name: "defaultOpen", type: "boolean", default: "true", description: "Uncontrolled initial open state." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when BannerClose dismisses it." },
        { name: "aria-label", type: "string", default: '"Announcement"', description: "Name of the region." },
        children,
      ]),
      part("BannerIndicator", "Dot in the variant hue. Children replace it with an icon.", [className, children]),
      part("BannerContent", "One line that truncates.", [className, children]),
      part("BannerTitle", "Medium-weight lead.", [className, children]),
      part("BannerDescription", "Muted copy after a dash. Hidden below sm.", [className, children]),
      part("BannerAction", "Text link; a small pill when floating.", [className, render, children]),
      part("BannerClose", "Dismiss button.", [
        className,
        { name: "aria-label", type: "string", default: '"Dismiss"', description: "Accessible name of the button." },
      ]),
    ],
  },
  container: {
    slug: "container",
    source: "src/components/ui/Container.tsx",
    parts: [
      part("Container", "Centered column with a max width and side gutters.", [
        className,
        { name: "size", type: '"sm" | "md" | "lg" | "xl" | "full"', default: '"lg"', description: "Max width: 2xl, 4xl, 6xl, 7xl, or none." },
        { name: "padding", type: '"none" | "default" | "wide"', default: '"default"', description: "Side gutters. wide matches the marketing header." },
        render,
        children,
      ]),
    ],
  },
  "data-table": {
    slug: "data-table",
    source: "src/components/ui/DataTable.tsx",
    parts: [
      part("DataTable", "Table with sorting, a filter field, and pages. Client-side.", [
        className,
        { name: "columns", type: "DataTableColumn<Row>[]", description: "id, header, accessor, cell, sortable, align, className." },
        { name: "data", type: "Row[]", description: "Rows to show." },
        { name: "getRowId", type: "(row: Row, index: number) => string", description: "Stable key per row. Defaults to the index." },
        { name: "filterable", type: "boolean", default: "false", description: "Adds a SearchInput that matches every accessor value." },
        { name: "pageSize", type: "number", description: "Rows per page. Unset shows every row." },
        { name: "defaultSort", type: '{ id: string; direction: "asc" | "desc" }', description: "Initial sort." },
        { name: "emptyMessage", type: "React.ReactNode", default: '"No results."', description: "Shown when no row matches." },
        { name: "toolbar", type: "React.ReactNode", description: "Extra controls next to the filter." },
        { name: "labels", type: "{ previous?, next?, page? }", description: "Text for the pager, for translation." },
      ]),
    ],
  },
  "file-upload": {
    slug: "file-upload",
    source: "src/components/ui/FileUpload.tsx",
    parts: [
      part("FileUpload", "Dropzone label around a hidden file input. Click, keyboard, or drop.", [
        className,
        { name: "accept", type: "string", description: "Same syntax as the input: .pdf, image/*, text/csv." },
        { name: "multiple", type: "boolean", default: "false", description: "Accept more than one file." },
        { name: "maxSize", type: "number", description: "Largest file, in bytes." },
        { name: "onFilesChange", type: "(files: File[]) => void", description: "Accepted files from a pick or a drop." },
        { name: "onReject", type: "(rejections: { file: File; reason: \"type\" | \"size\" }[]) => void", description: "Files refused by accept or maxSize." },
        { name: "disabled", type: "boolean", description: "Disable the dropzone." },
        children,
      ]),
      part("FileUploadList", "List of picked files.", [className, children]),
      part("FileUploadItem", "One file: icon, name, size, remove.", [
        className,
        { name: "file", type: "File", description: "The file to describe." },
        { name: "onRemove", type: "() => void", description: "Shows a remove button." },
      ]),
    ],
  },
  "password-input": {
    slug: "password-input",
    source: "src/components/ui/PasswordInput.tsx",
    parts: [
      part("PasswordInput", "Password field with a show / hide toggle. Accepts native input props.", [
        className,
        { name: "visible", type: "boolean", description: "Controlled visibility." },
        { name: "defaultVisible", type: "boolean", default: "false", description: "Uncontrolled initial visibility." },
        { name: "onVisibleChange", type: "(visible: boolean) => void", description: "Called when the toggle is pressed." },
        { name: "showLabel", type: "string", default: '"Show password"', description: "Toggle name while hidden." },
        { name: "hideLabel", type: "string", default: '"Hide password"', description: "Toggle name while shown." },
      ]),
    ],
  },
  resizable: {
    slug: "resizable",
    source: "src/components/ui/Resizable.tsx",
    parts: [
      part("ResizablePanelGroup", "Flex row or column of panels.", [
        className,
        { name: "direction", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Axis of the panels." },
        { name: "onLayout", type: "(sizes: Record<string, number>) => void", description: "Sizes in percent after a resize." },
        children,
      ]),
      part("ResizablePanel", "One panel.", [
        className,
        { name: "defaultSize", type: "number", description: "Initial size in percent. Unset panels share what is left." },
        { name: "minSize", type: "number", default: "10", description: "Smallest size in percent." },
        { name: "maxSize", type: "number", default: "100", description: "Largest size in percent." },
        children,
      ]),
      part("ResizableHandle", "Separator between two panels. Drag, or arrows with Shift for big steps.", [
        className,
        { name: "withHandle", type: "boolean", default: "false", description: "Draws a grip on the line." },
        { name: "aria-label", type: "string", default: '"Resize panels"', description: "Accessible name." },
      ]),
    ],
  },
  "search-input": {
    slug: "search-input",
    source: "src/components/ui/SearchInput.tsx",
    parts: [
      part("SearchInput", "Search field with a leading icon and a clear button. Escape clears.", [
        className,
        { name: "value", type: "string", description: "Controlled value." },
        { name: "defaultValue", type: "string", default: '""', description: "Uncontrolled initial value." },
        { name: "onValueChange", type: "(value: string) => void", description: "Called on every change, clear included." },
        { name: "onClear", type: "() => void", description: "Called when the clear button or Escape empties the field." },
        { name: "clearLabel", type: "string", default: '"Clear search"', description: "Name of the clear button." },
      ]),
    ],
  },
  stack: {
    slug: "stack",
    source: "src/components/ui/Stack.tsx",
    parts: [
      part("Stack", "Flex layout on the Lumen spacing steps.", [
        className,
        { name: "direction", type: '"column" | "row" | "column-reverse" | "row-reverse"', default: '"column"', description: "Flex direction." },
        { name: "gap", type: '"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"', default: '"md"', description: "gap-0, 1, 2, 4, 6, 8, or 12." },
        { name: "align", type: '"start" | "center" | "end" | "stretch" | "baseline"', description: "align-items." },
        { name: "justify", type: '"start" | "center" | "end" | "between"', description: "justify-content." },
        { name: "wrap", type: "boolean", description: "flex-wrap." },
        render,
        children,
      ]),
    ],
  },
  stat: {
    slug: "stat",
    source: "src/components/ui/Stat.tsx",
    parts: [
      part("Stat", "One figure with its label.", [className, children]),
      part("StatLabel", "What the figure measures.", [className, children]),
      part("StatValue", "The figure. Tabular numbers.", [className, children]),
      part("StatDelta", "Change since the last period.", [
        className,
        { name: "trend", type: '"up" | "down" | "neutral"', default: '"neutral"', description: "Arrow direction." },
        { name: "intent", type: '"positive" | "negative" | "neutral"', description: "Which hue reads as good. Defaults from trend: up is jade, down is crimson." },
        { name: "srLabel", type: "string", description: "Word read before the value. Defaults to Up, Down, or No change." },
        children,
      ]),
      part("StatDescription", "Period or context.", [className, children]),
    ],
  },
  "tag-input": {
    slug: "tag-input",
    source: "src/components/ui/TagInput.tsx",
    parts: [
      part("TagInput", "Field that turns text into removable tags. Enter or comma adds, Backspace removes the last.", [
        className,
        { name: "value", type: "string[]", description: "Controlled tags." },
        { name: "defaultValue", type: "string[]", default: "[]", description: "Uncontrolled initial tags." },
        { name: "onValueChange", type: "(value: string[]) => void", description: "Called when a tag is added or removed." },
        { name: "max", type: "number", description: "Most tags allowed." },
        { name: "allowDuplicates", type: "boolean", default: "false", description: "Keep a tag that is already there." },
        { name: "name", type: "string", description: "Posts one hidden input per tag in a form." },
        { name: "removeLabel", type: "(tag: string) => string", description: "Name of each remove button." },
      ]),
    ],
  },
  "tree-view": {
    slug: "tree-view",
    source: "src/components/ui/TreeView.tsx",
    parts: [
      part("TreeView", "ARIA tree from nested items. Arrows, Home, End, and typeahead.", [
        className,
        { name: "items", type: "TreeItem[]", description: "id, label, textValue, icon, disabled, children." },
        { name: "value", type: "string | null", description: "Controlled selected id." },
        { name: "defaultValue", type: "string | null", description: "Uncontrolled initial selection." },
        { name: "onValueChange", type: "(id: string, item: TreeItem) => void", description: "Called on select." },
        { name: "expanded", type: "string[]", description: "Controlled open ids." },
        { name: "defaultExpanded", type: "string[]", default: "[]", description: "Uncontrolled open ids." },
        { name: "onExpandedChange", type: "(expanded: string[]) => void", description: "Called when a branch opens or closes." },
      ]),
    ],
  },
  "image-gallery": {
    slug: "image-gallery",
    source: "src/components/ui/ImageGallery.tsx",
    primitive: "@base-ui/react/dialog",
    parts: [
      part("ImageGallery", "Thumbnail grid and lightbox.", [
        className,
        { name: "images", type: "{ src, alt, thumbnail?, caption?, width?, height? }[]", description: "The pictures. alt is required." },
        { name: "columns", type: "2 | 3 | 4", default: "3", description: "Per row from sm up; phones get 2." },
        { name: "labels", type: "{ open?, previous?, next?, close?, counter? }", description: "Button names and counter text, for translation." },
      ]),
    ],
  },
  marquee: {
    slug: "marquee",
    source: "src/components/ui/Marquee.tsx",
    parts: [
      part("Marquee", "Children on a seamless loop.", [
        className,
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Scroll axis." },
        { name: "duration", type: "number", default: "30", description: "Seconds for one loop." },
        { name: "gap", type: "string", default: '"2rem"', description: "Space between items, any CSS length." },
        { name: "reverse", type: "boolean", default: "false", description: "Scroll the other way." },
        { name: "pauseOnHover", type: "boolean", default: "true", description: "Stop while the pointer is over it." },
        { name: "fade", type: "boolean", default: "true", description: "Mask the edges." },
        { name: "showControl", type: "boolean", default: "true", description: "Pause / play button on hover and focus." },
        children,
      ]),
    ],
  },
  "notification-center": {
    slug: "notification-center",
    source: "src/components/ui/NotificationCenter.tsx",
    parts: [
      part("NotificationCenter", "Bell, unread badge, and the list in a Popover.", [
        className,
        { name: "notifications", type: "{ id, title, description?, date?, read?, icon? }[]", description: "The items, newest first." },
        { name: "onItemClick", type: "(item) => void", description: "Mark it read and navigate here." },
        { name: "onMarkAllRead", type: "() => void", description: "Shows “Mark all as read” while some are unread." },
        { name: "labels", type: "{ trigger?, title?, markAllRead? }", description: "Text, for translation. trigger gets the unread count." },
        { name: "empty", type: "ReactNode", description: "Shown when the list is empty." },
      ]),
    ],
  },
  "prompt-input": {
    slug: "prompt-input",
    source: "src/components/ui/PromptInput.tsx",
    parts: [
      part("PromptInput", "The composer form.", [
        className,
        { name: "value", type: "string", description: "Controlled text." },
        { name: "defaultValue", type: "string", default: '""', description: "Uncontrolled initial text." },
        { name: "onValueChange", type: "(value: string) => void", description: "Called as the text changes." },
        { name: "onSubmit", type: "(value: string) => void", description: "Called with the trimmed text. The field then clears." },
        { name: "onStop", type: "() => void", description: "Turns the submit button into a stop button while busy." },
        { name: "status", type: '"ready" | "submitted" | "streaming" | "error"', default: '"ready"', description: "Same values as the AI SDK useChat." },
        { name: "submitOn", type: '"enter" | "mod-enter"', default: '"enter"', description: "Enter sends, or ⌘/Ctrl+Enter sends." },
        children,
      ]),
      part("PromptInputTextarea", "Grows with the text up to maxRows.", [
        className,
        { name: "maxRows", type: "number", default: "8", description: "Height cap before it scrolls." },
        { name: "placeholder", type: "string", default: '"Ask anything…"', description: "Hint text." },
      ]),
      part("PromptInputToolbar", "Row under the field for attachments and the submit button.", [className, children]),
      part("PromptInputSubmit", "Send while ready, stop while busy.", [
        className,
        { name: "sendLabel", type: "string", default: '"Send"', description: "Accessible name." },
        { name: "stopLabel", type: "string", default: '"Stop"', description: "Accessible name while busy." },
      ]),
    ],
  },
  "relative-time": {
    slug: "relative-time",
    source: "src/components/ui/RelativeTime.tsx",
    parts: [
      part("RelativeTime", "A native time element that keeps “3 minutes ago” current.", [
        className,
        { name: "date", type: "Date | string | number", description: "The moment to describe." },
        { name: "locale", type: "string", description: "Any Intl locale. Defaults to the page's <html lang>." },
        { name: "titleFormat", type: "Intl.DateTimeFormatOptions", default: '{ dateStyle: "medium", timeStyle: "short" }', description: "Exact date shown on hover." },
      ]),
    ],
  },
  tour: {
    slug: "tour",
    source: "src/components/ui/Tour.tsx",
    parts: [
      part("Tour", "Steps that point at elements of the page.", [
        { name: "steps", type: "{ target?: string; title: ReactNode; description?: ReactNode }[]", description: "target is a CSS selector; without one the card is centered." },
        { name: "open", type: "boolean", description: "Whether the tour runs." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called on skip, Escape, and finish." },
        { name: "step", type: "number", description: "Controlled step index." },
        { name: "onStepChange", type: "(step: number) => void", description: "Called on Next and Back." },
        { name: "onFinish", type: "() => void", description: "Called by Done on the last step." },
        { name: "labels", type: "{ next?, back?, finish?, skip?, progress? }", description: "Button text, for translation." },
      ]),
    ],
  },
  "trace": {
    slug: "trace",
    source: "src/components/ui/Trace.tsx",
    primitive: "@base-ui/react/collapsible",
    parts: [
      part("Trace", "One agent step. A Base UI Collapsible.", [
        className,
        { name: "status", type: "\"pending\" | \"running\" | \"done\" | \"error\"", description: "Ring, Spinner with shimmer, jade check, crimson alert.", default: "\"done\"" },
        { name: "variant", type: "\"plain\" | \"card\"", description: "Inline in a message, or framed with the status in words.", default: "\"plain\"" },
        open,
        children,
      ]),
      part("TraceTrigger", "The row: icon, label, meta, status, chevron.", [
        className,
        { name: "icon", type: "ReactNode", description: "Leading icon." },
        { name: "label", type: "ReactNode", description: "The step. Children replace it." },
        { name: "meta", type: "ReactNode", description: "Right-aligned detail: duration, count, model." },
        { name: "showStatus", type: "boolean", description: "Status icon and word, on cards.", default: "true" },
        { name: "statusLabels", type: "Record<status, string>", description: "Words for each status, for translation." },
      ]),
      part("TraceContent", "The folding body.", [
        className,
        children,
      ]),
      part("TraceSection", "A labelled block in a card: Input, Output.", [
        className,
        { name: "label", type: "ReactNode", description: "Small caps label." },
        children,
      ]),
      part("TraceSteps", "A sequence on a rail.", [
        className,
        children,
      ]),
      part("TraceStep", "One step of the sequence.", [
        className,
        { name: "status", type: "TraceStatus", description: "Mark on the rail.", default: "\"done\"" },
        { name: "title", type: "ReactNode", description: "What happened." },
        { name: "description", type: "ReactNode", description: "A detail under it." },
        children,
      ]),
    ],
  },
  "code-block": {
    slug: "code-block",
    source: "src/components/ui/CodeBlock.tsx",
    parts: [
      part("CodeBlock", "Code with a header and a copy button.", [
        className,
        { name: "code", type: "string", description: "The text. What the copy button copies." },
        { name: "title", type: "ReactNode", description: "File name in the header." },
        { name: "language", type: "string", description: "Shown when there is no title." },
        { name: "lineNumbers", type: "boolean", description: "Number each line.", default: "false" },
        { name: "wrap", type: "boolean", description: "Wrap long lines.", default: "false" },
        { name: "maxHeight", type: "string", description: "Scroll past this height." },
        { name: "copyable", type: "boolean", description: "Show the copy button.", default: "true" },
        { name: "children", type: "ReactNode", description: "Highlighted nodes in place of the plain code." },
      ]),
    ],
  },
  "message-scroller": {
    slug: "message-scroller",
    source: "src/components/ui/MessageScroller.tsx",
    parts: [
      part("MessageScroller", "Pinned to the bottom while the reader is there.", [
        className,
        { name: "label", type: "string", description: "Name of the jump-to-latest button.", default: "\"Scroll to latest\"" },
        children,
      ]),
    ],
  },
  "attachment": {
    slug: "attachment",
    source: "src/components/ui/Attachment.tsx",
    parts: [
      part("AttachmentList", "Row of attachments that wraps.", [
        className,
        children,
      ]),
      part("Attachment", "One file.", [
        className,
        { name: "name", type: "string", description: "File name." },
        { name: "type", type: "string", description: "MIME type. Picks the icon." },
        { name: "size", type: "number", description: "Bytes." },
        { name: "previewUrl", type: "string", description: "Thumbnail for images." },
        { name: "onRemove", type: "() => void", description: "Shows a remove button." },
      ]),
    ],
  },
  "chat": {
    slug: "chat",
    source: "src/components/ui/Chat.tsx",
    parts: [
      part("Chat", "The thread column. Give it a height.", [
        className,
        children,
      ]),
      part("ChatMessages", "The messages, in a Message Scroller and a polite log region.", [
        className,
        { name: "contentClassName", type: "string", description: "Class of the inner list." },
        children,
      ]),
      part("ChatFooter", "Suggestions and the Prompt Input.", [
        className,
        children,
      ]),
      part("ChatEmpty", "Shown before the first message.", [
        className,
        children,
      ]),
    ],
  },
  "message": {
    slug: "message",
    source: "src/components/ui/Message.tsx",
    parts: [
      part("Message", "One turn.", [
        className,
        { name: "from", type: "\"user\" | \"assistant\"", description: "The person's bubble, or the agent's prose." },
        children,
      ]),
      part("MessageAvatar", "Holds an Avatar, 28px.", [
        className,
        children,
      ]),
      part("MessageBody", "Steps, content, actions, meta.", [
        className,
        children,
      ]),
      part("MessageContent", "The text.", [
        className,
        children,
      ]),
      part("MessageActions", "Icon buttons, shown on hover and focus.", [
        className,
        children,
      ]),
      part("MessageMeta", "Time or model.", [
        className,
        children,
      ]),
    ],
  },
  "reasoning": {
    slug: "reasoning",
    source: "src/components/ui/Reasoning.tsx",
    primitive: "@base-ui/react/collapsible",
    parts: [
      part("Reasoning", "Thinking on Trace. Folds itself once done.", [
        className,
        { name: "streaming", type: "boolean", description: "Open and shimmering; folds once when it turns off.", default: "false" },
        { name: "duration", type: "number", description: "Seconds spent, shown once done." },
        open,
        children,
      ]),
      part("ReasoningTrigger", "Thinking… or Thought for 4s.", [
        className,
        { name: "thinkingLabel", type: "string", description: "Text while streaming.", default: "\"Thinking…\"" },
        { name: "doneLabel", type: "(duration?: number) => string", description: "Text once done." },
      ]),
      part("ReasoningContent", "The thinking text.", [
        className,
        children,
      ]),
    ],
  },
  "tool": {
    slug: "tool",
    source: "src/components/ui/Tool.tsx",
    primitive: "@base-ui/react/collapsible",
    parts: [
      part("Tool", "A card Trace for one tool call.", [
        className,
        { name: "name", type: "string", description: "Tool name, in mono." },
        { name: "status", type: "\"pending\" | \"running\" | \"done\" | \"error\"", description: "Step status.", default: "\"done\"" },
        children,
      ]),
      part("ToolTrigger", "Name, meta and status.", [
        className,
        { name: "meta", type: "ReactNode", description: "Duration or detail." },
      ]),
      part("ToolContent", "The folding body.", [
        className,
        children,
      ]),
      part("ToolInput", "Arguments in a Code Block.", [
        { name: "value", type: "unknown", description: "A string or a value printed as JSON." },
        { name: "label", type: "string", description: "Section label.", default: "\"Input\"" },
      ]),
      part("ToolOutput", "Result, or error.", [
        { name: "value", type: "unknown", description: "A string or a value printed as JSON." },
        { name: "error", type: "ReactNode", description: "Shows a crimson block instead." },
        children,
      ]),
    ],
  },
  "chain-of-thought": {
    slug: "chain-of-thought",
    source: "src/components/ui/ChainOfThought.tsx",
    parts: [
      part("ChainOfThought", "A summary over the steps taken.", [
        className,
        { name: "summary", type: "ReactNode", description: "One line." },
        { name: "status", type: "TraceStatus", description: "Shimmers while running.", default: "\"done\"" },
        children,
      ]),
      part("ChainOfThoughtStep", "A TraceStep.", [
        { name: "status", type: "TraceStatus", description: "Mark.", default: "\"done\"" },
        { name: "title", type: "ReactNode", description: "What it did." },
        { name: "description", type: "ReactNode", description: "Detail." },
        children,
      ]),
    ],
  },
  "plan": {
    slug: "plan",
    source: "src/components/ui/Plan.tsx",
    parts: [
      part("Plan", "Planned steps with progress.", [
        className,
        { name: "title", type: "ReactNode", description: "Label.", default: "\"Plan\"" },
        { name: "steps", type: "{ id, title, description?, status }[]", description: "The steps. The card status follows them." },
      ]),
    ],
  },
  "task": {
    slug: "task",
    source: "src/components/ui/Task.tsx",
    parts: [
      part("Task", "A task and its actions.", [
        className,
        { name: "title", type: "ReactNode", description: "The task." },
        { name: "status", type: "TraceStatus", description: "Shimmers while running.", default: "\"running\"" },
        { name: "icon", type: "ReactNode", description: "Leading icon." },
        children,
      ]),
      part("TaskItem", "One action, a TraceStep.", [
        { name: "status", type: "TraceStatus", description: "Mark.", default: "\"done\"" },
        { name: "title", type: "ReactNode", description: "What it did." },
        { name: "description", type: "ReactNode", description: "Detail." },
        children,
      ]),
      part("TaskFile", "A file chip.", [
        className,
        children,
      ]),
    ],
  },
  "queue": {
    slug: "queue",
    source: "src/components/ui/Queue.tsx",
    parts: [
      part("Queue", "Todo list: left, then done.", [
        className,
        { name: "items", type: "{ id, title, status }[]", description: "Items in order." },
        { name: "title", type: "ReactNode", description: "Label.", default: "\"To do\"" },
        { name: "doneLabel", type: "(count: number) => string", description: "Label of the done fold." },
      ]),
    ],
  },
  "subagent": {
    slug: "subagent",
    source: "src/components/ui/Subagent.tsx",
    parts: [
      part("Subagent", "A card Trace for a delegated run.", [
        className,
        { name: "name", type: "ReactNode", description: "The agent." },
        { name: "status", type: "TraceStatus", description: "Run status.", default: "\"done\"" },
        { name: "meta", type: "ReactNode", description: "Duration, tool count, model." },
        children,
      ]),
      part("SubagentTask", "The brief it got.", [
        children,
      ]),
      part("SubagentSteps", "Its tool calls.", [
        { name: "label", type: "string", description: "Section label.", default: "\"Steps\"" },
        children,
      ]),
      part("SubagentResult", "What it returned.", [
        { name: "label", type: "string", description: "Section label.", default: "\"Result\"" },
        children,
      ]),
    ],
  },
  "terminal": {
    slug: "terminal",
    source: "src/components/ui/Terminal.tsx",
    parts: [
      part("Terminal", "A command and its streaming output.", [
        className,
        { name: "command", type: "string", description: "What ran." },
        { name: "output", type: "string", description: "Output so far." },
        { name: "exitCode", type: "number", description: "Running until set; 0 is done, else failed." },
        { name: "cwd", type: "string", description: "Shown before the prompt." },
        { name: "maxHeight", type: "string", description: "Scroll past this height.", default: "\"16rem\"" },
      ]),
    ],
  },
  "stack-trace": {
    slug: "stack-trace",
    source: "src/components/ui/StackTrace.tsx",
    parts: [
      part("StackTrace", "An error and its frames.", [
        className,
        { name: "name", type: "string", description: "Error name.", default: "\"Error\"" },
        { name: "message", type: "string", description: "Error message." },
        { name: "stack", type: "string", description: "Raw JS stack, parsed for you." },
        { name: "frames", type: "{ fn?, file, line?, column?, internal? }[]", description: "Frames you parsed yourself." },
      ]),
    ],
  },
  "test-results": {
    slug: "test-results",
    source: "src/components/ui/TestResults.tsx",
    parts: [
      part("TestResults", "A test run.", [
        className,
        { name: "suites", type: "{ name, tests: { name, status, duration?, error? }[] }[]", description: "Suites and their tests." },
        { name: "running", type: "boolean", description: "Shimmer while the run goes.", default: "false" },
        { name: "title", type: "ReactNode", description: "Label.", default: "\"Tests\"" },
      ]),
    ],
  },
  "file-tree": {
    slug: "file-tree",
    source: "src/components/ui/FileTree.tsx",
    parts: [
      part("FileTree", "Changed files on Tree View.", [
        className,
        { name: "files", type: "{ name, change?, children? }[]", description: "The tree. change is added, modified or deleted." },
        { name: "onSelect", type: "(path: string) => void", description: "Called with a file path." },
        { name: "aria-label", type: "string", description: "Name of the tree.", default: "\"Changed files\"" },
      ]),
    ],
  },
  "sources": {
    slug: "sources",
    source: "src/components/ui/Sources.tsx",
    primitive: "@base-ui/react/collapsible",
    parts: [
      part("Sources", "Links used for a reply.", [
        className,
        { name: "sources", type: "{ href, title }[]", description: "The links." },
        { name: "label", type: "(count: number) => string", description: "Trigger text." },
      ]),
    ],
  },
  "inline-citation": {
    slug: "inline-citation",
    source: "src/components/ui/InlineCitation.tsx",
    primitive: "@base-ui/react/preview-card",
    parts: [
      part("InlineCitation", "A source pill with a preview.", [
        className,
        { name: "href", type: "string", description: "Link." },
        { name: "title", type: "ReactNode", description: "Page title." },
        { name: "excerpt", type: "ReactNode", description: "Quoted text." },
        { name: "index", type: "number", description: "Shows a number instead of the site." },
      ]),
    ],
  },
  "suggestion": {
    slug: "suggestion",
    source: "src/components/ui/Suggestion.tsx",
    parts: [
      part("Suggestions", "Row that scrolls sideways.", [
        className,
        children,
      ]),
      part("Suggestion", "One prompt. Accepts Button props.", [
        className,
        { name: "suggestion", type: "string", description: "The prompt." },
        { name: "onSelect", type: "(suggestion: string) => void", description: "Called on click." },
        children,
      ]),
    ],
  },
  "confirmation": {
    slug: "confirmation",
    source: "src/components/ui/Confirmation.tsx",
    parts: [
      part("Confirmation", "Approve or deny a tool.", [
        className,
        { name: "title", type: "ReactNode", description: "What it will do." },
        { name: "description", type: "ReactNode", description: "Why it matters." },
        { name: "input", type: "unknown", description: "Arguments, printed as JSON." },
        { name: "state", type: "\"pending\" | \"approved\" | \"denied\"", description: "Answered states shrink to one line.", default: "\"pending\"" },
        { name: "onApprove", type: "() => void", description: "Approve." },
        { name: "onDeny", type: "() => void", description: "Deny." },
        { name: "labels", type: "{ approve?, deny?, approved?, denied? }", description: "Text, for translation." },
      ]),
    ],
  },
  "checkpoint": {
    slug: "checkpoint",
    source: "src/components/ui/Checkpoint.tsx",
    parts: [
      part("Checkpoint", "A rule with Restore.", [
        className,
        { name: "label", type: "ReactNode", description: "Name of the point." },
        { name: "onRestore", type: "() => void", description: "Shows Restore." },
        { name: "restoreLabel", type: "string", description: "Button text.", default: "\"Restore\"" },
      ]),
    ],
  },
  "context": {
    slug: "context",
    source: "src/components/ui/Context.tsx",
    primitive: "@base-ui/react/popover",
    parts: [
      part("Context", "Context window use.", [
        className,
        { name: "used", type: "number", description: "Tokens in the window." },
        { name: "max", type: "number", description: "Window size." },
        { name: "usage", type: "{ input?, output?, reasoning?, cached? }", description: "Breakdown." },
        { name: "cost", type: "string", description: "Formatted cost." },
        { name: "model", type: "string", description: "Model name." },
      ]),
    ],
  },
  "model-selector": {
    slug: "model-selector",
    source: "src/components/ui/ModelSelector.tsx",
    primitive: "@base-ui/react/select",
    parts: [
      part("ModelSelector", "Model and effort menus.", [
        className,
        { name: "models", type: "{ value, label, description? }[]", description: "Choices." },
        { name: "model", type: "string", description: "Current model." },
        { name: "onModelChange", type: "(model: string) => void", description: "Called on pick." },
        { name: "effort", type: "string", description: "Current effort." },
        { name: "onEffortChange", type: "(effort: string) => void", description: "Called on pick." },
        { name: "efforts", type: "{ value, label }[]", description: "Effort levels.", default: "low, medium, high" },
        { name: "showEffort", type: "boolean", description: "Hide for models that do not reason.", default: "true" },
      ]),
    ],
  },
  "copy-button": {
    slug: "copy-button",
    source: "src/components/ui/CopyButton.tsx",
    primitive: "@base-ui/react/button",
    parts: [
      part("CopyButton", "Copies a value and swaps to a check. Accepts Button props.", [
        className,
        { name: "value", type: "string | (() => string)", description: "Text to copy, or a function called on click." },
        { name: "timeout", type: "number", default: "2000", description: "How long the check shows, in ms." },
        { name: "onCopy", type: "(value: string) => void", description: "Called after a successful copy." },
        { name: "label", type: "string", default: '"Copy"', description: "Accessible name of the icon button." },
        { name: "copiedLabel", type: "string", default: '"Copied"', description: "Name and announcement after the copy." },
        { name: "variant", type: "Button variant", default: '"ghost"', description: "Same variants as Button." },
        { name: "size", type: "Button size", description: "icon-sm without children, default with them." },
        children,
      ]),
    ],
  },
  "filter-bar": {
    slug: "filter-bar",
    source: "src/components/ui/FilterBar.tsx",
    parts: [
      part("FilterBar", "Row of filters that wraps.", [className, children]),
      part("FilterSelect", "One facet: a pill that opens a checkbox menu.", [
        className,
        { name: "label", type: "string", description: "Name of the facet." },
        { name: "options", type: "{ value: string; label: ReactNode; count?: number }[]", description: "Choices, with an optional count." },
        { name: "value", type: "string[]", description: "Controlled picks." },
        { name: "defaultValue", type: "string[]", default: "[]", description: "Uncontrolled initial picks." },
        { name: "onValueChange", type: "(value: string[]) => void", description: "Called on each tick." },
        { name: "maxShown", type: "number", default: "2", description: "Picks listed in the pill before it shows a count." },
        { name: "clearLabel", type: "string", default: '"Clear filter"', description: "Last menu item while active." },
      ]),
      part("FilterBarClear", "Ghost button that resets every filter. Accepts Button props.", [className, children]),
    ],
  },
  "sortable-list": {
    slug: "sortable-list",
    source: "src/components/ui/SortableList.tsx",
    parts: [
      part("SortableList", "Reorder by dragging the grip or with Space and the arrows.", [
        className,
        { name: "items", type: "T[]", description: "Items in their current order." },
        { name: "getKey", type: "(item: T) => string", description: "Stable key per item." },
        { name: "getLabel", type: "(item: T) => string", description: "Plain-text name for the grip and announcements." },
        { name: "onReorder", type: "(items: T[]) => void", description: "Called with the new order." },
        { name: "renderItem", type: "(item: T) => ReactNode", description: "Content of a row, after the grip." },
        { name: "messages", type: "Partial<{ handle, picked, moved, dropped, cancelled }>", description: "Grip label and live announcements, for translation." },
        { name: "aria-label", type: "string", description: "Name of the list." },
      ]),
    ],
  },
  "split-button": {
    slug: "split-button",
    source: "src/components/ui/SplitButton.tsx",
    parts: [
      part("SplitButton", "Button Group that shares variant, size and disabled with both halves.", [
        className,
        { name: "variant", type: '"default" | "secondary" | "outline" | "ghost" | "destructive"', default: '"default"', description: "Tone of both halves." },
        { name: "size", type: '"xs" | "sm" | "default" | "lg"', default: '"default"', description: "The chevron takes the matching icon size." },
        { name: "disabled", type: "boolean", description: "Disables both halves." },
        children,
      ]),
      part("SplitButtonAction", "The main action. Accepts Button props.", [className, children]),
      part("SplitButtonMenu", "Chevron button and its Menu. Children are Menu items.", [
        className,
        { name: "label", type: "string", default: '"More options"', description: "Accessible name of the chevron." },
        { name: "align", type: '"start" | "center" | "end"', default: '"end"', description: "Menu alignment." },
        { name: "contentClassName", type: "string", description: "Class of the menu popup." },
        children,
      ]),
    ],
  },
  "time-picker": {
    slug: "time-picker",
    source: "src/components/ui/TimePicker.tsx",
    parts: [
      part("TimePicker", "Hour and minute columns in a Popover.", [
        className,
        { name: "value", type: "string", description: 'Controlled value, "HH:mm" in 24-hour time.' },
        { name: "defaultValue", type: "string", description: "Uncontrolled initial value." },
        { name: "onValueChange", type: "(value: string) => void", description: 'Called with "HH:mm".' },
        { name: "step", type: "number", default: "15", description: "Minutes between two options." },
        { name: "hourCycle", type: "12 | 24", default: "24", description: "Adds an AM / PM column at 12. The value stays 24-hour." },
        { name: "placeholder", type: "string", default: '"Pick a time"', description: "Trigger text while empty." },
        { name: "name", type: "string", description: "Posts the value through a hidden input." },
        { name: "labels", type: "{ hours?, minutes?, period? }", description: "Names of the columns, for translation." },
        { name: "disabled", type: "boolean", description: "Disable the trigger." },
      ]),
    ],
  },
  "visually-hidden": {
    slug: "visually-hidden",
    source: "src/components/ui/VisuallyHidden.tsx",
    parts: [
      part("VisuallyHidden", "Hidden on screen, read by screen readers.", [
        className,
        { name: "focusable", type: "boolean", default: "false", description: "Shows while focused, for skip links." },
        render,
        children,
      ]),
    ],
  },
}

export function componentSlug(name: string) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
}

export function componentInstallCommand(slug: string) {
  return `npx @aloneday/lumenui@latest add ${slug}`
}

export function apiPartId(name: string) {
  return `api-${componentSlug(name)}`
}

export function getComponentApi(slugOrName: string) {
  return componentApis[slugOrName] ?? componentApis[componentSlug(slugOrName)]
}

export function getApiHeadings(api: ComponentApi) {
  return [
    { id: "api", text: "API", level: 2 },
    ...api.parts.map((item) => ({
      id: apiPartId(item.name),
      text: item.name,
      level: 3,
    })),
  ]
}
