"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from "@/components/ui/Autocomplete"

const items = ["Next.js", "Astro", "Vite", "Remix"]

export default function AutocompletePage() {
  return (
    <ComponentDocs
      name="Autocomplete"
      description="Field that suggests options as you type. Built on @base-ui/react/autocomplete."
      preview={
        <div className="w-64">
          <Autocomplete items={items}>
            <AutocompleteInput placeholder="Search a framework" />
            <AutocompleteContent>
              <AutocompleteEmpty>No results</AutocompleteEmpty>
              <AutocompleteList>
                {(item) => (
                  <AutocompleteItem key={item} value={item}>
                    {item}
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompleteContent>
          </Autocomplete>
        </div>
      }
      usage={`import { Autocomplete, AutocompleteInput, AutocompleteContent, AutocompleteList, AutocompleteItem } from "@/components/ui/Autocomplete"

<Autocomplete items={["Next.js", "Astro"]}>
  <AutocompleteInput placeholder="Search" />
  <AutocompleteContent>
    <AutocompleteList>
      {(item) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}
    </AutocompleteList>
  </AutocompleteContent>
</Autocomplete>`}
    />
  )
}
