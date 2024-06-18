// import {Slot} from "@radix-ui/react-slot"
// import type {ButtonHTMLAttributes, Ref} from "react"
// import {tv, type VariantProps} from "tailwind-variants"

// // STYLES **********************************************************************************************************************************
// export const BUTTON = tv({
//   base: `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all
//   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
//   disabled:pointer-events-none disabled:opacity-50`,
//   variants: {
//     color: {accent: "", destructive: "", primary: "", secondary: "", success: "", tertiary: ""},
//     size: {
//       default: "h-10 px-4 py-2",
//       hybrid: "h-10 w-10 lg:w-auto lg:px-4 lg:py-2",
//       icon: "h-10 w-10",
//       lg: "h-11 rounded-md px-8 text-base",
//       sm: "h-9 rounded-md px-3",
//     },
//     variant: {default: "", ghost: "", label: "", link: "underline-offset-4 hover:underline"},
//   },
//   defaultVariants: {color: "secondary", size: "default", variant: "default"},
//   compoundVariants: [
//     {color: "destructive", variant: "default", class: "bg-destructive text-destructive-foreground hover:bg-destructive/90"},
//     {color: "primary", variant: "default", class: "bg-primary text-primary-foreground hover:bg-primary/90"},
//     {color: "secondary", variant: "default", class: "bg-secondary text-secondary-foreground hover:bg-secondary/90"},
//     {color: "success", variant: "default", class: "bg-success text-success-foreground hover:bg-success/90"},
//     {color: "tertiary", variant: "default", class: "bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"},
//     {color: "accent", variant: "ghost", class: "hover:bg-accent hover:text-accent-foreground"},
//     {color: "primary", variant: "ghost", class: "hover:bg-primary hover:text-primary-foreground"},
//     {color: "secondary", variant: "ghost", class: "hover:bg-secondary hover:text-secondary-foreground"},
//     {color: "tertiary", variant: "ghost", class: "hover:bg-tertiary hover:text-tertiary-foreground"},
//   ],
// })

// // ROOT ************************************************************************************************************************************
// export const Button = ({className, color, variant, size, asChild = false, ...props}: ButtonProps) => {
//   const Comp = asChild ? Slot : "button"
//   return <Comp className={BUTTON({color, size, variant, className})} {...props} />
// }

// // TYPES ***********************************************************************************************************************************
// export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
//   VariantProps<typeof BUTTON> & {ref?: Ref<HTMLButtonElement>; asChild?: boolean}
