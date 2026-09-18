import type { ReactNode } from "react"

import { Footer } from "@/components/docs/Footer"
import { MarketingMobileNav } from "@/components/marketing/MarketingMobileNav"
import { MarketingNav } from "@/components/marketing/MarketingNav"
import { LANDING_MAX_WIDTH } from "@/lib/site"
import { cn } from "@/lib/utils"

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh w-full flex-col bg-background">
      <MarketingNav />
      <div className="flex min-h-0 flex-1 flex-col overflow-x-clip">
        <div className={cn("mx-auto w-full px-6 md:px-12", LANDING_MAX_WIDTH)}>
          <MarketingMobileNav />
        </div>
        {children}
        <Footer />
      </div>
    </div>
  )
}
