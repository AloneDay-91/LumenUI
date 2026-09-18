import Link from "next/link"

import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { PageIntro } from "@/components/docs/Preview"
import { Separator } from "@/components/ui/Separator"
import {
  changelog,
  changelogKindLabel,
  formatChangelogDate,
  type ChangelogItem,
  type ChangelogKind,
} from "@/lib/changelog"
import { formatDocsVersion } from "@/lib/site"

const kindOrder: ChangelogKind[] = ["added", "changed", "fixed"]

function groupItems(items: ChangelogItem[]) {
  return kindOrder
    .map((kind) => ({
      kind,
      items: items.filter((item) => item.kind === kind),
    }))
    .filter((group) => group.items.length > 0)
}

export default function ChangelogPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "changelog", text: "Changelog", level: 1 },
          ...changelog.map((release) => ({
            id: release.version,
            text: formatDocsVersion(release.version),
            level: 2 as const,
          })),
        ]}
      />

      <PageIntro
        title="Changelog"
        description="Notes de version de Lumen UI. La pastille à gauche d'une page du sommaire signale une nouveauté de la dernière version."
      />

      <div className="space-y-12">
        {changelog.map((release, index) => (
          <section key={release.version} className="space-y-4">
            {index > 0 ? <Separator /> : null}
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id={release.version} className="font-mono">
                {formatDocsVersion(release.version)}
              </h2>
              <time
                dateTime={release.date}
                className="text-xs text-muted-foreground"
              >
                {formatChangelogDate(release.date)}
              </time>
            </div>
            <p>{release.summary}</p>
            {groupItems(release.items).map((group) => (
              <div key={group.kind} className="space-y-2">
                <h3 id={`${release.version}-${group.kind}`}>
                  {changelogKindLabel(group.kind)}
                </h3>
                <ul className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={`${item.text}-${item.href ?? ""}`}>
                      {item.href ? (
                        <p>
                          <Link href={item.href}>{item.text}</Link>
                        </p>
                      ) : (
                        <p>{item.text}</p>
                      )}
                      {item.links && item.links.length > 0 ? (
                        <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
                          {item.links.map((link) => (
                            <li key={link.href}>
                              <Link href={link.href}>{link.name}</Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </div>
    </>
  )
}