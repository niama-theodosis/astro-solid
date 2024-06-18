import {cn} from "@/lib/utils"
import * as AccordionPrimitive from "@kobalte/core/accordion"
import type {PolymorphicProps} from "@kobalte/core/polymorphic"
import {splitProps, type JSX, type ValidComponent} from "solid-js"
import {tv, type VariantProps} from "tailwind-variants"

// STYLES **********************************************************************************************************************************
export const ACCORDION = tv({
  slots: {
    TRIGGER: `text-gray-600 text-lg font-heading flex flex-1 items-center justify-between py-4 font-bold transition-all 
   [&[data-expanded]>svg]:rotate-180`,
  },
  variants: {
    variant: {
      primary: {TRIGGER: `hover:text-primary`},
      secondary: {TRIGGER: `hover:text-secondary`},
    },
  },
  defaultVariants: {
    variant: "secondary",
  },
})

const {TRIGGER} = ACCORDION()

// ROOT ************************************************************************************************************************************
export const Accordion = AccordionPrimitive.Root
export type {AccordionRootProps} from "@kobalte/core/accordion"

// ITEM ************************************************************************************************************************************
export const AccordionItem = <T extends ValidComponent = "div">(props: PolymorphicProps<T, AccordionItemProps<T>>) => {
  const [local, others] = splitProps(props as AccordionItemProps, ["class"])
  return <AccordionPrimitive.Item class={cn("border-b", local.class)} {...others} />
}

type AccordionItemProps<T extends ValidComponent = "div"> = AccordionPrimitive.AccordionItemProps<T> & {
  class?: string | undefined
}

// TRIGGER *********************************************************************************************************************************
export const AccordionTrigger = <T extends ValidComponent = "button">(props: PolymorphicProps<T, AccordionTriggerProps<T>>) => {
  const [local, others] = splitProps(props as AccordionTriggerProps, ["class", "children", "variant"])
  return (
    <AccordionPrimitive.Header class="flex">
      <AccordionPrimitive.Trigger class={TRIGGER({variant: local.variant, class: local.class})} {...others}>
        {local.children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4 shrink-0 transition-transform duration-200"
        >
          <path d="M6 9l6 6l6 -6" />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

type AccordionTriggerProps<T extends ValidComponent = "button"> = AccordionPrimitive.AccordionTriggerProps<T> & {
  class?: string | undefined
  children?: JSX.Element
} & VariantProps<typeof TRIGGER>

// CONTENT *********************************************************************************************************************************
export const AccordionContent = <T extends ValidComponent = "div">(props: PolymorphicProps<T, AccordionContentProps<T>>) => {
  const [local, others] = splitProps(props as AccordionContentProps, ["class", "children"])
  return (
    <AccordionPrimitive.Content
      class={cn("animate-accordion-up overflow-hidden text-sm transition-all data-[expanded]:animate-accordion-down", local.class)}
      {...others}
    >
      <div class="pb-4 pt-0">{local.children}</div>
    </AccordionPrimitive.Content>
  )
}

type AccordionContentProps<T extends ValidComponent = "div"> = AccordionPrimitive.AccordionContentProps<T> & {
  class?: string | undefined
  children?: JSX.Element
}
