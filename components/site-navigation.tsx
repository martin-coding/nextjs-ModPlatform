"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { GameItem } from "@/components/game-item"
import { GamepadIcon } from "lucide-react"

const bookmarked_games: {
  id: string
  title: string
  href: string
  icon: string
}[] = []

export function SiteNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Browse</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex w-2xl gap-6 p-2">
              <div>
                <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                  Browse
                </h4>
                <ul>
                  <ListItem href="/games" title="All Games">
                    Discover mods by game.
                  </ListItem>
                  <ListItem href="/mods" title="All Mods">
                    List of every mod.
                  </ListItem>
                  <ListItem href="/mods" title="Trending Mods">
                    Check out the new mod hits.
                  </ListItem>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                  Bookmarked
                </h4>
                {bookmarked_games.length > 0 ? (
                  <ul className="grid gap-2">
                    {bookmarked_games.map((game) => (
                      <GameItem key={game.id} game={game} />
                    ))}
                  </ul>
                ) : (
                  <Item variant="muted">
                    <ItemMedia variant="icon">
                      <GamepadIcon />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>
                        Bookmarked mod hubs will be displayed here
                      </ItemTitle>
                    </ItemContent>
                  </Item>
                )}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Media</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96">
              <ListItem href="/docs" title="Latest">
                Recent images.
              </ListItem>
              <ListItem href="/docs/installation" title="Trending">
                Trending images.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="My Posts">
                Your journey.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Community</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96">
              <ListItem href="/docs" title="Forum">
                Exchange ideas with the community.
              </ListItem>
              <ListItem href="/docs/installation" title="Wiki">
                Guides on how to use this site and how to install mods for
                games.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Site News">
                Latest news about this website.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href="/docs">Support</Link>}
          />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link href={href}>
            <div className="flex flex-col gap-1 text-sm">
              <div className="leading-none font-medium">{title}</div>
              <div className="line-clamp-2 text-muted-foreground">
                {children}
              </div>
            </div>
          </Link>
        }
      />
    </li>
  )
}
