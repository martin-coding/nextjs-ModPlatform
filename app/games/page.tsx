import { Breadcrumbs } from "@/components/breadcrumbs"
import GameCard from "@/components/game-card"
import { PaginationControls } from "@/components/pagination-controls"
import { Search } from "@/components/search"
import { SortSelect } from "@/components/sort-select"
import { fetchFilteredGames } from "@/data/games"
import { loadGameSearchParams } from "@/lib/searchParams"
import type { SearchParams } from "nuqs/server"

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function GamesPage({ searchParams }: PageProps) {
  const { query, sort, page } = await loadGameSearchParams(searchParams)

  const { games, totalPages } = await fetchFilteredGames(query, page, sort, 14)

  return (
    <section className="flex flex-col gap-8 px-6 py-6 text-center">
      <Breadcrumbs breadcrumbs={[{ label: "Games", href: "" }]} />

      <h1 className="pt-8 pb-8 text-4xl font-semibold">
        Discover mods for your favorite games
      </h1>

      <div className="flex flex-row items-center gap-8">
        <Search />

        <SortSelect
          options={[
            { label: "Mods", value: "mods" },
            { label: "Downloads", value: "downloads" },
            { label: "Name", value: "name" },
            { label: "Newest", value: "newest" },
            { label: "Oldest", value: "oldest" },
          ]}
          defaultValue="mods"
        />
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7">
        {games?.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <PaginationControls totalPages={totalPages} />
    </section>
  )
}
