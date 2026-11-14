import { Breadcrumbs } from "@/components/breadcrumbs"
import { fetchGameBySlug, fetchGameCategories } from "@/data/games"
import { fetchFilteredMods } from "@/data/mods/search"
import { formatCompactNumber, getImageUrl } from "@/lib/utils"
import { loadModSearchParams } from "@/lib/searchParams"
import { notFound } from "next/navigation"
import type { SearchParams } from "nuqs/server"
import FilterSidebar from "@/components/filter-sidebar"
import Image from "next/image"
import { PaginationControls } from "@/components/pagination-controls"
import { Search } from "@/components/search"
import { SortSelect } from "@/components/sort-select"
import { ModCard } from "@/components/mod-card"
import { fetchTags } from "@/data/tags"

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ game: string }>
  searchParams: Promise<SearchParams>
}) {
  const { game } = await params
  const gameObject = await fetchGameBySlug(game)
  if (!gameObject) notFound()

  const { query, page, category, sort } =
    await loadModSearchParams(searchParams)

  const gameCategories = await fetchGameCategories(gameObject.id)
  const { mods, totalPages } = await fetchFilteredMods(
    query,
    page,
    category,
    sort,
    gameObject.id
  )

  const tagList = await fetchTags()

  const imageSrc = getImageUrl(gameObject.coverImage)

  return (
    <section className="px-6 py-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Games", href: "/games" },
          { label: gameObject.name, href: `/games/${gameObject.slug}` },
          { label: "Mods", href: "" },
        ]}
      />

      {/* This is the title */}
      <div className="mb-6 flex flex-row items-center gap-8 pt-6 pb-6">
        <div className="hidden h-28 shrink-0 sm:block">
          <Image
            src={imageSrc}
            width={400}
            height={600}
            alt="Game image"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between">
          <h1 className="flex items-center gap-3 text-2xl font-semibold sm:text-3xl md:text-4xl">
            {gameObject.name} Mods
          </h1>

          <p className="mt-2 text-sm sm:mt-3 sm:text-base">
            Mods: {formatCompactNumber(gameObject._count.mods)} • Downloads:{" "}
            {formatCompactNumber(gameObject.totalDownloads)}
          </p>
        </div>
      </div>

      {/* Main Mod Browsing */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Filter Sidebar */}
        <FilterSidebar categories={gameCategories} tags={tagList} />

        {/* Content Right */}
        <div className="flex w-full flex-col gap-8">
          {/* Top Controls */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <Search />

            <SortSelect
              options={[
                { label: "Name", value: "name" },
                { label: "Downloads", value: "downloads" },
                { label: "Likes", value: "likes" },
                { label: "Last Added", value: "added" },
                { label: "Last Updated", value: "updated" },
              ]}
              defaultValue="name"
            />
          </div>

          {/* Main Mod Tile Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {mods?.map((mod) => (
              <ModCard key={mod.id} mod={mod} />
            ))}
          </div>

          {/* Pagination */}
          <div className="text-center">
            <PaginationControls totalPages={totalPages} />
          </div>
        </div>
      </div>
    </section>
  )
}
