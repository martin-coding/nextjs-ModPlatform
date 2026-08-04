import { SearchIcon } from "lucide-react"

import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <Field className="max-w-lg">
      <FieldLabel htmlFor="search" className="sr-only">
        Search
      </FieldLabel>
      <InputGroup>
        <InputGroupInput id="search" placeholder={placeholder} />
        <InputGroupAddon align="inline-start">
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
