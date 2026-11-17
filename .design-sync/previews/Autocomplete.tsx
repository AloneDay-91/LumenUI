import { Autocomplete, AutocompleteContent, AutocompleteEmpty, AutocompleteInput, AutocompleteItem, AutocompleteList, Label } from "lumen-ui"

const frameworks = ["Next.js", "Astro", "Vite", "Remix", "SvelteKit", "Nuxt"]

const FrameworkList = () => (
  <AutocompleteContent>
    <AutocompleteEmpty>No results</AutocompleteEmpty>
    <AutocompleteList>
      {(item: string) => (
        <AutocompleteItem key={item} value={item}>
          {item}
        </AutocompleteItem>
      )}
    </AutocompleteList>
  </AutocompleteContent>
)

export const Default = () => (
  <div className="w-64">
    <Autocomplete items={frameworks}>
      <AutocompleteInput placeholder="Search a framework" />
      <FrameworkList />
    </Autocomplete>
  </div>
)

export const WithValue = () => (
  <div className="grid w-64 gap-2">
    <Label htmlFor="ac-framework">Framework</Label>
    <Autocomplete items={frameworks} defaultValue="Astro">
      <AutocompleteInput id="ac-framework" placeholder="Search a framework" />
      <FrameworkList />
    </Autocomplete>
  </div>
)

export const Disabled = () => (
  <div className="w-64">
    <Autocomplete items={frameworks} disabled>
      <AutocompleteInput placeholder="Search a framework" disabled />
      <FrameworkList />
    </Autocomplete>
  </div>
)
