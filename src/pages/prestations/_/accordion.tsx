import {Accordion, AccordionContent, AccordionItem, AccordionTrigger, type AccordionRootProps} from "@/components/ui/accordion"
import {getServiceColor} from "@/lib/pocketbase/utils"

// ROOT ************************************************************************************************************************************
export default ({benefits, proceedings, reasons, variant, ...props}: AccordionProps) => (
  <Accordion multiple class="w-full" {...props}>
    <AccordionItem value="reasons">
      <AccordionTrigger variant={variant}>Pourquoi opter pour une séance ?</AccordionTrigger>
      <AccordionContent>{reasons}</AccordionContent>
    </AccordionItem>
    <AccordionItem value="proceedings">
      <AccordionTrigger variant={variant}>Comment celle-ci se déroule-t-elle ?</AccordionTrigger>
      <AccordionContent>{proceedings}</AccordionContent>
    </AccordionItem>
    <AccordionItem value="benefits">
      <AccordionTrigger variant={variant}>Quels en sont les bienfaits ?</AccordionTrigger>
      <AccordionContent>{benefits}</AccordionContent>
    </AccordionItem>
  </Accordion>
)

// TYPES ***********************************************************************************************************************************
export type AccordionProps = Omit<AccordionRootProps, "children" | "type"> & {
  benefits?: any
  proceedings?: any
  reasons?: any
  variant: ReturnType<typeof getServiceColor>
}
