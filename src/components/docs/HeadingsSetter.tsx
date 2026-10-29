"use client"

import * as React from "react"

import { useDocsTOC, type Heading } from "@/components/docs/DocsTOCContext"

export default function HeadingsSetter({ headings }: { headings: Heading[] }) {
  const { setHeadings } = useDocsTOC()

  React.useLayoutEffect(() => {
    setHeadings(
      headings.filter((heading) => heading.level === 2 || heading.level === 3)
    )
    return () => setHeadings([])
  }, [headings, setHeadings])

  return null
}
