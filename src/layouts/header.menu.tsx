import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  type NavigationMenuProps,
} from "@/components/ui/navigation-menu"
import {For, Show} from "solid-js"
import type {Nav} from "./header.astro"

// MAIN ************************************************************************************************************************************
export const Menu = ({navs, ...props}: MenuProps) => (
  <NavigationMenu {...props}>
    <For each={navs}>
      {({href, items, label}) => (
        <Show
          when={items}
          fallback={
            <NavigationMenuTrigger as="a" href={href}>
              {label}
            </NavigationMenuTrigger>
          }
        >
          <NavigationMenuItem>
            <NavigationMenuTrigger class="lg:text-base">{label}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[900px]">
                <For each={items}>
                  {({href, image, label, text}) => (
                    <li>
                      <NavigationMenuLink
                        href={href}
                        class="flex select-none items-center gap-2 space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <img src={image.src} alt={image.alt} height={64} width={64} class="rounded-md object-cover" />
                        <div class="space-y-2">
                          <div class="font-heading text-sm font-bold leading-none">{label}</div>
                          <p class="line-clamp-3 text-sm leading-snug text-muted-foreground">{text}</p>
                        </div>
                      </NavigationMenuLink>
                    </li>
                  )}
                </For>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </Show>
      )}
    </For>
  </NavigationMenu>
)

// TYPES ***********************************************************************************************************************************
export type MenuProps = NavigationMenuProps & {navs: Nav[]}
