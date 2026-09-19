"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Separator } from "@/components/ui/Separator"
import { getAdjacentDocs } from "@/lib/docs-nav"
import { cn } from "@/lib/utils"

export function DocsPager() {
  const pathname = usePathname()
  const { prev, next } = getAdjacentDocs(pathname)

  if (!prev && !next) {
    return null
  }

  return (
    <div className="mt-16 space-y-8">
      <Separator />
      <nav
        aria-label="Documentation pagination"
        className="grid gap-4 sm:grid-cols-2"
      >
        {prev ? (
          <Link href={prev.href} className="block">
            <Card
              size="sm"
              variant="secondary"
              className="h-full transition-colors hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]"
            >
              <CardHeader>
                <CardDescription>Previous</CardDescription>
                <CardTitle className="flex items-center gap-2">
                  <ArrowLeft className="size-3.5 shrink-0" />
                  {prev.name}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={next.href}
            className={cn("block", !prev && "sm:col-start-2")}
          >
            <Card
              size="sm"
              variant="secondary"
              className="h-full transition-colors hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]"
            >
              <CardHeader className="items-end text-right">
                <CardDescription>Next</CardDescription>
                <CardTitle className="flex items-center justify-end gap-2">
                  {next.name}
                  <ArrowRight className="size-3.5 shrink-0" />
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ) : null}
      </nav>
    </div>
  )
}
