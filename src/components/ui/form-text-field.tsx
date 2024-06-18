import {TextField as Kobalte} from "@kobalte/core"
import {Show, splitProps, type JSX} from "solid-js"
import {tv} from "tailwind-variants"

export const TEXT_FIELD = tv({
  slots: {
    INPUT: `flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background 
    file:border-0 file:bg-transparent file:text-sm file:font-medium 
    placeholder:text-muted-foreground 
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
    disabled:cursor-not-allowed disabled:opacity-50`,
    LABEL: `text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`,
    MESSAGE: `text-sm font-medium text-destructive`,
  },
})

const {INPUT, LABEL, MESSAGE} = TEXT_FIELD()

type TextFieldProps = {
  name: string
  type?: "text" | "email" | "tel" | "password" | "url" | "date" | undefined
  label?: string | undefined
  placeholder?: string | undefined
  value: string | undefined
  error: string
  multiline?: boolean | undefined
  required?: boolean | undefined
  disabled?: boolean | undefined
  ref: (element: HTMLInputElement | HTMLTextAreaElement) => void
  onInput: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, InputEvent>
  onChange: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, Event>
  onBlur: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, FocusEvent>
}

export function TextField(props: TextFieldProps) {
  const [rootProps, inputProps] = splitProps(
    props,
    ["name", "value", "required", "disabled"],
    ["placeholder", "ref", "onInput", "onChange", "onBlur"]
  )
  return (
    <Kobalte.Root {...rootProps} validationState={props.error ? "invalid" : "valid"}>
      <Show when={props.label}>
        <Kobalte.Label class={LABEL()}>{props.label}</Kobalte.Label>
      </Show>
      <Show when={props.multiline} fallback={<Kobalte.Input {...inputProps} type={props.type} class={INPUT()} />}>
        <Kobalte.TextArea {...inputProps} autoResize />
      </Show>
      <Kobalte.ErrorMessage class={MESSAGE()}>{props.error}</Kobalte.ErrorMessage>
    </Kobalte.Root>
  )
}
