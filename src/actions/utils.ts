import {actions, isInputError, type ActionError, type ErrorInferenceObject, type SafeResult} from "astro:actions"
// import type { FieldErrors, FieldValues } from "react-hook-form"
import {z} from "astro/zod"

// CONTACT *********************************************************************************************************************************
export const zContactValues = z.object({
	email: z.string({message: "Ce champ est requis"}).trim().min(1, "Ce champ est requis").email("Ce courriel est invalide"),
	forename: z.string({message: "Ce champ est requis"}).trim().min(1, "Ce champ est requis"),
	message: z.string({message: "Ce champ est requis"}).trim().min(1, "Ce champ est requis"),
	surname: z.string({message: "Ce champ est requis"}).trim().min(1, "Ce champ est requis"),
})
export type ContactValues = z.infer<typeof zContactValues>
export type ContactState = Awaited<ReturnType<typeof actions.sendEmail.safe>>

export const getContactMessage = getMessageFor({
	INTERNAL_SERVER_ERROR: "Veuillez réessayer ultérieurement.",
	SUCCESS: "Votre message a été envoyé avec succès.",
})

// NEWSLETTER ******************************************************************************************************************************
export const zNewsletterValues = z.object({
	email: z.string({message: "Ce champ est requis"}).trim().min(1, "Ce champ est requis").email("Ce courriel est invalide"),
})
export type NewsletterValues = z.infer<typeof zNewsletterValues>
export type NewsletterState = Awaited<ReturnType<typeof actions.subscribeToNewsletter.safe>>

export const getNewsletterMessage = getMessageFor({
	CONFLICT: "Vous êtes déjà inscrit·e.",
	INTERNAL_SERVER_ERROR: "Veuillez réessayer ultérieurement.",
	SUCCESS: "Veuillez valider votre inscription dans le courriel reçu.",
})

// UTILS ***********************************************************************************************************************************
export function getMessageFor(i18n: MessageI18n) {
	const descriptions = new Map(Object.entries(i18n))
	return <D>(state: State<D>): Message | undefined => {
		if (!!state.data) return {code: "SUCCESS", description: i18n.SUCCESS}
		if (state.error && !isInputError(state.error))
			return {
				code: state.error.code,
				description: descriptions.get(state.error.code)!,
			}
	}
}

export function getValuesFor<V extends Record<string, unknown>, D>({actionName, defaultValues, shouldSkip}: GetValuesForParams<V, D>) {
	return async (request: Request, state: State<D>) => {
		if (request.method !== "POST" || (shouldSkip?.(state) ?? false)) return defaultValues
		const formData = await request.clone().formData()
		formData.delete("_astroAction")
		formData.delete("_astroActionSafe")
		formData.delete("_astroActionState")
		formData.delete("$ACTION_KEY")
		formData.delete(`/_actions/${actionName}`)
		return Object.fromEntries(formData.entries()) as V
	}
}

// export function rhfErrorsFromAstro<T extends FieldValues = FieldValues>(error?: ActionError) {
// 	if (!error) return
// 	if (!isInputError(error)) return {root: {type: error.code}} as FieldErrors<T>
// 	return Object.fromEntries(Object.entries(error.fields).map(([name, errors]) => [name, {message: errors?.[0]}])) as FieldErrors<T>
// }

// TYPES ***********************************************************************************************************************************
export type MessageI18n = {SUCCESS: string} & {
	[key in ActionError["code"]]?: string
}
export type Message = {
	code: ActionError["code"] | "SUCCESS"
	description: string
}

export type GetValuesForParams<V extends Record<string, unknown>, D> = {
	actionName: string
	defaultValues: V
	shouldSkip?: (state: State<D>) => boolean
}

export type State<D = any> = SafeResult<ErrorInferenceObject, D>
