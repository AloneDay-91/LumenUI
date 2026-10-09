"use client"

import { ArrowRightIcon, Keyboard, Moon, Plus, SquareStack } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

import { Footer } from "@/components/docs/Footer"
import { SiteLogo } from "@/components/marketing/SiteLogo"
import { StackMark } from "@/components/marketing/StackMarks"
import { ThemeToggle } from "@/components/docs/ThemeToggle"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { buttonVariants } from "@/components/ui/button-variants"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/Item"
import { Label } from "@/components/ui/Label"
import { Separator } from "@/components/ui/Separator"
import { Toggle } from "@/components/ui/Toggle"
import { ToggleGroup } from "@/components/ui/ToggleGroup"
import type { BlockCategorySlug } from "@/lib/block-categories"
import { docsSections } from "@/lib/docs-nav"
import { GITHUB_URL, HERO_BACKGROUND, STACK } from "@/lib/site"
import { cn } from "@/lib/utils"

const CLI = "npx @aloneday/lumenui@latest add"

const componentItems =
  docsSections.find((section) => section.title === "Components")?.items ?? []

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

const copyPoints = [
  {
    title: "Local files come with it",
    body: "Button brings its variants. Dialog brings the shared popup styles.",
  },
  {
    title: "Packages install themselves",
    body: "Base UI, class-variance-authority, and the rest land in package.json.",
  },
  {
    title: "Remove it the same way",
    body: "rm deletes the component. Shared files stay while something still imports them.",
  },
]

const tree = [
  { name: "lumen.json", indent: false, tag: "new" },
  { name: "src/lib/", indent: false, muted: true },
  { name: "utils.ts", indent: true, tag: "cn()" },
  { name: "src/components/ui/", indent: false, muted: true },
  { name: "Button.tsx", indent: true, tag: "new" },
  { name: "button-variants.ts", indent: true, tag: "new" },
]

const highlights = [
  { title: "Copy-paste", body: "You copy the file. It lives in your repo, with no package to version." },
  { title: "Base UI", body: "Focus, keyboard, and portals come from the primitives." },
  { title: "Keyboard first", body: "Visible focus and native composition on every control." },
  { title: "Light and dark", body: "One set of tokens, two themes, no interactive blue." },
]

function HeroCopy({ align = "center" }: { align?: "center" | "start" }) {
  const centered = align === "center"

  return (
    <>
      <h3
        className={cn(
          "max-w-2xl text-4xl leading-[1.1] font-medium tracking-tight md:text-5xl",
          centered && "text-balance",
        )}
      >
        The code lives in your repo.
      </h3>
      <p
        className={cn(
          "mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground",
          centered && "text-pretty",
        )}
      >
        {componentItems.length} React components built on Base UI and Tailwind CSS 4. The CLI copies the
        source into your project, so every file is yours to edit.
      </p>
      <div
        className={cn(
          "mt-7 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row",
          centered ? "items-center" : "items-stretch sm:items-center",
        )}
      >
        <span className={cn(buttonVariants(), "font-mono")}>
          <span className="text-primary-foreground/60">$</span>
          npx @aloneday/lumenui@latest init
        </span>
        <Link
          href="/docs/components"
          className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}
        >
          Browse components
          <ArrowRightIcon data-icon="inline-end" />
        </Link>
      </div>
    </>
  )
}

function HeroStack() {
  return (
    <ul
      aria-label="Built on"
      className="mt-6 flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-xs text-muted-foreground"
    >
      {STACK.map((item) => (
        <li key={item.label} className="inline-flex items-center gap-1.5">
          <StackMark id={item.id} />
          {item.label}
        </li>
      ))}
    </ul>
  )
}

const HERO_IMAGE = `url(${HERO_BACKGROUND})`

export const lumenBlocks: LumenBlock[] = [
  {
    id: "site-header",
    kit: "headers",
    title: "Site header",
    description: "The bar on the marketing site: wordmark, section links, and Documentation.",
    command: `${CLI} button`,
    full: true,
    code: `import Link from "next/link"

import { SiteLogo } from "@/components/marketing/SiteLogo"
import { ThemeToggle } from "@/components/docs/ThemeToggle"
import { buttonVariants } from "@/components/ui/button-variants"

const links = [
  { href: "/docs", label: "System" },
  { href: "/docs/components", label: "Components" },
  { href: "/blocks", label: "Blocks" },
]

export function SiteHeader() {
  return (
    <header className="flex w-full items-center justify-between gap-6 bg-background px-6 py-6">
      <div className="flex min-w-0 items-center gap-10">
        <SiteLogo />
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
          <a href="https://github.com/AloneDay-91/LumenUI" className="hover:text-foreground">
            GitHub
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link href="/docs" className={buttonVariants()}>Documentation</Link>
      </div>
    </header>
  )
}`,
    preview: (
      <header className="flex w-full items-center justify-between gap-6 bg-background px-6 py-6">
        <div className="flex min-w-0 items-center gap-10">
          <SiteLogo />
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link href="/docs" className="hover:text-foreground">
              System
            </Link>
            <Link href="/docs/components" className="hover:text-foreground">
              Components
            </Link>
            <Link href="/blocks" className="hover:text-foreground">
              Blocks
            </Link>
            <a href={GITHUB_URL} className="hover:text-foreground">
              GitHub
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/docs" className={buttonVariants()}>
            Documentation
          </Link>
        </div>
      </header>
    ),
  },
  {
    id: "landing-hero",
    kit: "heroes",
    title: "Landing hero",
    description: "The first screen: the sentence, the init command, and the stack.",
    command: `${CLI} button`,
    full: true,
    code: `import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

export function LandingHero() {
  return (
    <section className="flex w-full flex-col items-center px-6 py-16 text-center">
      <h1 className="max-w-2xl text-4xl leading-[1.1] font-medium tracking-tight md:text-5xl">
        The code lives in your repo.
      </h1>
      <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
        React components built on Base UI and Tailwind CSS 4. The CLI copies the source into your project.
      </p>
      <div className="mt-7 flex w-full flex-col items-center gap-2.5 sm:w-auto sm:flex-row">
        <button type="button" className={cn(buttonVariants(), "font-mono")}>
          <span className="text-primary-foreground/60">$</span>
          npx @aloneday/lumenui@latest init
        </button>
        <Link href="/docs/components" className={cn(buttonVariants({ variant: "outline" }))}>
          Browse components
          <ArrowRightIcon data-icon="inline-end" />
        </Link>
      </div>
    </section>
  )
}`,
    preview: (
      <section className="flex w-full flex-col items-center px-6 py-16 text-center">
        <HeroCopy />
        <div className="flex justify-center">
          <HeroStack />
        </div>
      </section>
    ),
  },
  {
    id: "painting",
    kit: "heroes",
    title: "Painting",
    description: "The same hero, with the landing painting behind the type.",
    command: `${CLI} button`,
    full: true,
    code: `export function PaintingHero() {
  return (
    <section className="relative flex min-h-112 w-full flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center dark:opacity-40"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1775313088881-649b8d9dc7d8?q=80&w=1600&auto=format&fit=crop)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-background mask-[radial-gradient(ellipse_at_center,black_0%,black_28%,transparent_62%)]"
      />
      <div className="relative flex flex-col items-center">
        <h1 className="max-w-2xl text-4xl leading-[1.1] font-medium tracking-tight md:text-5xl">
          The code lives in your repo.
        </h1>
      </div>
    </section>
  )
}`,
    preview: (
      <section className="relative flex min-h-112 w-full flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center motion-safe:animate-[lumen-paint_900ms_ease-out_both] dark:opacity-40"
          style={{ backgroundImage: HERO_IMAGE }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-background mask-[radial-gradient(ellipse_at_center,black_0%,black_28%,transparent_62%)]"
        />
        <div className="relative flex flex-col items-center">
          <HeroCopy />
          <HeroStack />
        </div>
      </section>
    ),
  },
  {
    id: "split",
    kit: "heroes",
    title: "Split",
    description: "The sentence on the left, the painting as a panel on the right.",
    command: `${CLI} button`,
    full: true,
    code: `export function SplitHero() {
  return (
    <section className="grid w-full items-center gap-10 px-6 py-12 lg:grid-cols-2">
      <div>
        <h1 className="max-w-xl text-4xl leading-[1.1] font-medium tracking-tight md:text-5xl">
          The code lives in your repo.
        </h1>
      </div>
      <div
        aria-hidden
        className="min-h-80 rounded-[min(var(--radius-4xl),24px)] bg-cover bg-center dark:opacity-40"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1775313088881-649b8d9dc7d8?q=80&w=1600&auto=format&fit=crop)" }}
      />
    </section>
  )
}`,
    preview: (
      <section className="grid w-full items-center gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)]">
        <div className="flex flex-col items-start text-left">
          <HeroCopy align="start" />
          <HeroStack />
        </div>
        <div
          aria-hidden
          className="min-h-80 rounded-[min(var(--radius-4xl),24px)] bg-cover bg-center dark:opacity-40"
          style={{ backgroundImage: HERO_IMAGE }}
        />
      </section>
    ),
  },
  {
    id: "band",
    kit: "heroes",
    title: "Band",
    description: "The type stays on the page color. The painting appears underneath.",
    command: `${CLI} button`,
    full: true,
    code: `export function BandHero() {
  return (
    <section className="flex w-full flex-col items-center px-6 pt-16 text-center">
      <h1 className="max-w-2xl text-4xl leading-[1.1] font-medium tracking-tight md:text-5xl">
        The code lives in your repo.
      </h1>
      <div
        aria-hidden
        className="mt-12 h-56 w-full bg-cover bg-center mask-[linear-gradient(to_bottom,transparent,black_18%,black_78%,transparent)] dark:opacity-40"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1775313088881-649b8d9dc7d8?q=80&w=1600&auto=format&fit=crop)" }}
      />
    </section>
  )
}`,
    preview: (
      <section className="flex w-full flex-col items-center px-6 pt-16 text-center">
        <HeroCopy />
        <div className="flex justify-center">
          <HeroStack />
        </div>
        <div
          aria-hidden
          className="mt-12 h-64 w-full bg-cover bg-center mask-[linear-gradient(to_bottom,transparent,black_18%,black_78%,transparent)] motion-safe:animate-[lumen-paint_900ms_ease-out_both] dark:opacity-40"
          style={{ backgroundImage: HERO_IMAGE }}
        />
      </section>
    ),
  },
  {
    id: "copy-paste",
    kit: "features",
    title: "Copy-paste",
    description: "The landing explanation of what the CLI writes into the repo.",
    command: `${CLI} badge separator`,
    full: true,
    code: `import { Badge } from "@/components/ui/Badge"
import { Separator } from "@/components/ui/Separator"

export function CopyPaste() {
  return (
    <section className="grid w-full items-center gap-10 px-6 py-12 lg:grid-cols-2">
      <div>
        <Badge variant="outline">Copy-paste</Badge>
        <h2 className="mt-4 max-w-md text-2xl font-medium tracking-tight md:text-3xl">
          Add a component. Own the file.
        </h2>
      </div>
    </section>
  )
}`,
    preview: (
      <section className="grid w-full items-start gap-10 px-6 py-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Badge variant="outline">Copy-paste</Badge>
          <h3 className="mt-4 max-w-md text-2xl leading-tight font-medium tracking-tight md:text-3xl">
            Add a component. Own the file.
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            The CLI writes the source into your repo. It does not install a component package, so there is
            nothing to version and nothing to fork.
          </p>
          <ul className="mt-7 max-w-md divide-y divide-border border-y border-border">
            {copyPoints.map((point) => (
              <li key={point.title} className="flex flex-col gap-0.5 py-3.5">
                <span className="text-sm font-medium">{point.title}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">{point.body}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 rounded-[min(var(--radius-4xl),24px)] bg-muted p-4 md:p-8">
          <div className="flex flex-col gap-4 rounded-2xl bg-background p-5 font-mono text-xs leading-[1.7] ring-1 ring-border">
            <div className="flex flex-col gap-1">
              <p>
                <span className="text-muted-foreground">$</span> npx @aloneday/lumenui@latest init
              </p>
              <p>
                <span className="text-muted-foreground">$</span> npx @aloneday/lumenui@latest add button
                dialog
              </p>
            </div>
            <Separator />
            <ul className="flex flex-col">
              {tree.map((file) => (
                <li
                  key={file.name}
                  className={cn(
                    "flex min-h-6 items-center justify-between gap-3",
                    file.indent && "ps-4",
                    file.muted && "text-muted-foreground",
                  )}
                >
                  <span>{file.name}</span>
                  {file.tag ? (
                    <Badge variant="secondary" className="h-4.5 px-1.5 text-[10px]">
                      {file.tag}
                    </Badge>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    ),
  },
  {
    id: "form-states",
    kit: "features",
    title: "Form states",
    description: "The landing form: an invalid email, and a list of components to add.",
    command: `${CLI} button input label item`,
    full: true,
    code: `import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

export function FormStates() {
  return (
    <form className="flex w-full max-w-xs flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Work email</Label>
        <Input id="email" type="email" defaultValue="elouan@lumenui.fr" aria-invalid />
        <p className="text-xs text-destructive">Enter a full address, like name@studio.fr.</p>
      </div>
      <div className="flex gap-2">
        <Button type="button">Save changes</Button>
        <Button type="button" variant="secondary" disabled>Cancel</Button>
      </div>
    </form>
  )
}`,
    preview: (
      <div className="grid w-full gap-px bg-border md:grid-cols-2">
        <div className="flex flex-col items-center bg-background px-7 py-12">
          <form className="flex w-full max-w-70 flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="block-email">Work email</Label>
              <Input
                id="block-email"
                type="email"
                defaultValue="elouan@lumenui.fr"
                aria-invalid
              />
              <p className="text-xs text-destructive">
                Enter a full address, like name@studio.fr.
              </p>
            </div>
            <div className="flex gap-2">
              <Button type="button">Save changes</Button>
              <Button type="button" variant="secondary" disabled>
                Cancel
              </Button>
            </div>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm font-medium">Forms with every state built in</p>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Field, Input, and Select share one focus ring, one invalid style, and one disabled style.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center bg-background px-7 py-12">
          <div className="w-full max-w-80 overflow-hidden rounded-[20px] bg-muted ring-1 ring-border">
            <div className="flex h-9 items-center gap-1.5 px-3.5 text-xs font-medium">
              <SquareStack className="size-3.5" aria-hidden />
              Add components
            </div>
            <ItemGroup className="rounded-[20px] bg-background px-3 py-1.5 ring-1 ring-border">
              {[
                ["Button", "Triggers an action. Six variants."],
                ["Dialog", "A modal with focus management."],
              ].map(([name, description], index) => (
                <div key={name}>
                  {index > 0 ? <ItemSeparator className="my-0 border-dashed" /> : null}
                  <Item className="px-0">
                    <ItemMedia variant="icon">
                      <SquareStack />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{name}</ItemTitle>
                      <ItemDescription className="truncate">{description}</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Button type="button" variant="outline" size="icon-sm" aria-label={`Add ${name}`}>
                        <Plus />
                      </Button>
                    </ItemActions>
                  </Item>
                </div>
              ))}
            </ItemGroup>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm font-medium">Lists that compose</p>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Item rows combine media, text, and actions without any custom layout.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "tokens",
    kit: "features",
    title: "Tokens",
    description: "Appearance, then the same card in light and in dark.",
    command: `${CLI} button card toggle toggle-group`,
    full: true,
    code: `import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Toggle } from "@/components/ui/Toggle"
import { ToggleGroup } from "@/components/ui/ToggleGroup"

export function Tokens() {
  return (
    <section className="w-full px-6 py-12">
      <h2 className="text-lg font-medium tracking-tight">Light and dark from one set of tokens</h2>
      <div className="mt-6 flex items-center justify-between gap-3">
        <span className="text-sm font-medium">Appearance</span>
        <ToggleGroup defaultValue={["dark"]} aria-label="Appearance">
          <Toggle value="light">Light</Toggle>
          <Toggle value="dark">Dark</Toggle>
          <Toggle value="system">System</Toggle>
        </ToggleGroup>
      </div>
    </section>
  )
}`,
    preview: (
      <section className="w-full px-6 py-12">
        <h3 className="text-lg font-medium tracking-tight">Light and dark from one set of tokens</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Swap one class on the root and every component follows.
        </p>
        <div className="mt-7 flex items-center justify-between gap-3">
          <span className="text-sm font-medium">Appearance</span>
          <ToggleGroup defaultValue={["dark"]} aria-label="Appearance">
            <Toggle value="light">Light</Toggle>
            <Toggle value="dark">Dark</Toggle>
            <Toggle value="system">System</Toggle>
          </ToggleGroup>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Card size="sm">
            <CardHeader>
              <CardTitle>Invite a teammate</CardTitle>
              <CardDescription>Light tokens</CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="xs" type="button">
                Send
              </Button>
            </CardContent>
          </Card>
          <div className="dark rounded-2xl bg-background p-3 text-foreground ring-1 ring-border">
            <Card size="sm">
              <CardHeader>
                <CardTitle>Invite a teammate</CardTitle>
                <CardDescription>Dark tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="xs" type="button">
                  Send
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <ul className="mt-10 grid gap-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <li key={item.title} className="flex flex-col gap-2.5">
              <span className="inline-flex items-center gap-2 text-sm font-medium">
                {item.title === "Keyboard first" ? (
                  <Keyboard className="size-4" aria-hidden />
                ) : item.title === "Light and dark" ? (
                  <Moon className="size-4" aria-hidden />
                ) : item.title === "Base UI" ? (
                  <StackMark id="base-ui" className="size-4" />
                ) : (
                  <SquareStack className="size-4" aria-hidden />
                )}
                {item.title}
              </span>
              <span className="text-sm leading-relaxed text-muted-foreground">{item.body}</span>
            </li>
          ))}
        </ul>
      </section>
    ),
  },
  {
    id: "component-index",
    kit: "features",
    title: "Component index",
    description: "The list at the bottom of the landing page, one link per component.",
    command: `${CLI} button`,
    full: true,
    code: `import Link from "next/link"

const components = ${JSON.stringify(componentItems.map((item) => item.name), null, 2)}

export function ComponentIndex() {
  return (
    <section className="w-full px-6 py-12">
      <div className="mb-8 flex items-baseline justify-between gap-4">
        <h2 className="text-sm font-medium tracking-tight text-muted-foreground">Components</h2>
        <p className="font-mono text-xs text-muted-foreground">{String(components.length).padStart(2, "0")}</p>
      </div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 md:grid-cols-4">
        {components.map((name) => (
          <li key={name}>
            <Link href={"/docs/components/" + name.toLowerCase().replace(/ /g, "-")} className="text-sm text-muted-foreground hover:text-foreground">
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}`,
    preview: (
      <section className="w-full px-6 py-12">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h3 className="text-sm font-medium tracking-tight text-muted-foreground">Components</h3>
          <p className="font-mono text-xs text-muted-foreground">
            {String(componentItems.length).padStart(2, "0")}
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 md:grid-cols-4">
          {componentItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    ),
  },
  {
    id: "installation",
    kit: "cta",
    title: "Installation",
    description: "The closing line on the landing page.",
    command: `${CLI} button`,
    full: true,
    code: `import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button-variants"
import { Card } from "@/components/ui/Card"

export function InstallationCta() {
  return (
    <Card variant="secondary" className="w-full gap-0 py-0">
      <div className="flex flex-col gap-8 px-6 py-8 md:flex-row md:items-end md:justify-between md:px-8 md:py-10">
        <div className="max-w-xl">
          <p className="font-mono text-xs tracking-widest text-muted-foreground">Next</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">Copy the first file.</h2>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Dependencies, tokens, then Button. Everything else is copied on demand.
          </p>
        </div>
        <Link href="/docs/installation" className={buttonVariants({ size: "lg" })}>
          Installation
          <ArrowRightIcon data-icon="inline-end" />
        </Link>
      </div>
    </Card>
  )
}`,
    preview: (
      <Card variant="secondary" className="w-full gap-0 py-0">
        <div className="flex flex-col gap-8 px-6 py-8 md:flex-row md:items-end md:justify-between md:px-8 md:py-10">
          <div className="max-w-xl">
            <p className="font-mono text-xs tracking-widest text-muted-foreground">Next</p>
            <h3 className="mt-3 text-3xl leading-[1.1] font-medium tracking-tight text-balance md:text-4xl">
              Copy the first file.
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Dependencies, tokens, then Button. Everything else is copied on demand.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <Link href="/docs/installation" className={buttonVariants({ size: "lg" })}>
              Installation
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
            <Link
              href="/docs/components"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Browse components
            </Link>
          </div>
        </div>
      </Card>
    ),
  },
  {
    id: "site-footer",
    kit: "footers",
    title: "Site footer",
    description:
      "An inverted panel: the wordmark, the install command, the site links, then the year, the version and GitHub.",
    command: `${CLI} button`,
    full: true,
    code: `import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="px-2 pb-2">
      <div className="dark overflow-hidden rounded-[28px] bg-background text-foreground">
        <div className="mx-auto w-full max-w-6xl px-6 pt-10 pb-6 md:px-12 md:pt-14">
          <div className="flex flex-col gap-12 md:flex-row md:justify-between">
            <div className="max-w-xs">
              <a href="/" className="text-sm font-medium">Lumen UI</a>
              <p className="mt-4 text-sm text-muted-foreground">
                Copy-paste components. The files live in your repo.
              </p>
            </div>
            <nav className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
              <div>
                <p className="font-medium">Start</p>
                <ul className="mt-4 flex flex-col gap-2.5 text-muted-foreground">
                  <li><Link href="/docs">Introduction</Link></li>
                  <li><Link href="/docs/installation">Installation</Link></li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="mt-12 flex items-center justify-between border-t border-border pt-5 text-xs text-muted-foreground">
            <p>© 2026 Lumen UI</p>
            <p className="font-mono">v1.0.1</p>
          </div>
        </div>
      </div>
    </footer>
  )
}`,
    preview: <Footer />,
  },
]
