import Link from "next/link"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { FrameworkGuide } from "@/components/docs/FrameworkGuide"

export default function NextjsGuidePage() {
  return (
    <FrameworkGuide
      title="Next.js"
      description="Works as is with the App Router and the Pages Router: the copied files are client components and import nothing from Next.js."
      stack="react"
      headings={[
        { id: "setup", text: "Setup", level: 2 },
        { id: "pages-router", text: "Pages Router", level: 2 },
      ]}
    >
      <section className="space-y-4">
        <h2 id="setup">Setup</h2>
        <p>
          <Link href="/docs/installation">Installation</Link> is written for Next.js: run{" "}
          <code>init</code>, import <code>globals.css</code> in the root layout, load the fonts with{" "}
          <code>next/font</code>, and wrap the body in <code>{`<div className="root">`}</code>.
        </p>
        <CodeBlock
          language="bash"
          code={`npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app
npx @aloneday/lumenui@latest init
npx @aloneday/lumenui@latest add button`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="pages-router">Pages Router</h2>
        <p>
          Import <code>globals.css</code> in <code>pages/_app.tsx</code> instead of the root layout,
          and wrap <code>Component</code> in the <code>root</code> element there.
        </p>
      </section>
    </FrameworkGuide>
  )
}
