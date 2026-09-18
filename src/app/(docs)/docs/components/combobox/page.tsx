"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/Combobox"

const items = ["Button", "Input", "Select", "Dialog"]

export default function ComboboxPage() {
  return (
    <ComponentDocs
      name="Combobox"
      description="Saisie combinée à une liste d’items. Construit sur @base-ui/react/combobox."
      preview={
        <div className="w-64">
          <Combobox items={items}>
            <ComboboxInput placeholder="Choisir un composant" />
            <ComboboxContent>
              <ComboboxEmpty>Aucun résultat</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      }
      usage={`import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem } from "@/components/ui/Combobox"

<Combobox items={["Button", "Input"]}>
  <ComboboxInput placeholder="Choisir" />
  <ComboboxContent>
    <ComboboxList>
      {(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
    />
  )
}
