import {tv} from "tailwind-variants"
import {HEADING} from "../typography"

export {default as CardContent} from "./content.astro"
export {default as CardDescription} from "./description.astro"
export {default as CardFooter} from "./footer.astro"
export {default as CardHeader} from "./header.astro"
export {default as Card} from "./root.astro"
export {default as CardTitle} from "./title.astro"

// STYLES **********************************************************************************************************************************
export const CARD = tv({
  slots: {
    CONTENT: "flex-1 flex flex-col gap-4",
    DESCRIPTION: "text-sm text-muted-foreground",
    FOOTER: "flex items-center gap-1.5",
    HEADER: "flex flex-col gap-1.5",
    ROOT: "flex flex-col gap-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm",
    TITLE: HEADING({level: 3}),
  },
})
export const {CONTENT, DESCRIPTION, FOOTER, HEADER, ROOT, TITLE} = CARD()
