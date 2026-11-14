import "server-only"

import { prisma } from "@/lib/prisma"
import { ModStatus, Prisma } from "@/generated/prisma/client"
import { cache } from "react"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const ITEMS_PER_PAGE = 15

const modCardInclude = {
  game: true,
  user: {
    select: {
      username: true,
      displayUsername: true,
    },
  },
  category: true,
  images: {
    where: {
      position: 0,
    },
    select: {
      storageKey: true,
    },
    take: 1,
  },
} satisfies Prisma.ModInclude

export type ModCardMod = Prisma.ModGetPayload<{
  include: typeof modCardInclude
}>

export async function fetchFilteredMods(
  query: string,
  currentPage: number,
  filterCategories: string[],
  sort: string,
  gameId: string
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  let orderBy: Prisma.ModOrderByWithRelationInput

  switch (sort) {
    case "updated":
      orderBy = { updatedAt: "desc" }
      break
    case "added":
      orderBy = { createdAt: "desc" }
      break
    case "likes":
      orderBy = { likesCount: "desc" }
      break
    case "downloads":
      orderBy = { uniqueDownloads: "desc" }
      break
    case "name":
    default:
      orderBy = { title: "asc" }
  }

  // reuse same where so page count matches filters
  const where = {
    gameId,
    status: ModStatus.PUBLISHED,
    AND: [
      {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive" as const,
            },
          },
          {
            user: {
              username: {
                contains: query,
                mode: "insensitive" as const,
              },
            },
          },
        ],
      },
      ...(filterCategories.length > 0
        ? [
            {
              category: {
                slug: {
                  in: filterCategories,
                },
              },
            },
          ]
        : []),
    ],
  }

  try {
    const mods = await prisma.mod.findMany({
      where,
      orderBy,
      skip: offset,
      take: ITEMS_PER_PAGE,
      include: modCardInclude,
    })

    const count = await prisma.mod.count({
      where,
    })

    return {
      mods,
      totalPages: Math.ceil(count / ITEMS_PER_PAGE),
    }
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch mods.")
  }
}

export const fetchModById = cache(async (id: string) => {
  try {
    const mod = await prisma.mod.findUnique({
      where: {
        id,
      },
      select: {
        game: {
          select: {
            slug: true,
          },
        },
        slug: true,
      },
    })

    return mod
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch mod.")
  }
})

export const fetchModBySlug = cache(async (slug: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const mod = await prisma.mod.findUnique({
      where: {
        slug,
      },
      include: {
        game: {
          select: {
            slug: true,
            name: true,
            backgroundImage: true,
          },
        },
        category: {
          select: {
            slug: true,
            name: true,
          },
        },
        user: {
          select: {
            displayUsername: true,
            username: true,
          },
        },
        versions: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
        images: {
          select: {
            id: true,
            storageKey: true,
          },
          orderBy: {
            position: "asc",
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
        likes: session?.user?.id
          ? {
              where: {
                userId: session.user.id,
              },
              select: {
                id: true,
              },
            }
          : false,
      },
    })

    if (
      mod?.status !== ModStatus.PUBLISHED &&
      mod?.userId !== session?.user.id
    ) {
      return null
    }

    return mod
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch mod.")
  }
})

export type ModWithRelations = NonNullable<
  Awaited<ReturnType<typeof fetchModBySlug>>
>

export const fetchVersionsByModSlug = cache(async (modSlug: string) => {
  try {
    const versions = await prisma.modVersion.findMany({
      where: { mod: { slug: modSlug }, status: ModStatus.PUBLISHED },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        files: true,
      },
    })

    const result = versions.map((version) => ({
      ...version,
      totalDownloads: version.files.reduce(
        (sum, file) => sum + file.downloadCount,
        0
      ),
    }))

    return result
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch versions.")
  }
})
