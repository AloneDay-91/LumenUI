import {
  ArrowRightIcon,
  CopyIcon,
  MenuIcon,
  MessageSquareIcon,
  SearchIcon,
} from "lucide-react";

import { CodeBlock } from "@/components/docs/CodeBlock";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tabs, TabsIndicator, TabsList, TabsTab } from "@/components/ui/Tabs";
import { isNewDocsPage } from "@/lib/changelog";
import { docsSections } from "@/lib/docs-nav";
import type { HeroDoc } from "@/lib/hero-registry";
import { formatDocsVersion } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Decorative docs window: the real sidebar, page intro and table of contents
 * of a component page, drawn with the same components and classes as /docs.
 * Headings are paragraphs here, so the home page keeps a single h1.
 */
export function HeroDocs({ doc }: { doc: HeroDoc }) {
  const gettingStarted = docsSections[0];
  const group = docsSections.find((section) => section.title === doc.group);

  return (
    <Card className="gap-0 bg-background py-0">
      {/* Same markup and classes as DocsHeader, with inert buttons. */}
      <div className="flex h-14 items-center gap-3 border-b border-border px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-8">
          <svg
            viewBox="0 -10 682.5 120"
            fill="currentColor"
            aria-hidden
            className="h-[18px] w-[102.4px] shrink-0 overflow-visible"
          >
            <use href="#lumen-lockup" />
          </svg>
          <span className="hidden text-xs text-muted-foreground lg:inline">
            Documentation
          </span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <span className="mr-1 hidden font-mono text-[11px] text-muted-foreground sm:inline">
            {formatDocsVersion()}
          </span>
          {[
            { label: "Ask Lumen", Icon: MessageSquareIcon },
            { label: "Search", Icon: SearchIcon },
            { label: "Menu", Icon: MenuIcon },
          ].map(({ label, Icon }) => (
            <Button
              key={label}
              variant="ghost"
              size="icon-sm"
              tabIndex={-1}
              className="text-muted-foreground"
            >
              <Icon className="size-4" />
            </Button>
          ))}
        </div>
      </div>

      <div className="flex">
        <nav className="hidden w-52 shrink-0 flex-col gap-6 border-r border-border px-3 py-5 md:flex">
          {[
            { ...gettingStarted, items: gettingStarted.items.slice(0, 5) },
            ...(group ? [group] : []),
          ].map((section) => (
            <div key={section.title}>
              <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
                {section.title}
              </p>
              <ul className="flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <li
                    key={item.href}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-lg px-2 py-1 text-[13px] text-muted-foreground",
                      item.href === doc.href && "bg-muted font-medium text-foreground"
                    )}
                  >
                    <span className="truncate">{item.name}</span>
                    {isNewDocsPage(item.href) ? (
                      <span className="size-1.5 shrink-0 rounded-full bg-new" />
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="min-w-0 flex-1">
          <div className="flex h-11 items-center border-b border-border px-4 sm:px-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <span>{doc.group}</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{doc.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Same measures as .docs-article. */}
          <div className="space-y-8 px-4 py-6 sm:px-6">
            <div>
              <div className="flex items-start justify-between gap-4">
                <p className="text-xl leading-tight font-medium tracking-tight md:text-2xl">
                  {doc.name}
                </p>
                <Button variant="outline" size="sm" tabIndex={-1}>
                  <CopyIcon data-icon="inline-start" />
                  Copy
                </Button>
              </div>
              <p className="mt-3 max-w-[65ch] text-sm leading-6 text-muted-foreground">
                {doc.description}
              </p>
            </div>

            <Card className="flex w-full flex-col gap-4 px-6 py-6">
              <p className="self-end text-xs text-muted-foreground">
                Light and dark
              </p>
              <div className="flex min-h-24 flex-wrap items-center justify-center gap-3">
                <Button tabIndex={-1}>Continue</Button>
                <Button variant="outline" tabIndex={-1}>
                  Browse
                  <ArrowRightIcon data-icon="inline-end" />
                </Button>
              </div>
            </Card>

            <Tabs defaultValue="usage" className="gap-6">
              <TabsList variant="line">
                <TabsIndicator />
                <TabsTab value="usage" tabIndex={-1}>
                  Usage
                </TabsTab>
                <TabsTab value="api" tabIndex={-1}>
                  API
                </TabsTab>
              </TabsList>
            </Tabs>

            <div className="space-y-4">
              <p className="text-sm font-medium tracking-tight">Installation</p>
              <CodeBlock language="bash" code={doc.install} />
            </div>
          </div>
        </div>

        <div className="hidden w-48 shrink-0 px-4 py-5 lg:block">
          <p className="mb-3 text-xs font-medium text-muted-foreground">
            On this page
          </p>
          <ul className="flex flex-col gap-1.5 border-l border-border">
            {doc.headings.map((heading, index) => (
              <li
                key={heading}
                className={cn(
                  "-ml-px border-l px-3 text-xs",
                  index === 0
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground"
                )}
              >
                {heading}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
