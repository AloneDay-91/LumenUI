"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

import { ToastProvider, Toaster } from "@/components/ui/Toast"
import { TooltipProvider } from "@/components/ui/Tooltip"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider delay={200}>
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
      </TooltipProvider>
    </NextThemesProvider>
  )
}
