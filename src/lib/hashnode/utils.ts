import {z} from "astro/zod"
import {getSecret} from "astro:env/server"
import crypto from "crypto"

// CONSTS **********************************************************************************************************************************
const SIGNATURE_VERSION = "1"

// SCHEMAS *********************************************************************************************************************************
const zWebhookPostEventType = z.enum(["post_deleted", "post_published", "post_updated"])
const zWebhookStaticPageEventType = z.enum(["static_page_deleted", "static_page_edited", "static_page_published"])

const zWebhookPostData = z.object({
	eventType: zWebhookPostEventType,
	publication: z.object({
		id: z.string(),
	}),
	post: z.object({
		id: z.string(),
	}),
})

const zWebhookStaticPageData = z.object({
	eventType: zWebhookStaticPageEventType,
	publication: z.object({
		id: z.string(),
	}),
	staticPage: z.object({
		id: z.string(),
	}),
})

export const zWebhook = z
	.object({
		data: zWebhookPostData.or(zWebhookStaticPageData),
		metadata: z.object({uuid: z.string()}),
	})
	.transform(({data}) => ("post" in data ? {type: "post", id: "post-" + data.post.id} : {type: "page", id: "page-" + data.staticPage.id}))

// ERROR ***********************************************************************************************************************************
export class WebhookError extends Error {
	constructor(message: string) {
		super(message)
		this.name = "SignError"
	}
}

// METHODS *********************************************************************************************************************************
export function validateWebhook(header: string | null, payload: unknown) {
	if (!header) throw new WebhookError("Missing signature")

	const parts = header.split(",")
	const headerTimestamp = parts.find((part) => part.startsWith("t="))?.split("=")[1]
	const headerSignature = parts.find((part) => part.startsWith(`v${SIGNATURE_VERSION}=`))?.split("=")[1]

	if (!headerTimestamp || !headerSignature) throw new WebhookError("Invalid signature header")

	const timestamp = parseInt(headerTimestamp, 10)
	const signedPayloadString = `${timestamp}.${payload ? JSON.stringify(payload) : ""}`
	const signature = crypto
		.createHmac("sha256", getSecret("HASHNODE_WEBHOOK_SECRET"))
		.update(signedPayloadString)
		.digest("hex")

	let isValid = false
	try {
		isValid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(headerSignature))
	} catch {}
	if (!isValid) throw new WebhookError("Invalid signature")

	if (Math.abs((Date.now() - timestamp) / 1_000) > 30) throw new WebhookError("Invalid timestamp")
}
