import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith("/docs") || !pathname.endsWith(".md")) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = `/md${pathname.slice(0, -3)}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ["/docs.md", "/docs/:path*"],
}
