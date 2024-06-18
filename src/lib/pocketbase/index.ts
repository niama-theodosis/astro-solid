import {PUBLIC_POCKETBASE_URL} from "astro:env/server"
import PocketBase from "pocketbase"
import {zContactRecord, zHome, zPageRecord, zService, zServiceRecord} from "./schemas"

// INIT ************************************************************************************************************************************
const SINGLETON = "fedcba987654321"
export const pb = new PocketBase(PUBLIC_POCKETBASE_URL)
pb.autoCancellation(false)

// CONTACT *********************************************************************************************************************************
export const fetchContact = async () => {
  const record = await pb.collection("contact").getOne(SINGLETON)
  return zContactRecord.parse(record)
}

// HOME ************************************************************************************************************************************
export const fetchHome = async () => {
  const record = await pb.collection("home").getOne(SINGLETON, {expand: "about_image,hero_image"})
  return zHome.parse(record)
}

// PAGES ***********************************************************************************************************************************
export const fetchPage = async (slug: string) => {
  try {
    const record = await pb.collection("pages").getFirstListItem(`slug="${slug}"`)
    return zPageRecord.parse(record)
  } catch {}
}

// SERVICES ********************************************************************************************************************************
export const fetchService = async (slug: string) => {
  try {
    const record = await pb.collection("services").getFirstListItem(`slug="${slug}"`, {expand: "image"})
    return zService.parse(record)
  } catch {}
}

export const fetchServices = async () => {
  const records = await pb.collection("services").getFullList({expand: "image", sort: "+name"})
  return zService.array().parse(records)
}

export const fetchOtherServices = async (slug: string) => {
  const records = await pb.collection("services").getFullList({expand: "image", filter: `slug!="${slug}"`, sort: "+name"})
  return zService.array().parse(records)
}

export const fetchServiceSlugs = async () => {
  const records = await pb.collection("services").getFullList({fields: "slug"})
  return zServiceRecord.pick({slug: true}).array().parse(records)
}
