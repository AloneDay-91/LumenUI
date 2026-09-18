import Link from "next/link"

import { Logo } from "@/components/Logo"

export function SiteLogo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="inline-flex items-center gap-2.5 font-serif text-sm font-medium"
    >
      <Logo />
      Lumen UI
    </Link>
  )
}

