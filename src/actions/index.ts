import {subscribeToNewsletter} from "@/lib/hashnode"
import {ActionError, defineAction} from "astro:actions"
import {zContactValues, zNewsletterValues} from "./utils"

// ACTIONS *********************************************************************************************************************************
export const server = {
  sendEmail: defineAction({
    accept: "form",
    input: zContactValues,
    handler: async ({email, forename, message, surname}) => {
      // const {error} = await resend.emails.send({
      //   from: "contact@theodosis.fr",
      //   to: "niama.theodosis@gmail.com",
      //   subject: "Formulaire de contact",
      //   html: `<dl><dt>Nom :</dt><dd>${forename} ${surname}</dd><dt>Courriel :</dt><dd>${email}</dd><dt>Message :</dt><dd>${message}</dd></dl>`,
      // })
      // if (error) throw new ActionError({code: "INTERNAL_SERVER_ERROR"})
      return true
    },
  }),
  subscribeToNewsletter: defineAction({
    accept: "form",
    input: zNewsletterValues,
    handler: async (values) => {
      const code = await subscribeToNewsletter(values.email)
      if (code !== "SUCCESS") throw new ActionError({code})
      return true
    },
  }),
}
