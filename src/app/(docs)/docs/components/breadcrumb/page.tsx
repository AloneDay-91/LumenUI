import Link from "next/link"
import { SlashIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLinkItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"

export default function BreadcrumbPage_() {
  return (
    <ComponentDocs
      name="Breadcrumb"
      description="Trail of links back up the hierarchy. Native nav, ol and li."
      preview={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/docs" />}>
                Docs
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/docs/components/button" />}>
                Components
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
      usage={`import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink render={<Link href="/docs" />}>Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
      extraHeadings={[
        { id: "composition", text: "Composition", level: 2 },
        { id: "link", text: "Linking", level: 2 },
        { id: "separator", text: "Custom separator", level: 2 },
        { id: "collapsed", text: "Collapsed path", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="composition">Composition</h2>
            <CodeBlock
              language="text"
              code={`Breadcrumb
└── BreadcrumbList
    ├── BreadcrumbItem
    │   └── BreadcrumbLink
    ├── BreadcrumbSeparator
    ├── BreadcrumbItem
    │   └── BreadcrumbEllipsis
    ├── BreadcrumbSeparator
    └── BreadcrumbItem
        └── BreadcrumbPage`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="link">Linking</h2>
            <p>
              <code>BreadcrumbLink</code> renders an <code>a</code> by default.
              Pass <code>render</code> to swap in a router link — the Lumen
              classes merge onto whatever you hand it, the same way{" "}
              <code>TooltipTrigger</code> works.
            </p>
            <CodeBlock
              code={`// plain anchor
<BreadcrumbLink href="/docs">Docs</BreadcrumbLink>

// Next.js
<BreadcrumbLink render={<Link href="/docs" />}>Docs</BreadcrumbLink>`}
            />
            <p>
              The last step is a <code>BreadcrumbPage</code>, not a link: it
              carries <code>aria-current=&quot;page&quot;</code> so assistive
              tech announces where the reader is.
            </p>
          </section>

          <section className="space-y-4">
            <h2 id="separator">Custom separator</h2>
            <p>
              <code>BreadcrumbSeparator</code> renders a chevron unless you give
              it children. It is <code>aria-hidden</code>, so the glyph is never
              read out.
            </p>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/docs" />}>
                    Docs
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <CodeBlock
              code={`<BreadcrumbSeparator>
  <SlashIcon />
</BreadcrumbSeparator>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="collapsed">Collapsed path</h2>
            <p>
              On a deep path, fold the middle into a{" "}
              <code>BreadcrumbEllipsis</code> and hand the hidden steps to a
              menu, so they stay reachable instead of being dropped.
            </p>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/docs" />}>
                    Docs
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<BreadcrumbEllipsis />} />
                    <DropdownMenuContent>
                      <DropdownMenuLinkItem href="/docs/installation">
                        Installation
                      </DropdownMenuLinkItem>
                      <DropdownMenuLinkItem href="/docs/styles">
                        Styles
                      </DropdownMenuLinkItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <CodeBlock
              code={`<BreadcrumbItem>
  <DropdownMenu>
    <DropdownMenuTrigger render={<BreadcrumbEllipsis />} />
    <DropdownMenuContent>
      <DropdownMenuLinkItem href="/docs/installation">
        Installation
      </DropdownMenuLinkItem>
      <DropdownMenuLinkItem href="/docs/styles">Styles</DropdownMenuLinkItem>
    </DropdownMenuContent>
  </DropdownMenu>
</BreadcrumbItem>`}
            />
          </section>
        </>
      }
    />
  )
}
