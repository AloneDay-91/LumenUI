import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, Label } from "lumen-ui"

const components = ["Button", "Input", "Select", "Dialog", "Tooltip", "Popover"]

const ComponentList = () => (
  <ComboboxContent>
    <ComboboxEmpty>No results</ComboboxEmpty>
    <ComboboxList>
      {(item: string) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
)

export const Default = () => (
  <div className="w-64">
    <Combobox items={components}>
      <ComboboxInput placeholder="Pick a component" />
      <ComponentList />
    </Combobox>
  </div>
)

export const WithValue = () => (
  <div className="grid w-64 gap-2">
    <Label htmlFor="cb-component">Component</Label>
    <Combobox items={components} defaultValue="Dialog">
      <ComboboxInput id="cb-component" placeholder="Pick a component" />
      <ComponentList />
    </Combobox>
  </div>
)

export const Disabled = () => (
  <div className="w-64">
    <Combobox items={components} disabled>
      <ComboboxInput placeholder="Pick a component" />
      <ComponentList />
    </Combobox>
  </div>
)
