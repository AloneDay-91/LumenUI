"use client"

import * as React from "react"

export type Heading = {
  id: string
  text: string
  level: number
}

type TOCContextValue = {
  headings: Heading[]
  setHeadings: (headings: Heading[]) => void
}

const DocsTOCContext = React.createContext<TOCContextValue>({
  headings: [],
  setHeadings: () => {},
})

export function DocsTOCProvider({ children }: { children: React.ReactNode }) {
  const [headings, setHeadings] = React.useState<Heading[]>([])

  const value = React.useMemo(
    () => ({ headings, setHeadings }),
    [headings]
  )

  return (
    <DocsTOCContext.Provider value={value}>{children}</DocsTOCContext.Provider>
  )
}

export function useDocsTOC() {
  return React.useContext(DocsTOCContext)
}
