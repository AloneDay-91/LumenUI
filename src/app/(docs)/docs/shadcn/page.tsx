import Link from "next/link"

import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro } from "@/components/docs/Preview"

const rows = [
  {
    from: "dropdown-menu",
    to: "Menu",
    href: "/docs/components/menu",
    note: "lumenui add menu copies DropdownMenu.tsx. add dropdown-menu still writes that file.",
  },
  {
    from: "sheet",
    to: "Drawer",
    href: "/docs/components/drawer",
    note: "A panel from the edge.",
  },
  {
    from: "hover-card",
    to: "Preview Card",
    href: "/docs/components/preview-card",
    note: "A preview anchored to a link.",
  },
  {
    from: "input-otp",
    to: "OTP Field",
    href: "/docs/components/otp-field",
    note: "One-time code input.",
  },
  {
    from: "sonner",
    to: "Toast",
    href: "/docs/components/toast",
    note: "Temporary messages. There is no separate toaster package.",
  },
  {
    from: "form",
    to: "Form",
    href: "/docs/components/form",
    note: "Native validation from Base UI. It does not wrap react-hook-form.",
  },
] as const

export default function FromShadcnPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "from-shadcn", text: "From shadcn", level: 1 },
          { id: "same-name", text: "Same name", level: 2 },
          { id: "different-name", text: "Different name", level: 2 },
          { id: "side-by-side", text: "In a shadcn project", level: 2 },
        ]}
      />
      <div className="space-y-12">
        <PageIntro
          title="From shadcn"
          description="The model is the same: copy the file, keep the behavior primitive, style it yourself. A few names differ."
        />

        <section className="space-y-4">
          <h2 id="same-name">Same name</h2>
          <p>
            When the name matches, the command matches.{" "}
            <code>lumenui add button</code> is Button,{" "}
            <code>lumenui add dialog</code> is Dialog, and{" "}
            <code>lumenui add sidebar</code> is Sidebar.
          </p>
        </section>

        <section className="space-y-4">
          <h2 id="different-name">Different name</h2>
          <table>
            <thead>
              <tr>
                <th>shadcn/ui</th>
                <th>Lumen</th>
                <th>What changed</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.from}>
                  <td>
                    <code>{row.from}</code>
                  </td>
                  <td>
                    <Link href={row.href}>{row.to}</Link>
                  </td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="space-y-4">
          <h2 id="side-by-side">In a shadcn project</h2>
          <p>
            Both systems write to <code>components/ui</code>, and{" "}
            <code>init</code> replaces a <code>globals.css</code> without the Lumen
            tokens (the old one is kept as <code>globals.css.bak</code>). To move
            over gradually, run <code>init</code>, then point{" "}
            <code>lumen.json</code> at its own folder before the first{" "}
            <code>add</code>. Your shadcn files stay where they are, and you swap
            imports one screen at a time.
          </p>
          <CodeBlock
            filename="lumen.json"
            language="json"
            code={`{
  "aliases": { "ui": "@/components/lumen", "lib": "@/lib" },
  "paths": { "ui": "src/components/lumen", "lib": "src/lib" }
}`}
          />
          <p>
            Both share <code>cn()</code> in <code>lib/utils.ts</code> with the same
            code. The tokens do not: shadcn variables such as{" "}
            <code>--primary</code> keep their names but take Lumen values, so check
            your remaining shadcn screens after <code>init</code>.
          </p>
        </section>
      </div>
    </>
  )
}
