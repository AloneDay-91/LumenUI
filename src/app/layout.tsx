import type { Metadata } from "next"
import Script from "next/script"
import type { ReactNode } from "react"
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google"

import { LogoSprite } from "@/components/LogoSprite"
import { ThemeProvider } from "@/components/ThemeProvider"
import { UpdateBanner } from "@/components/UpdateBanner"
import { SITE_URL } from "@/lib/site"
import { getUpdateBannerBootstrap } from "@/lib/update-banner"
import { cn } from "@/lib/utils"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lumen UI",
    template: "%s · Lumen UI",
  },
  description: "Copy-paste design system. Components built on Base UI.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        inter.variable,
        fraunces.variable,
        jetbrains.variable
      )}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <script
          dangerouslySetInnerHTML={{ __html: getUpdateBannerBootstrap() }}
        />
        <LogoSprite />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-3 focus:py-1.5 focus:text-sm focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <div className="root min-h-dvh">
            <UpdateBanner />
            {children}
          </div>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" ? (
          <Script
            defer
            src="https://analytics.mmi23f03.fr/script.js"
            data-website-id="f4f5dd3f-9dfb-4235-943b-d64b304b5fdc"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  )
}
