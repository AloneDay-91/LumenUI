"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Button } from "@/components/ui/Button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/Popover"

export default function PopoverPage() {
  return (
    <ComponentDocs
      name="Popover"
      description="Popup ancré à un bouton. Construit sur @base-ui/react/popover."
      preview={
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            Détails
          </PopoverTrigger>
          <PopoverContent>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
              Largeur, hauteur et rayon des tokens Lumen.
            </PopoverDescription>
          </PopoverContent>
        </Popover>
      }
      usage={`import { Popover, PopoverTrigger, PopoverContent, PopoverTitle } from "@/components/ui/Popover"

<Popover>
  <PopoverTrigger render={<Button />}>Ouvrir</PopoverTrigger>
  <PopoverContent>
    <PopoverTitle>Titre</PopoverTitle>
  </PopoverContent>
</Popover>`}
    />
  )
}
