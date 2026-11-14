"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Item, ItemContent, ItemTitle } from "@/components/ui/item"
import { ShareIcon, InfoIcon } from "lucide-react"
import Image from "next/image"
import { searchGames } from "@/actions/games"
import { useEffect, useState } from "react"

export function UploadDialog() {
  const [games, setGames] = useState<
    {
      id: string
      name: string
      iconImage: string | null
    }[]
  >([])

  const [gameSearch, setGameSearch] = useState("")

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (gameSearch.trim().length < 2) {
        setGames([])
        return
      }

      const results = await searchGames(gameSearch)
      setGames(results)
    }, 300)

    return () => clearTimeout(timeout)
  }, [gameSearch])

  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <Button variant="outline">
              <ShareIcon />
              Upload
            </Button>
          }
        />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create your draft mod</DialogTitle>
            <DialogDescription>
              You can edit details on the next step before publishing and after.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="mod-name">Name</FieldLabel>
              <Input id="mod-name" name="name" />
            </Field>
            <Field>
              <FieldLabel htmlFor="mod-slug">Slug</FieldLabel>
              <InputGroup>
                <InputGroupInput id="mod-slug" />
                <InputGroupAddon>
                  <InputGroupText>/mods/</InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button variant="ghost" size="icon">
                          <InfoIcon />
                        </Button>
                      }
                    ></PopoverTrigger>
                    <PopoverContent className="w-80 text-sm" align="end">
                      <div className="space-y-2">
                        <h4 className="font-medium">What is a URL slug?</h4>

                        <p className="text-muted-foreground">
                          A URL slug is the unique part of your mods&apos;s web
                          address.
                        </p>

                        <div className="rounded-md bg-muted p-2 font-mono text-xs">
                          /games/skyrim/mods/
                          <span className="font-bold">better-ui</span>
                        </div>

                        <p className="text-muted-foreground">
                          Choose a short, descriptive slug using lowercase
                          letters, numbers, and hyphens (<code>-</code>). Avoid
                          spaces and special characters. Once your mod is
                          published, changing the slug may break existing links.
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="mod-game">Game</FieldLabel>

              <Combobox
                id="mod-game"
                items={games}
                onInputValueChange={setGameSearch}
              >
                <ComboboxInput placeholder="Search for a game..." />

                <ComboboxContent>
                  <ComboboxEmpty>
                    {gameSearch.length < 2
                      ? "Type at least 2 characters."
                      : "No games found."}
                  </ComboboxEmpty>

                  <ComboboxList>
                    {(game) => (
                      <ComboboxItem key={game.id} value={game.name}>
                        <Item size="xs" className="p-0">
                          <ItemContent className="flex flex-row items-center">
                            <Image
                              src={game?.iconImage ?? "/36x36.png"}
                              alt={game.name}
                              width={36}
                              height={36}
                              className="rounded-md object-cover"
                            />

                            <ItemTitle className="ml-4 whitespace-nowrap">
                              {game.name}
                            </ItemTitle>
                          </ItemContent>
                        </Item>
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Create draft</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
