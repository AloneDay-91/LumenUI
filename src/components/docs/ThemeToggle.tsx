"use client"

import { Moon, SunMedium } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"

function HalfIcon() {
  return (
    <svg viewBox="0 0 15 15" fill="none" className="size-3.5" aria-hidden>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.5.877a6.623 6.623 0 1 0 0 13.246A6.623 6.623 0 0 0 7.5.877ZM1.827 7.5a5.673 5.673 0 0 0 5.673 5.673V1.827A5.673 5.673 0 0 0 1.827 7.5Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <HalfIcon />
            <span className="sr-only">Changer le thème</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <SunMedium />
          Clair
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon />
          Sombre
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
