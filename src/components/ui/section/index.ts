import {tv} from "tailwind-variants"
import {HEADING} from "../typography"

export {default as SectionAside} from "./aside.astro"
export {default as SectionContent} from "./content.astro"
export {default as SectionHeader} from "./header.astro"
export {default as SectionMain} from "./main.astro"
export {default as Section, type Props as SectionProps} from "./root.astro"
export {default as SectionTagline} from "./tagline.astro"
export {default as SectionTitle} from "./title.astro"

// STYLES **********************************************************************************************************************************
export const SECTION = tv({
  slots: {
    ASIDE: `SECTION_ASIDE grid grid-cols-12 col-span-12 
    lg:col-span-5`,
    CONTENT: `SECTION_CONTENT grid container mx-auto space-y-8 grid-cols-12
    lg:space-x-8 lg:space-y-0`,
    HEADER: `SECTION_HEADER flex flex-col gap-4 text-center max-w-2xl mx-auto`,
    MAIN: `SECTION_MAIN flex flex-col gap-8 col-span-12 
    lg:col-span-7 lg:only:col-span-12`,
    ROOT: `SECTION flex flex-col py-16 w-full`,
    TITLE: "SECTION_TITLE",
    TAGLINE: `SECTION_TAGLINE text-gray-600 text-lg`,
  },
  variants: {
    level: {
      1: {TITLE: HEADING({level: 1})},
      2: {TITLE: HEADING({level: 2})},
      3: {TITLE: HEADING({level: 3})},
      4: {TITLE: HEADING({level: 4})},
      5: {TITLE: HEADING({level: 5})},
      6: {TITLE: HEADING({level: 6})},
    },
    variant: {
      default: {ROOT: `bg-white`},
      accent: {ROOT: `bg-accent`},
    },
  },
  defaultVariants: {
    level: 2,
    variant: "accent",
  },
})

export const {ASIDE, CONTENT, HEADER, MAIN, ROOT, TAGLINE, TITLE} = SECTION()
