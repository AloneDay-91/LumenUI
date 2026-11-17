import {
  ArrowRightIcon,
  CopyIcon,
  MenuIcon,
  MessageSquareIcon,
  SearchIcon,
} from "lucide-react";

import { LumenWordmark, PAINTING } from "@/components/blocks/lumen/brand";
import { CodeBlock } from "@/components/ui/CodeBlock";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card } from "@/components/ui/Card";
import { Tabs, TabsIndicator, TabsList, TabsTab } from "@/components/ui/Tabs";
import { cn } from "@/lib/utils";


/** The Button page as the 1.2 hero showed it. */
const doc = {
  name: "Button",
  href: "/docs/components/button",
  group: "Actions",
  description:
    "Pill button, built on @base-ui/react/button. Variants via CVA. Composition via the render prop.",
  install: "npx @aloneday/lumenui@latest add button",
  headings: ["Installation", "Usage", "Variants", "Sizes", "Icon", "With icon", "Spinner", "Loading state"],
};

const sections = [
  {
    title: "Getting started",
    items: [
      { href: "/docs", name: "Introduction", isNew: false },
      { href: "/docs/installation", name: "Installation", isNew: true },
      { href: "/docs/frameworks", name: "Frameworks", isNew: true },
      { href: "/docs/components", name: "Components", isNew: true },
      { href: "/docs/choose", name: "Choose a component", isNew: true },
    ],
  },
  {
    title: "Actions",
    items: [
      { href: "/docs/components/button", name: "Button", isNew: true },
      { href: "/docs/components/button-group", name: "Button Group", isNew: false },
      { href: "/docs/components/copy-button", name: "Copy Button", isNew: true },
      { href: "/docs/components/split-button", name: "Split Button", isNew: true },
      { href: "/docs/components/toggle", name: "Toggle", isNew: false },
    ],
  },
];

/**
 * Decorative docs window: the real sidebar, page intro and table of contents
 * of a component page, drawn with the same components and classes as /docs.
 * Headings are paragraphs here, so the home page keeps a single h1.
 */
function DocsWindow() {

  return (
    <Card className="gap-0 bg-background py-0">
      {/* Same markup and classes as DocsHeader, with inert buttons. */}
      <div className="flex h-14 items-center gap-3 border-b border-border px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-8">
          <LumenWordmark />
          <span className="hidden text-xs text-muted-foreground lg:inline">
            Documentation
          </span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <span className="mr-1 hidden font-mono text-[11px] text-muted-foreground sm:inline">
            v1.2.0
          </span>
          {[
            { label: "Ask Lumen", Icon: MessageSquareIcon },
            { label: "Search", Icon: SearchIcon },
            { label: "Menu", Icon: MenuIcon },
          ].map(({ label, Icon }) => (
            <Button
              key={label}
              variant="ghost"
              size="icon-sm"
              tabIndex={-1}
              className="text-muted-foreground"
            >
              <Icon className="size-4" />
            </Button>
          ))}
        </div>
      </div>

      <div className="flex">
        <nav className="hidden w-52 shrink-0 flex-col gap-6 border-r border-border px-3 py-5 md:flex">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
                {section.title}
              </p>
              <ul className="flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <li
                    key={item.href}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-lg px-2 py-1 text-[13px] text-muted-foreground",
                      item.href === doc.href && "bg-muted font-medium text-foreground"
                    )}
                  >
                    <span className="truncate">{item.name}</span>
                    {item.isNew ? (
                      <span className="size-1.5 shrink-0 rounded-full bg-new" />
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="min-w-0 flex-1">
          <div className="flex h-11 items-center border-b border-border px-4 sm:px-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <span>{doc.group}</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{doc.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Same measures as .docs-article. */}
          <div className="space-y-8 px-4 py-6 sm:px-6">
            <div>
              <div className="flex items-start justify-between gap-4">
                <p className="text-xl leading-tight font-medium tracking-tight md:text-2xl">
                  {doc.name}
                </p>
                <Button variant="outline" size="sm" tabIndex={-1}>
                  <CopyIcon data-icon="inline-start" />
                  Copy
                </Button>
              </div>
              <p className="mt-3 max-w-[65ch] text-sm leading-6 text-muted-foreground">
                {doc.description}
              </p>
            </div>

            <Card className="flex w-full flex-col gap-4 px-6 py-6">
              <p className="self-end text-xs text-muted-foreground">
                Light and dark
              </p>
              <div className="flex min-h-24 flex-wrap items-center justify-center gap-3">
                <Button tabIndex={-1}>Continue</Button>
                <Button variant="outline" tabIndex={-1}>
                  Browse
                  <ArrowRightIcon data-icon="inline-end" />
                </Button>
              </div>
            </Card>

            <Tabs defaultValue="usage" className="gap-6">
              <TabsList variant="line">
                <TabsIndicator />
                <TabsTab value="usage" tabIndex={-1}>
                  Usage
                </TabsTab>
                <TabsTab value="api" tabIndex={-1}>
                  API
                </TabsTab>
              </TabsList>
            </Tabs>

            <div className="space-y-4">
              <p className="text-sm font-medium tracking-tight">Installation</p>
              <CodeBlock language="bash" code={doc.install} />
            </div>
          </div>
        </div>

        <div className="hidden w-48 shrink-0 px-4 py-5 lg:block">
          <p className="mb-3 text-xs font-medium text-muted-foreground">
            On this page
          </p>
          <ul className="flex flex-col gap-1.5 border-l border-border">
            {doc.headings.map((heading, index) => (
              <li
                key={heading}
                className={cn(
                  "-ml-px border-l px-3 text-xs",
                  index === 0
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground"
                )}
              >
                {heading}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

/** The 1.2 landing hero: the sentence, two actions, then the docs window on the painting. */
export function DocsHero() {
  return (
    <section className="w-full px-6 pt-12 md:px-12 md:pt-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start text-left">
        <h1 className="max-w-4xl font-heading text-[1.75rem] leading-[1.15] font-normal tracking-[-0.02em] text-balance md:text-[2.125rem] lg:text-[2.5rem]">
          A React design system that copies into your repo.
        </h1>
        <p className="mt-5 max-w-4xl text-base text-pretty text-muted-foreground md:text-lg">
          Lumen UI is 115 components for forms, data, overlays, and AI apps. The CLI writes the source
          into your project, on Base UI and Tailwind, so you edit the file instead of waiting on a package.
        </p>
        <div className="mt-7 flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center">
          <span className={cn(buttonVariants({ size: "lg" }), "font-mono")}>
            <span aria-hidden className="text-primary-foreground/60">$</span>
            npx @aloneday/lumenui@latest init
          </span>
          <a href="/docs/components" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full sm:w-auto")}>
            Browse components
            <ArrowRightIcon data-icon="inline-end" />
          </a>
        </div>
      </div>
      <div className="mx-auto mt-12 max-h-[34rem] w-full max-w-5xl overflow-hidden [mask-image:linear-gradient(180deg,#000_40%,transparent_92%)] md:mt-16 md:max-h-[40rem]">
        <div className="relative overflow-hidden rounded-t-2xl border border-b-0 border-border px-3 pt-4 sm:px-6 sm:pt-8 lg:px-10 lg:pt-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-70 dark:opacity-40"
            style={{ backgroundImage: `url(${PAINTING})` }}
          />
          <div aria-hidden inert className="relative">
            <DocsWindow />
          </div>
        </div>
      </div>
    </section>
  );
}
