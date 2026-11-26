import Link from "next/link"

import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro } from "@/components/docs/Preview"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { componentItems } from "@/lib/docs-nav"
import { VUE_COMPONENTS } from "@/lib/vue-components"

const ported = componentItems.filter((item) =>
  Object.hasOwn(VUE_COMPONENTS, item.href.split("/").pop() ?? "")
)

const differences: { topic: string; react: string; vue: string }[] = [
  { topic: "Behavior", react: "Base UI", vue: "Reka UI" },
  {
    topic: "Imports",
    react: `@/components/ui/Button`,
    vue: `@/components/ui/button (a folder with an index.ts)`,
  },
  {
    topic: "Rendering as another tag",
    react: "render={<a />}",
    vue: `as="a", or as-child around your own element`,
  },
  {
    topic: "Controlled value",
    react: "checked / onCheckedChange, value / onValueChange",
    vue: "v-model on Checkbox, Switch, RadioGroup, Select, Tabs, Input, Field",
  },
  {
    topic: "State attributes",
    react: "data-open, data-checked, data-active",
    vue: `data-state="open", "checked", "active"`,
  },
  {
    topic: "Select popup",
    react: "alignItemWithTrigger (default true)",
    vue: `position="item-aligned" (default) or "popper"`,
  },
  {
    topic: "Field validation",
    react: "Base UI validity",
    vue: `Field :invalid="…" sets aria-invalid and shows FieldError`,
  },
  {
    topic: "Menu",
    react: "add menu",
    vue: "add dropdown-menu",
  },
]

export default function VuePage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "vue", text: "Vue", level: 1 },
          { id: "requirements", text: "Requirements", level: 2 },
          { id: "install", text: "Install", level: 2 },
          { id: "components", text: "Components", level: 2 },
          { id: "differences", text: "Differences from React", level: 2 },
          { id: "fonts", text: "Fonts", level: 2 },
        ]}
      />

      <div className="space-y-12">
        <PageIntro
          eyebrow="Getting started"
          title="Vue"
          description="Lumen also ships as Vue 3 single-file components built on Reka UI. Same tokens, same stylesheet, same class names: a Vue app and a React app look the same."
        />

        <section className="space-y-4">
          <h2 id="requirements">Requirements</h2>
          <ul className="docs-list">
            <li>Vue 3.5 or newer, with TypeScript and Vite.</li>
            <li>
              The <code>@/</code> alias pointing at <code>src</code>, in{" "}
              <code>vite.config.ts</code> and <code>tsconfig.json</code>.{" "}
              <code>npm create vue@latest</code> sets both up.
            </li>
            <li>Node 22.23.4 or newer to run the CLI.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 id="install">Install</h2>
          <p>
            The CLI picks Vue when <code>package.json</code> depends on{" "}
            <code>vue</code> and not on <code>react</code>. Pass{" "}
            <code>--framework vue</code> to choose it yourself.
          </p>
          <CodeBlock
            language="bash"
            code={`npm create vue@latest my-app -- --typescript
cd my-app
npx @aloneday/lumenui@latest init --framework vue
npx @aloneday/lumenui@latest add button dialog select`}
          />
          <p>
            <code>init</code> writes <code>lumen.json</code> with{" "}
            <code>{`"framework": "vue"`}</code>, <code>src/lib/utils.ts</code>,
            and <code>postcss.config.mjs</code>. It puts the Lumen stylesheet in{" "}
            <code>src/assets/main.css</code> (or <code>src/style.css</code> in the
            plain Vite template), which <code>main.ts</code> already imports. The
            previous file is kept as <code>.bak</code>.
          </p>
          <p>
            Each component lands in its own folder:{" "}
            <code>src/components/ui/dialog/</code> holds{" "}
            <code>Dialog.vue</code>, <code>DialogContent.vue</code>… and an{" "}
            <code>index.ts</code> that exports them. <code>add dialog</code> also
            copies <code>button/</code> and <code>spinner/</code>, which it
            imports.
          </p>
          <CodeBlock
            filename="src/App.vue"
            language="html"
            code={`<script setup lang="ts">
import { Button } from "@/components/ui/button"
</script>

<template>
  <div class="root">
    <Button>Continue</Button>
  </div>
</template>`}
          />
          <Alert>
            <AlertTitle>Wrap the app in .root</AlertTitle>
            <AlertDescription>
              As in React, put the <code>root</code> class on the element the app
              mounts in, so dialogs and menus open above the page.
            </AlertDescription>
          </Alert>
        </section>

        <section className="space-y-4">
          <h2 id="components">Components</h2>
          <p>
            {ported.length} components ship for Vue today. Each page shows the Vue
            install command and an example under <strong>Vue</strong>. The others
            are React only for now.
          </p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3">
            {ported.map((item) => (
              <li key={item.href}>
                <Link href={`${item.href}#vue`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 id="differences">Differences from React</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="py-2 pr-4 font-medium" />
                  <th className="py-2 pr-4 font-medium">React</th>
                  <th className="py-2 font-medium">Vue</th>
                </tr>
              </thead>
              <tbody>
                {differences.map((row) => (
                  <tr key={row.topic} className="border-b border-border align-top">
                    <td className="py-2 pr-4 font-medium">{row.topic}</td>
                    <td className="py-2 pr-4">
                      <code>{row.react}</code>
                    </td>
                    <td className="py-2">
                      <code>{row.vue}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Tooltip brings its own provider, so a lone tooltip works. Wrap a group
            in <code>TooltipProvider</code> to share the delay between them.
          </p>
        </section>

        <section className="space-y-4">
          <h2 id="fonts">Fonts</h2>
          <p>
            Same as any app without Next.js: install the Fontsource packages, import
            them in <code>main.ts</code>, and set the variables. See{" "}
            <Link href="/docs/frameworks#fonts">Fonts without Next.js</Link>.
          </p>
        </section>
      </div>
    </>
  )
}
