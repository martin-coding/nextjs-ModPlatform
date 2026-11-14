"use server"

import { fetchGames } from "@/data/games"

export async function searchGames(query: string) {
  return fetchGames(query)
}
