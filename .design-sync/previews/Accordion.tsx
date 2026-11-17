import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "lumen-ui"

export const Default = () => (
  <Accordion className="w-full max-w-md" defaultValue={["faq-1"]}>
    <AccordionItem value="faq-1">
      <AccordionTrigger>What is Lumen UI?</AccordionTrigger>
      <AccordionPanel>A copy-paste system. Behavior comes from Base UI.</AccordionPanel>
    </AccordionItem>
    <AccordionItem value="faq-2">
      <AccordionTrigger>Can I change the style?</AccordionTrigger>
      <AccordionPanel>Yes. The chrome lives in your repo.</AccordionPanel>
    </AccordionItem>
    <AccordionItem value="faq-3">
      <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
      <AccordionPanel>Every token has a dark value under the .dark class.</AccordionPanel>
    </AccordionItem>
  </Accordion>
)

export const Collapsed = () => (
  <Accordion className="w-full max-w-md">
    <AccordionItem value="shipping">
      <AccordionTrigger>Shipping</AccordionTrigger>
      <AccordionPanel>Orders ship within two business days.</AccordionPanel>
    </AccordionItem>
    <AccordionItem value="returns">
      <AccordionTrigger>Returns</AccordionTrigger>
      <AccordionPanel>Send it back within 30 days for a full refund.</AccordionPanel>
    </AccordionItem>
    <AccordionItem value="warranty">
      <AccordionTrigger>Warranty</AccordionTrigger>
      <AccordionPanel>Two years on every device.</AccordionPanel>
    </AccordionItem>
  </Accordion>
)
