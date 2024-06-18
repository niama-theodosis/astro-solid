import {tv} from "tailwind-variants"

export {default as AlertDescription, type Props as AlertDescriptionProps} from "./description.astro"
export {default as Alert, type Props as AlertProps} from "./root.astro"
export {default as AlertTitle, type Props as AlertTitleProps} from "./title.astro"

// STYLES **********************************************************************************************************************************
export const ALERT = tv({
  base: `relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 
  [&>svg]:top-4 [&>svg]:text-foreground`,
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      success: "border-success/50 text-success dark:border-success [&>svg]:text-success",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})
