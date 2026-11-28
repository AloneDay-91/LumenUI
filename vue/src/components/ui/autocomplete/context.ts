import type { ComputedRef, InjectionKey } from "vue"

/** The `items` passed to Autocomplete, read by AutocompleteList to render one slot per item. */
export const autocompleteItemsKey: InjectionKey<ComputedRef<readonly string[] | undefined>> =
  Symbol("autocomplete-items")
