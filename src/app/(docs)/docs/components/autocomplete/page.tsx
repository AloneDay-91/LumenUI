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
      description="Champ qui suggère des options pendant la saisie. Construit sur @base-ui/react/autocomplete."
      preview={
        <div className="w-64">
          <Autocomplete items={items}>
            <AutocompleteInput placeholder="Rechercher un framework" />
            <AutocompleteContent>
              <AutocompleteEmpty>Aucun résultat</AutocompleteEmpty>
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
  <AutocompleteInput placeholder="Rechercher" />
  <AutocompleteContent>
    <AutocompleteList>
      {(item) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}
    </AutocompleteList>
  </AutocompleteContent>
</Autocomplete>`}
    />
  )
}
