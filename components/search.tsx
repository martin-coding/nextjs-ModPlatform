"use client"

import { useTransition } from "react"
import { useQueryState, debounce } from "nuqs"
import { SearchIcon } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import { gameSearchParams } from "@/lib/searchParams"

export function Search() {
  const [isLoading, startTransition] = useTransition()

  const [query, setQuery] = useQueryState(
    "query",
    gameSearchParams.query.withOptions({
      shallow: false,
      startTransition,
    })
  )

  return (
    <InputGroup>
      <InputGroupInput
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          startTransition(async () => {
            await setQuery(e.target.value, {
              limitUrlUpdates: e.target.value ? debounce(300) : undefined,
            })
          })
        }}
      />

      <InputGroupAddon>
        <SearchIcon className="text-muted-foreground" />
      </InputGroupAddon>

      <InputGroupAddon align="inline-end">
        {isLoading && <Spinner />}
      </InputGroupAddon>
    </InputGroup>
  )
}
