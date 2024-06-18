import {WebhookError, validateWebhook, zWebhook} from "@/lib/hashnode/utils"
import {purgeCache} from "@netlify/functions"
import type {APIRoute} from "astro"

// POST *********************************************************************************************************************************
export const POST: APIRoute = async ({request}) => {
  try {
    const payload = await request.json()
    validateWebhook(request.headers.get("x-hashnode-signature"), payload)
    const {id, type} = zWebhook.parse(payload)
    if (type === "post") await purgeCache({tags: ["posts", id]})
    return new Response(JSON.stringify("ok"), {status: 200})
  } catch (error_) {
    console.error(error_)
    if (error_ instanceof WebhookError) return new Response("unauthorized", {status: 401})
    return new Response(JSON.stringify("error"), {status: 500})
  }
}
