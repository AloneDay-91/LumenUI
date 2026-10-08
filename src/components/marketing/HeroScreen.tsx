import { PlusIcon } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Kbd, KbdGroup } from "@/components/ui/Kbd";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import type { HeroRow } from "@/lib/hero-registry";

/**
 * Decorative app window. The table lists real Lumen files with their real
 * npm packages, read from the CLI registry at build time.
 */
export function HeroScreen({ rows }: { rows: HeroRow[] }) {
  return (
    <Card className="gap-0 bg-background py-0">
      <div className="flex h-12 items-center justify-between gap-3 border-b border-border px-4 sm:px-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<span />}>my-app</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Components</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button
          type="button"
          variant="outline"
          tabIndex={-1}
          aria-expanded="true"
          className="shrink-0 gap-2 max-sm:w-8 max-sm:px-0"
        >
          <span className="max-sm:hidden">Add component</span>
          <PlusIcon className="sm:hidden" />
          <KbdGroup size="sm" className="max-sm:hidden">
            <Kbd variant="outline">⌘</Kbd>
            <Kbd variant="outline">K</Kbd>
          </KbdGroup>
        </Button>
      </div>

      <div className="px-4 py-5 sm:px-5 lg:pe-76">
        <p className="text-sm font-medium">Components</p>
        <p className="mt-0.5 mb-4 truncate font-mono text-xs text-muted-foreground">
          src/components/ui
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-9 px-3 sm:px-4">File</TableHead>
              <TableHead className="h-9 px-3 max-sm:hidden sm:px-4">
                Directive
              </TableHead>
              <TableHead className="h-9 px-3 sm:px-4">Packages</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.slug}>
                <TableCell className="px-3 py-2.5 font-mono text-xs sm:px-4">
                  {row.file}
                </TableCell>
                <TableCell className="px-3 py-2.5 max-sm:hidden sm:px-4">
                  {row.client ? (
                    <Badge variant="outline" className="font-mono text-[11px]">
                      use client
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell className="px-3 py-2.5 sm:px-4">
                  {row.packages.length ? (
                    <div className="flex flex-wrap gap-x-2 font-mono text-[11px] text-muted-foreground">
                      {row.packages.map((pkg) => (
                        <span
                          key={pkg}
                          className="whitespace-nowrap max-sm:nth-[n+2]:hidden"
                        >
                          {pkg}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
