import type {Service} from "./schemas"

// SERVICES ********************************************************************************************************************************
export function getServiceColor(slug?: Service["slug"]) {
	return isPrimaryService(slug) ? "primary" : "secondary"
}

export function getServicePrice(price: Service["price"]) {
	return Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(price)
}

export function getServicesZcalUrl() {
	return "https://zcal.co/emb/theodosis?embed=1&embedType=iframe"
}

export function isPrimaryService(slug?: Service["slug"]) {
	return slug === "alchimie-cellulaire"
}
