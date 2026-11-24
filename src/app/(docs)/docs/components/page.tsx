import Link from "next/link"

import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro } from "@/components/docs/Preview"
import { getLatestChangelog, isNewDocsPage } from "@/lib/changelog"
import { getPageVersions, minorOf } from "@/lib/doc-versions"
import { componentGroups, componentItems } from "@/lib/docs-nav"

const latest = getLatestChangelog().version

/** New in the latest release, or changed by it. Same source as the sidebar dots and page badges. */
function statusOf(href: string): "new" | "updated" | null {
  if (isNewDocsPage(href)) return "new"
  const { updated } = getPageVersions(href)
  return updated === latest ? "updated" : null
}

function groupId(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-")
}

export default function ListComponentsPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "components", text: "Components", level: 1 },
          { id: "add", text: "Add a component", level: 2 },
          ...componentGroups.map((group) => ({
            id: groupId(group.title),
            text: group.title,
            level: 2 as const,
          })),
        ]}
      />

      <div className="space-y-12">
        <PageIntro
          title="Components"
          description="Every component, grouped by the job it does. Each page opens with a live preview, then the command that copies it into your project."
        />

        <section className="space-y-4">
          <h2 id="add">Add a component</h2>
          <p>
            Use the slug from the page URL. One command can take several names,
            and <code>all</code> copies the whole set. The files each component
            needs come with it. First time here? Start with{" "}
            <Link href="/docs/installation">Installation</Link>; unsure which one
            fits, see <Link href="/docs/choose">Choose a component</Link>.
          </p>
          <CodeBlock
            language="bash"
            code={`npx @aloneday/lumenui@latest add dialog
npx @aloneday/lumenui@latest add input field select
npx @aloneday/lumenui@latest add all`}
          />
          <p className="font-mono text-xs text-muted-foreground">
            {String(componentItems.length).padStart(2, "0")} components ·{" "}
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="size-1.5 rounded-full bg-primary" />
              new in v{minorOf(latest)}
            </span>{" "}
            ·{" "}
            <span className="inline-flex h-4 items-center rounded-full bg-secondary px-1.5 text-[10px] text-secondary-foreground">
              v{minorOf(latest)}
            </span>{" "}
            updated
          </p>
        </section>

        {componentGroups.map((group) => (
          <section key={group.title} className="space-y-4">
            <h2 id={groupId(group.title)}>{group.title}</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 md:grid-cols-4">
              {group.items.map((item) => {
                const status = statusOf(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-md text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {status === "new" ? <span className="sr-only">New: </span> : null}
                      {item.name}
                      {status === "new" ? (
                        <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-primary" />
                      ) : status === "updated" ? (
                        <span className="inline-flex h-4 shrink-0 items-center rounded-full bg-secondary px-1.5 font-mono text-[10px] whitespace-nowrap text-secondary-foreground">
                          <span className="sr-only">Updated in </span>v{minorOf(latest)}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}
