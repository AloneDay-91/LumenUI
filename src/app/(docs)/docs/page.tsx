import Link from "next/link"

import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro } from "@/components/docs/Preview"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"

const principles = [
  {
    title: "Your code",
    description:
      "The CLI writes plain .tsx files into your repo. Edit them like your own components; nothing to fork, nothing to upgrade by surprise.",
  },
  {
    title: "Base UI",
    description:
      "Focus, keyboard, ARIA and portals come from Base UI, which stays an npm dependency.",
  },
  {
    title: "Tokens",
    description:
      "Semantic CSS variables for light and dark. Change the palette in one sheet, every component follows.",
  },
  {
    title: "Variants",
    description:
      "Each look is a CVA variant, and cn() merges your classes on top. No style props to learn.",
  },
]

const path = [
  {
    step: "1",
    href: "/docs/installation",
    title: "Installation",
    description: "Run init, load the styles, add Button. About five minutes.",
  },
  {
    step: "2",
    href: "/docs/frameworks",
    title: "Frameworks",
    description: "Vite, React Router, Astro or TanStack Start: the few lines that differ.",
  },
  {
    step: "3",
    href: "/docs/components",
    title: "Components",
    description: "Every component, grouped by the job it does, each with its add command.",
  },
  {
    step: "4",
    href: "/docs/styles",
    title: "Styles",
    description: "The tokens, the type, dark mode, then Customize to make it yours.",
  },
]

const more = [
  {
    href: "/docs/choose",
    title: "Choose a component",
    description: "Select, Combobox or Menu? Dialog or Drawer? Pick from the gesture.",
  },
  {
    href: "/docs/shadcn",
    title: "From shadcn",
    description: "Same model. The names that differ, and the command to run.",
  },
  {
    href: "/docs/accessibility",
    title: "Accessibility",
    description: "What Base UI handles, and what you still name.",
  },
  {
    href: "/docs/recipes/form",
    title: "Recipes",
    description: "A form and a settings card, assembled from several components.",
  },
  {
    href: "/blocks",
    title: "Blocks",
    description: "Headers, heroes, pricing and a dashboard kit, ready to copy.",
  },
  {
    href: "/docs/changelog",
    title: "Changelog",
    description: "What changed in each release.",
  },
]

function LinkCard({
  href,
  title,
  description,
  step,
}: {
  href: string
  title: string
  description: string
  step?: string
}) {
  return (
    <Link href={href} className="block">
      <Card
        size="sm"
        variant="secondary"
        className="h-full transition-colors hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]"
      >
        <CardHeader>
          <CardTitle className="flex items-baseline gap-2">
            {step ? (
              <span className="font-mono text-xs text-muted-foreground">{step}</span>
            ) : null}
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

export default function DocsPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "introduction", text: "Introduction", level: 1 },
          { id: "how-it-works", text: "How it works", level: 2 },
          { id: "principles", text: "What you get", level: 2 },
          { id: "fit", text: "Is it for you?", level: 2 },
          { id: "start", text: "Start here", level: 2 },
          { id: "more", text: "Go further", level: 2 },
          { id: "agents", text: "For AI agents", level: 2 },
        ]}
      />

      <div className="space-y-12">
        <PageIntro
          eyebrow="Getting started"
          title="Introduction"
          description="Lumen UI is a set of React components you copy into your project. Base UI handles the behavior, Tailwind CSS and a sheet of tokens handle the look, and every file is yours."
        />

        <section className="space-y-4">
          <h2 id="how-it-works">How it works</h2>
          <p>
            There is no component package to import. A small CLI copies the source
            of each component into your app, with the files and npm packages it
            needs.
          </p>
          <ol className="docs-list">
            <li>
              <code>init</code> prepares the project once: the stylesheet, the{" "}
              <code>cn()</code> helper and Tailwind CSS 4.
            </li>
            <li>
              <code>add</code> copies the components you pick into{" "}
              <code>components/ui</code>.
            </li>
            <li>
              You import them like your own components, and change them when you
              need to.
            </li>
          </ol>
          <CodeBlock
            language="bash"
            code={`npx @aloneday/lumenui@latest init
npx @aloneday/lumenui@latest add button`}
          />
        </section>

        <section className="space-y-4">
          <h2 id="principles">What you get</h2>
          <p>
            Every component, from Button to Sidebar, speaks one visual language:
            ink on warm paper, pill buttons, Inter for text. The architecture
            follows the shadcn/ui model.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((item) => (
              <Card key={item.title} size="sm" variant="secondary">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 id="fit">Is it for you?</h2>
          <p>
            Lumen fits a React 19 app styled with Tailwind CSS 4 when you want to
            own and adjust the components: Next.js, Vite, React Router, Astro or
            TanStack Start. If you would rather receive fixes through{" "}
            <code>npm update</code> and never touch the source, a packaged library
            suits you better: here, an update is a command you choose to run, file
            by file.
          </p>
        </section>

        <section className="space-y-4">
          <h2 id="start">Start here</h2>
          <p>
            Read these in order the first time. The sidebar follows the same path.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {path.map((item) => (
              <LinkCard key={item.href} {...item} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 id="more">Go further</h2>
          <p>Once Button renders, these pages answer the next questions.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {more.map((item) => (
              <LinkCard key={item.href} {...item} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 id="agents">For AI agents</h2>
          <p>
            Every page has a Markdown version: add <code>.md</code> to its URL. The
            whole documentation is also at <code>/llms.txt</code> (an index) and{" "}
            <code>/llms-full.txt</code> (every page and its source). See{" "}
            <Link href="/docs/llms">LLMs</Link> for a prompt to paste.
          </p>
        </section>
      </div>
    </>
  )
}
