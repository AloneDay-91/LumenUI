"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/Accordion"

export default function AccordionPage() {
  return (
    <ComponentDocs
      name="Accordion"
      description="Panneaux repliables avec titres. Construit sur @base-ui/react/accordion."
      preview={
        <Accordion className="w-full max-w-md" defaultValue={["faq-1"]}>
          <AccordionItem value="faq-1">
            <AccordionTrigger>Qu’est-ce que Lumen UI ?</AccordionTrigger>
            <AccordionPanel>
              Un système copy-paste. Les comportements viennent de Base UI.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger>Puis-je modifier le style ?</AccordionTrigger>
            <AccordionPanel>
              Oui. Le chrome vit dans votre dépôt.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      }
      usage={`import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@/components/ui/Accordion"

<Accordion defaultValue={["faq-1"]}>
  <AccordionItem value="faq-1">
    <AccordionTrigger>Question</AccordionTrigger>
    <AccordionPanel>Réponse</AccordionPanel>
  </AccordionItem>
</Accordion>`}
    />
  )
}
