import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button-variants"

/** The closing section of the 1.2 landing. */
export function StartCta() {
  return (
    <section className="flex w-full flex-col items-center gap-7 px-6 py-24 text-center md:py-32">
      <h2 className="max-w-2xl font-heading text-3xl leading-[1.15] font-normal tracking-[-0.025em] text-balance md:text-[2.5rem]">
        Start with Button.
      </h2>
      <p className="max-w-md text-base text-balance text-muted-foreground">
        Init writes the tokens. Add copies the first component. The rest of the catalog is there when
        the screen needs it.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <Link href="/docs/installation" className={buttonVariants({ size: "lg", variant: "secondary" })}>
          Installation
          <ArrowRightIcon data-icon="inline-end" />
        </Link>
        <Link href="/docs/components" className={buttonVariants({ size: "lg", variant: "secondary" })}>
          Browse components
        </Link>
      </div>
    </section>
  )
}
