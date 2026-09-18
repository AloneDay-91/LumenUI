"use client"

import * as React from "react"

import { useDocsTOC, type Heading } from "@/components/docs/DocsTOCContext"

export default function HeadingsSetter({ headings }: { headings: Heading[] }) {
  const { setHeadings } = useDocsTOC()
  const key = headings.map((heading) => `${heading.level}:${heading.id}`).join("|")

  React.useLayoutEffect(() => {
    setHeadings(
      headings.filter((heading) => heading.level === 2 || heading.level === 3)
    )
    return () => setHeadings([])
  }, [key, setHeadings])

  return null
}
