import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google"

import { ThemeProvider } from "@/components/ThemeProvider"
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
      className={cn(inter.variable, fraunces.variable, jetbrains.variable)}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-3 focus:py-1.5 focus:text-sm focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <div className="root min-h-dvh">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
