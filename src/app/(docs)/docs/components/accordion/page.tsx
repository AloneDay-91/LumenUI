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
      description="Collapsible panels with headings. Built on @base-ui/react/accordion."
      preview={
        <Accordion className="w-full max-w-md" defaultValue={["faq-1"]}>
          <AccordionItem value="faq-1">
            <AccordionTrigger>What is Lumen UI?</AccordionTrigger>
            <AccordionPanel>
              A copy-paste system. Behavior comes from Base UI.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger>Can I change the style?</AccordionTrigger>
            <AccordionPanel>
              Yes. The chrome lives in your repo.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      }
      usage={`import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@/components/ui/Accordion"

<Accordion defaultValue={["faq-1"]}>
  <AccordionItem value="faq-1">
    <AccordionTrigger>Question</AccordionTrigger>
    <AccordionPanel>Answer</AccordionPanel>
  </AccordionItem>
</Accordion>`}
    />
  )
}
