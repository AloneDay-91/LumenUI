import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button-variants"
import { Card } from "@/components/ui/Card"

export function InstallationCta() {
  return (
    <Card variant="secondary" className="w-full gap-0 py-0">
      <div className="flex flex-col gap-8 px-6 py-8 md:flex-row md:items-end md:justify-between md:px-8 md:py-10">
        <div className="max-w-xl">
          <p className="font-mono text-xs tracking-widest text-muted-foreground">Next</p>
          <h2 className="mt-3 text-3xl leading-[1.1] font-medium tracking-tight text-balance md:text-4xl">
            Copy the first file.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Dependencies, tokens, then Button. Everything else is copied on demand.
          </p>
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <Link href="/docs/installation" className={buttonVariants({ size: "lg" })}>
            Installation
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
          <Link href="/docs/components" className={buttonVariants({ size: "lg", variant: "outline" })}>
            Browse components
          </Link>
        </div>
      </div>
    </Card>
  )
}
