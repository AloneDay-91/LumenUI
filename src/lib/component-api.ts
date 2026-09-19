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
      part("Alert", "Status surface. role=\"alert\".", [
        className,
        {
          name: "variant",
          type: '"default" | "destructive" | "warning" | "success" | "info"',
          default: '"default"',
          description: "Visual tone. Stays monochrome.",
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
          description: "Visual tone.",
        },
        render,
        children,
      ]),
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
          description: "Outline paper, or muted fill without a border.",
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
      part("TabsList", "Tab row.", [className, children]),
      part("TabsTab", "One tab.", [
        className,
        { name: "value", type: "string", description: "Tab identity." },
        children,
      ]),
      part("TabsIndicator", "Sliding pill behind the active tab.", [className]),
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
}

export function componentSlug(name: string) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
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
