import "server-only"

import { prisma } from "@/lib/prisma"
import { ModStatus, Prisma } from "@/generated/prisma/client"
import { GameWithStats } from "@/lib/definitions"

// TODO: Remove this specialized case and use the general function
export async function fetchGames(query: string) {
  try {
    return prisma.game.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        iconImage: true,
      },
      take: 10,
      orderBy: {
        name: "asc",
      },
    })
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch game.")
  }
}

export async function fetchFilteredGames(
  query: string,
  currentPage: number,
  sort: string,
  amount: number
) {
  const offset = (currentPage - 1) * amount

  let orderBy: Prisma.Sql

  switch (sort) {
    case "oldest":
      orderBy = Prisma.sql`g.created_at ASC`
      break
    case "newest":
      orderBy = Prisma.sql`g.created_at DESC`
      break
    case "name":
      orderBy = Prisma.sql`g.name ASC`
      break
    case "downloads":
      orderBy = Prisma.sql`"totalDownloads" DESC`
      break
    case "mods":
    default:
      orderBy = Prisma.sql`"modCount" DESC`
      break
  }

  const games = await prisma.$queryRaw<GameWithStats[]>(Prisma.sql`
    SELECT
      g.id,
      g.name,
      g.cover_image as "coverImage",
      g.slug,
      g.created_at as "createdAt",
      COUNT(m.id) AS "modCount",
      COALESCE(SUM(m.unique_downloads), 0) AS "totalDownloads"
    FROM game g
    LEFT JOIN mod m
      ON m.game_id = g.id
      AND m.status = 'PUBLISHED'
    WHERE g.name ILIKE ${`%${query}%`}
    GROUP BY g.id
    ORDER BY ${orderBy}
    LIMIT ${amount}
    OFFSET ${offset}
  `)

  const totalCount = await prisma.game.count({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  })

  return {
    games,
    totalPages: Math.ceil(totalCount / amount),
  }
}

export async function fetchGameBySlug(gameSlug: string) {
  try {
    const [game, downloads] = await prisma.$transaction([
      prisma.game.findUnique({
        where: { slug: gameSlug },
        select: {
          id: true,
          name: true,
          coverImage: true,
          heroImage: true,
          slug: true,
          _count: {
            select: {
              mods: {
                where: {
                  status: ModStatus.PUBLISHED,
                },
              },
            },
          },
        },
      }),

      prisma.mod.aggregate({
        where: {
          game: { slug: gameSlug },
          status: ModStatus.PUBLISHED,
        },
        _sum: {
          uniqueDownloads: true,
        },
      }),
    ])

    if (!game) return null

    return {
      ...game,
      totalDownloads: downloads._sum.uniqueDownloads ?? 0,
    }
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch game details.")
  }
}

export async function fetchGameById(gameId: string) {
  try {
    const game = prisma.game.findUnique({
      where: { id: gameId },
    })

    if (!game) return null

    return game
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch game.")
  }
}

export async function fetchGameCategories(gameId: string) {
  try {
    const categories = await prisma.category.findMany({
      where: {
        gameId,
      },
      orderBy: {
        name: "asc",
      },
    })

    return categories
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch categories for game.")
  }
}
