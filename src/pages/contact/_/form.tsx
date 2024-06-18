// "use client"

// import {getContactMessage, rhfErrorsFromAstro, zContactValues, type ContactState, type ContactValues} from "@/actions/utils"
// import {Submit} from "@/components/submit"
// import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
// import {Input} from "@/components/ui/input"
// import {Toaster} from "@/components/ui/sonner"
// import {Textarea} from "@/components/ui/textarea"
// import {experimental_withState} from "@astrojs/react/actions"
// import {zodResolver} from "@hookform/resolvers/zod"
// import {actions} from "astro:actions"
// import {useActionState, useEffect, useMemo, type ReactNode} from "react"
// import {useForm} from "react-hook-form"
// import {toast} from "sonner"

// // ROOT ************************************************************************************************************************************
// export default function ContactForm({children, defaultValues, initialState}: ContactFormProps) {
//   const [state, action, pending] = useActionState(experimental_withState(actions.sendEmail.safe), initialState)

//   const form = useForm<ContactValues>({
//     mode: "onTouched",
//     resolver: zodResolver(zContactValues),
//     defaultValues,
//     errors: useMemo(() => rhfErrorsFromAstro(state.error), [state]),
//   })
//   const {control, formState, handleSubmit, reset} = form

//   useEffect(() => {
//     const {code, description} = getContactMessage(state) ?? {}
//     if (code === "SUCCESS") reset()
//     if (code) code === "SUCCESS" ? toast.success("Succès", {description}) : toast.error("Erreur", {description})
//   }, [reset, state])

//   return (
//     <Form {...form}>
//       <form action={action} onSubmit={formState.isValid ? undefined : handleSubmit(() => {})} className="flex flex-col gap-8">
//         <div className="flex flex-col gap-8 md:flex-row">
//           <FormField
//             control={control}
//             name="forename"
//             render={({field}) => (
//               <FormItem className="flex-1">
//                 <FormLabel>Prénom</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Votre prénom..." {...field} />
//                 </FormControl>
//                 <FormMessage></FormMessage>
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={control}
//             name="surname"
//             render={({field}) => (
//               <FormItem className="flex-1">
//                 <FormLabel>Nom</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Votre nom..." {...field} />
//                 </FormControl>
//                 <FormMessage></FormMessage>
//               </FormItem>
//             )}
//           />
//         </div>
//         <FormField
//           control={control}
//           name="email"
//           render={({field}) => (
//             <FormItem>
//               <FormLabel>Votre courriel</FormLabel>
//               <FormControl>
//                 <Input placeholder="Votre courriel..." {...field} />
//               </FormControl>
//               <FormMessage></FormMessage>
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={control}
//           name="message"
//           render={({field}) => (
//             <FormItem>
//               <FormLabel>Votre message</FormLabel>
//               <FormControl>
//                 <Textarea placeholder="Votre message..." {...field} rows={8} />
//               </FormControl>
//               <FormMessage></FormMessage>
//             </FormItem>
//           )}
//         />
//         <Submit pending={pending} label="Envoyer" icon="i-lucide-send" className="self-end text-base" />
//       </form>
//       <Toaster richColors />
//       {children}
//     </Form>
//   )
// }
// export type ContactFormProps = {children?: ReactNode; defaultValues: ContactValues; initialState: ContactState}
