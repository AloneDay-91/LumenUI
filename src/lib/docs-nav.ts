export type DocsNavItem = {
  name: string;
  href: string;
  keywords?: string;
};

export type DocsNavSection = {
  title: string;
  href?: string;
  items: DocsNavItem[];
};

const component = (name: string, slug: string): DocsNavItem => ({
  name,
  href: `/docs/components/${slug}`,
});

export const componentGroups: DocsNavSection[] = [
  {
    title: "Actions",
    href: "/docs/components#actions",
    items: [
      component("Button", "button"),
      component("Button Group", "button-group"),
      component("Toggle", "toggle"),
      component("Toggle Group", "toggle-group"),
      component("Toolbar", "toolbar"),
    ],
  },
  {
    title: "Forms",
    href: "/docs/components#forms",
    items: [
      component("Autocomplete", "autocomplete"),
      component("Calendar", "calendar"),
      component("Checkbox", "checkbox"),
      component("Checkbox Group", "checkbox-group"),
      component("Color Picker", "color-picker"),
      component("Combobox", "combobox"),
      component("Date Picker", "date-picker"),
      component("Field", "field"),
      component("Fieldset", "fieldset"),
      component("Form", "form"),
      component("Input", "input"),
      component("Input Group", "input-group"),
      component("Label", "label"),
      component("Number Field", "number-field"),
      component("OTP Field", "otp-field"),
      component("Radio Group", "radio-group"),
      component("Select", "select"),
      component("Slider", "slider"),
      component("Switch", "switch"),
      component("Textarea", "textarea"),
    ],
  },
  {
    title: "Overlays",
    href: "/docs/components#overlays",
    items: [
      component("Alert Dialog", "alert-dialog"),
      component("Command", "command"),
      component("Context Menu", "context-menu"),
      component("Dialog", "dialog"),
      component("Drawer", "drawer"),
      component("Menu", "menu"),
      component("Menubar", "menubar"),
      component("Popover", "popover"),
      component("Preview Card", "preview-card"),
      component("Toast", "toast"),
      component("Tooltip", "tooltip"),
    ],
  },
  {
    title: "Navigation",
    href: "/docs/components#navigation",
    items: [
      component("Accordion", "accordion"),
      component("Breadcrumb", "breadcrumb"),
      component("Collapsible", "collapsible"),
      component("Navigation Menu", "navigation-menu"),
      component("Pagination", "pagination"),
      component("Sidebar", "sidebar"),
      component("Stepper", "stepper"),
      component("Tabs", "tabs"),
    ],
  },
  {
    title: "Status",
    href: "/docs/components#status",
    items: [
      component("Alert", "alert"),
      component("Badge", "badge"),
      component("Callout", "callout"),
      component("Empty", "empty"),
      component("Meter", "meter"),
      component("Progress", "progress"),
      component("Rating", "rating"),
      component("Skeleton", "skeleton"),
      component("Spinner", "spinner"),
    ],
  },
  {
    title: "Data",
    href: "/docs/components#data",
    items: [
      component("Aspect Ratio", "aspect-ratio"),
      component("Avatar", "avatar"),
      component("Card", "card"),
      component("Carousel", "carousel"),
      component("Chart", "chart"),
      component("Data List", "data-list"),
      component("Item", "item"),
      component("Kbd", "kbd"),
      component("Scroll Area", "scroll-area"),
      component("Separator", "separator"),
      component("Table", "table"),
      component("Theme Toggle", "theme-toggle"),
      component("Timeline", "timeline"),
      component("Typography", "typography"),
    ],
  },
];

export const componentItems = componentGroups.flatMap((group) => group.items);

export const docsSections: DocsNavSection[] = [
  {
    title: "Getting started",
    items: [
      // Reading order: what it is, install, your framework, then pick components.
      { name: "Introduction", href: "/docs" },
      { name: "Installation", href: "/docs/installation" },
      { name: "Frameworks", href: "/docs/frameworks" },
      { name: "Components", href: "/docs/components" },
      {
        name: "Choose a component",
        href: "/docs/choose",
        keywords:
          "which picker select combobox autocomplete command menu context menubar dialog drawer tooltip toast alert callout",
      },
      {
        name: "From shadcn",
        href: "/docs/shadcn",
        keywords:
          "shadcn ui migration dropdown menu sheet hover card sonner input otp rename map",
      },
      { name: "Blocks", href: "/blocks" },
      { name: "LLMs", href: "/docs/llms" },
      { name: "Changelog", href: "/docs/changelog" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { name: "Styles", href: "/docs/styles" },
      {
        name: "Accessibility",
        href: "/docs/accessibility",
        keywords: "a11y keyboard focus label aria screen reader base ui",
      },
      { name: "Customize", href: "/customize" },
    ],
  },
  {
    title: "Recipes",
    items: [
      {
        name: "Form",
        href: "/docs/recipes/form",
        keywords: "recipe form field error submit validation",
      },
      {
        name: "Settings",
        href: "/docs/recipes/settings",
        keywords: "recipe settings card data list switch badge",
      },
    ],
  },
  ...componentGroups,
];

export const docsNav = docsSections.flatMap((section) => section.items);

export function isNavActive(pathname: string, href: string) {
  return pathname === href;
}

export function getDocsLocation(pathname: string) {
  for (const section of docsSections) {
    if (section.href === pathname) {
      return {
        section,
        item: { name: section.title, href: section.href },
      };
    }

    const item = section.items.find((entry) => entry.href === pathname);
    if (item) {
      return { section, item };
    }
  }

  return undefined;
}

export function getAdjacentDocs(pathname: string) {
  const index = docsNav.findIndex((item) => item.href === pathname);
  if (index === -1) {
    return { prev: undefined, next: undefined };
  }

  return {
    prev: index > 0 ? docsNav[index - 1] : undefined,
    next: index < docsNav.length - 1 ? docsNav[index + 1] : undefined,
  };
}

export { SITE_VERSION as docsVersion, formatDocsVersion } from "@/lib/site";
