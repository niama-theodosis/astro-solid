import {z} from "astro/zod"
import {PUBLIC_IMGIX_URL} from "astro:env/server"

// RECORD **********************************************************************************************************************************
export const zBaseRecord = z.object({
	collectionId: z.string(),
	collectionName: z.string(),
	created: z.string(),
	id: z.string(),
	updated: z.string(),
})

export type BaseRecord = z.output<typeof zBaseRecord>

// ENUMS ***********************************************************************************************************************************
export const PAYMENTS = ["cash", "check", "creditCard"] as const
export const zPayment = z.enum(PAYMENTS)

export const PLACES = ["faceToFace", "remotely"] as const
export const zPlace = z.enum(PLACES)

// IMAGES **********************************************************************************************************************************
export const zImageRecord = z.object({
	...zBaseRecord.shape,
	alt: z.string(),
	height: z.number(),
	src: z.string(),
	width: z.number(),
})

export const zImage = zImageRecord.transform((dto) => ({...dto, src: `${PUBLIC_IMGIX_URL}/${dto.id}/${dto.src}`}))

export type Image = z.output<typeof zImage>
export type ImageRecord = z.output<typeof zImageRecord>

// CONTACT *********************************************************************************************************************************
export const zContactRecord = z.object({
	...zBaseRecord.shape,
	city: z.string(),
	email: z.string(),
	facebook: z.string(),
	instagram: z.string(),
	lat: z.number(),
	lng: z.number(),
	logo: z.string(),
	name: z.string(),
	phone: z.string(),
	street: z.string(),
	youtube: z.string(),
	zipcode: z.string(),
})

export type Contact = z.output<typeof zContactRecord>
export type ContactRecord = z.output<typeof zContactRecord>

// HOME ************************************************************************************************************************************
export const zHomeRecord = z.object({
	...zBaseRecord.shape,
	about_content: z.string(),
	about_image: z.string(),
	about_title: z.string(),
	hero_content: z.string(),
	hero_image: z.string(),
	hero_title: z.string(),
	last_posts_tagline: z.string(),
	last_posts_title: z.string(),
	newsletter_content: z.string(),
	newsletter_tagline: z.string(),
	newsletter_title: z.string(),
	services_content: z.string(),
	services_tagline: z.string(),
	services_title: z.string(),
})

export const zHome = z
	.object({
		...zHomeRecord.shape,
		expand: z.object({
			about_image: zImage,
			hero_image: zImage,
		}),
	})
	.transform(({expand: {about_image, hero_image}, ...r}) => ({
		about: {content: r.about_content, image: about_image, title: r.about_title},
		hero: {content: r.hero_content, image: hero_image, title: r.hero_title},
		lastPosts: {tagline: r.last_posts_tagline, title: r.last_posts_title},
		newsletter: {content: r.newsletter_content, tagline: r.newsletter_tagline, title: r.newsletter_title},
		services: {content: r.services_content, tagline: r.services_tagline, title: r.services_title},
	}))

export type Home = z.output<typeof zHomeRecord>
export type HomeRecord = z.output<typeof zHomeRecord>

// PAGES ***********************************************************************************************************************************
export const zPageRecord = z.object({
	...zBaseRecord.shape,
	content: z.string(),
	slug: z.string(),
	title: z.string(),
})

export type Page = z.output<typeof zPageRecord>
export type PageRecord = z.output<typeof zPageRecord>

// SERVICES ********************************************************************************************************************************
export const zServiceRecord = z.object({
	...zBaseRecord.shape,
	benefits: z.string(),
	content: z.string(),
	duration: z.string(),
	excerpt: z.string(),
	image: z.string(),
	name: z.string(),
	payments: zPayment.array(),
	places: zPlace.array(),
	price: z.number(),
	proceedings: z.string(),
	reasons: z.string(),
	slug: z.string(),
	zcal: z.string(),
})

export const zService = z
	.object({
		...zServiceRecord.shape,
		expand: z.object({image: zImage}),
	})
	.transform(({expand: {image}, ...r}) => ({
		...r,
		image,
		meetingUri: `/rendez-vous/${r.slug}`,
		uri: `/prestations/${r.slug}`,
		zcalUrl: `https://zcal.co/i/${r.zcal}?embed=1&embedType=iframe`,
	}))

export type Service = z.output<typeof zService>
export type ServiceRecord = z.output<typeof zServiceRecord>
