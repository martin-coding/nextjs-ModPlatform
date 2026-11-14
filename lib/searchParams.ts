import {
  parseAsString,
  parseAsInteger,
  parseAsArrayOf,
  createLoader,
} from "nuqs/server"

export const gameSearchParams = {
  query: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  sort: parseAsString.withDefault(""),
}

export const loadGameSearchParams = createLoader(gameSearchParams)

export const modSearchParams = {
  query: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  sort: parseAsString.withDefault(""),
  category: parseAsArrayOf(parseAsString).withDefault([]),
}

export const loadModSearchParams = createLoader(modSearchParams)
