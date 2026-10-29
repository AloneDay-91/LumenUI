import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export default function ThemeTogglePage() {
  return (
    <ComponentDocs
      name="Theme Toggle"
      description="Switches light and dark. Sun in the light theme, moon in the dark theme. The same control as the docs chrome."
      preview={<ThemeToggle />}
      usage={`import { ThemeToggle } from "@/components/ui/ThemeToggle"

<ThemeToggle />`}
      extraHeadings={[{ id: "provider", text: "Provider", level: 2 }]}
      extra={
        <section className="space-y-4">
          <h2 id="provider">Provider</h2>
          <p>
            The button reads <code>resolvedTheme</code> from{" "}
            <code>next-themes</code>. Wrap the app so the class lands on{" "}
            <code>html</code>. The icon stays hidden until that theme is known,
            then a click sets <code>light</code> or <code>dark</code>.
          </p>
          <CodeBlock
            filename="app/layout.tsx"
            code={`import { ThemeProvider } from "next-themes"

<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>`}
          />
        </section>
      }
    />
  )
}
