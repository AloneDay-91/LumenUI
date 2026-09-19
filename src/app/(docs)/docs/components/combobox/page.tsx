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
      description="Input combined with a list of items. Built on @base-ui/react/combobox."
      preview={
        <div className="w-64">
          <Combobox items={items}>
            <ComboboxInput placeholder="Pick a component" />
            <ComboboxContent>
              <ComboboxEmpty>No results</ComboboxEmpty>
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
  <ComboboxInput placeholder="Choose" />
  <ComboboxContent>
    <ComboboxList>
      {(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
    />
  )
}
