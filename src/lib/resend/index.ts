import {getSecret} from "astro:env/server"
import {Resend} from "resend"

// CLIENT **********************************************************************************************************************************
export const resend = new Resend(getSecret("RESEND_API_KEY"))
