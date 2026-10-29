"use client"

import { usePathname } from "next/navigation"
import * as React from "react"

type DocsSearchValue = {
  query: string
  setQuery: (value: string) => void
}

const DocsSearchContext = React.createContext<DocsSearchValue>({
  query: "",
  setQuery: () => {},
})

export function DocsSearchProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [query, setQuery] = React.useState("")

  const [queryPathname, setQueryPathname] = React.useState(pathname)

  // A new page starts with an empty search.
  if (queryPathname !== pathname) {
    setQueryPathname(pathname)
    setQuery("")
  }

  return (
    <DocsSearchContext.Provider value={{ query, setQuery }}>
      {children}
    </DocsSearchContext.Provider>
  )
}

export function useDocsSearch() {
  return React.useContext(DocsSearchContext)
}
