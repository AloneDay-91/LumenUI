import Link from "next/link"
import { PlusIcon, RefreshCwIcon, WrenchIcon } from "lucide-react"

import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { PageIntro } from "@/components/docs/Preview"
import { Badge, type BadgeColor } from "@/components/ui/Badge"
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

/** Each kind is a hued badge with an icon, so the groups read at a glance. */
const kindStyle: Record<ChangelogKind, { color: BadgeColor; icon: typeof PlusIcon }> = {
  added: { color: "jade", icon: PlusIcon },
  changed: { color: "indigo", icon: RefreshCwIcon },
  fixed: { color: "orange", icon: WrenchIcon },
}

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
            text: `${formatDocsVersion(release.version)} · ${release.title}`,
            level: 2 as const,
          })),
        ]}
      />

      <PageIntro
        title="Changelog"
        description="Lumen UI release notes. A dot to the left of a sidebar page marks something new in the latest version."
      />

      <div className="space-y-12">
        {changelog.map((release, index) => (
          <section key={release.version} className="space-y-4">
            {index > 0 ? <Separator /> : null}
            <div className="space-y-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs text-muted-foreground">
                <span className="font-mono">{formatDocsVersion(release.version)}</span>
                <time dateTime={release.date}>
                  {formatChangelogDate(release.date)}
                </time>
              </div>
              <h2 id={release.version} className="mt-0! text-base!">
                {release.title}
              </h2>
            </div>
            <p>{release.summary}</p>
            {groupItems(release.items).map((group) => {
              const style = kindStyle[group.kind]
              const Icon = style.icon
              return (
              <div key={group.kind} className="space-y-2 pt-2">
                <h3
                  id={`${release.version}-${group.kind}`}
                  className="mt-0! flex items-center gap-2"
                >
                  <Badge color={style.color} className="h-6 gap-1.5 px-2.5 text-xs">
                    <Icon aria-hidden className="size-3!" />
                    {changelogKindLabel(group.kind)}
                  </Badge>
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
              )
            })}
          </section>
        ))}
      </div>
    </>
  )
}