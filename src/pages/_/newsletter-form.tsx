import {type NewsletterState, type NewsletterValues} from "@/actions/utils"
import {Toaster} from "@/components/ui/toast"
import {createForm} from "@tanstack/solid-form"
import {actions, getActionProps} from "astro:actions"
import type {JSX} from "solid-js"

export function NewsletterForm(props: {children: JSX.Element; initialState: NewsletterState; defaultValues: NewsletterValues}) {
  const form = createForm<NewsletterValues>(() => ({
    defaultValues: props.defaultValues,
    onSubmit: async ({value, formApi}) => {
      console.log(value)
      // const formData = new FormData(event.target)
      // const state = await actions.subscribeToNewsletter.safe(formData)
      // const {code, description} = getNewsletterMessage(state) ?? {}
      // if (code === "SUCCESS" || code === "CONFLICT") formApi.reset()
      // if (code)
      // code === "SUCCESS"
      // ? showToast({title: "Succès", description, variant: "success"})
      // : showToast({title: "Erreur", description, variant: "destructive"})
    },
  }))

  return (
    <form
      method="post"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <input {...getActionProps(actions.subscribeToNewsletter)} />
      <form.Field
        name="email"
        children={(field) => (
          <>
            <label for={field().name}>Last Name:</label>
            <input
              id={field().name}
              name={field().name}
              value={field().state.value}
              onBlur={field().handleBlur}
              onInput={(e) => field().handleChange(e.target.value)}
            />
            <>
              {field().state.meta.touchedErrors ? <em>{field().state.meta.touchedErrors}</em> : null}
              {field().state.meta.isValidating ? "Validating..." : null}
            </>
          </>
        )}
      />
      <form.Subscribe
        selector={(state) => ({
          canSubmit: state.canSubmit,
          isSubmitting: state.isSubmitting,
        })}
        children={(state) => {
          return (
            <button type="submit" disabled={!state().canSubmit}>
              {state().isSubmitting ? "..." : "Submit"}
            </button>
          )
        }}
      />
      {props.children}
      <Toaster />
    </form>
  )
}

// "use client"

// import {getNewsletterMessage, rhfErrorsFromAstro, zNewsletterValues, type NewsletterState, type NewsletterValues} from "@/actions/utils"
// import {Submit} from "@/components/submit"
// import {Button} from "@/components/ui/button/button"
// import {Form, FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form"
// import {Input} from "@/components/ui/input"
// import {Toaster} from "@/components/ui/sonner"
// import {experimental_withState} from "@astrojs/react/actions"
// import {zodResolver} from "@hookform/resolvers/zod"
// import {actions} from "astro:actions"
// import {useActionState, useEffect, useMemo, type ReactNode} from "react"
// import {useForm} from "react-hook-form"
// import {toast} from "sonner"

// // ROOT ************************************************************************************************************************************
// export default function NewsletterForm({children, defaultValues, initialState}: NewsletterFormProps) {
//   const [state, action, pending] = useActionState(experimental_withState(actions.subscribeToNewsletter.safe), initialState)

//   const form = useForm<NewsletterValues>({
//     mode: "onTouched",
//     resolver: zodResolver(zNewsletterValues),
//     defaultValues,
//     errors: useMemo(() => rhfErrorsFromAstro(state.error), [state]),
//   })
//   const {control, formState, handleSubmit, reset} = form

//   useEffect(() => {
//     const {code, description} = getNewsletterMessage(state) ?? {}
//     if (code === "SUCCESS" || code === "CONFLICT") reset()
//     if (code) code === "SUCCESS" ? toast.success("Succès", {description}) : toast.error("Erreur", {description})
//   }, [reset, state])

//   return (
//     <Form {...form}>
//       <form action={action} onSubmit={formState.isValid ? undefined : handleSubmit(() => {})} className="flex flex-col gap-8">
//         <FormField
//           control={control}
//           name="email"
//           render={({field}) => (
//             <FormItem>
//               <div className="flex w-full items-center">
//                 <FormControl>
//                   <div className="group relative flex w-full items-center">
//                     <span className="i-mdi-envelope absolute left-2.5 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       placeholder="Votre courriel..."
//                       {...field}
//                       className="rounded-r-none pl-9 group-aria-[invalid=true]:border-destructive group-aria-[invalid=true]:ring-destructive"
//                     />
//                   </div>
//                 </FormControl>
//                 <Submit pending={pending} label="Je m'inscris" icon="i-mdi-register" className="rounded-l-none" />
//               </div>
//               <FormDescription>
//                 La protection de vos données est
//                 <Button asChild variant="link" className="h-auto px-1 py-0">
//                   <a href="/mentions-legales">ma priorité.</a>
//                 </Button>
//               </FormDescription>
//               <FormMessage></FormMessage>
//             </FormItem>
//           )}
//         />
//       </form>
//       {children}
//       <Toaster richColors />
//     </Form>
//   )
// }

// export type NewsletterFormProps = {children?: ReactNode; defaultValues: NewsletterValues; initialState: NewsletterState}
