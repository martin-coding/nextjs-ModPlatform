import { prisma } from "@/lib/prisma"
import { gameData } from "@/seed/games"
import { categoryData } from "@/seed/categories"
import { userData } from "@/seed/users"
import { tagData } from "@/seed/tags"
import { ModStatus } from "@/generated/prisma/client"

export async function main() {
  await prisma.game.createMany({
    data: gameData,
  })

  for (const c of categoryData) {
    await prisma.category.create({ data: c })
  }

  await prisma.user.createMany({
    data: userData,
  })

  await prisma.tag.createMany({
    data: tagData,
  })

  const tags = await prisma.tag.findMany()

  for (let i = 1; i <= 45; i++) {
    const gameSlug = "skyrim"
    const categorySlug = "modders-resources"

    const game = await prisma.game.findUnique({
      where: { slug: gameSlug },
    })

    if (!game) {
      throw new Error(`Game not found: ${gameSlug}`)
    }

    const category = await prisma.category.findUnique({
      where: {
        gameId_slug: {
          gameId: game.id,
          slug: categorySlug,
        },
      },
    })

    if (!category) {
      throw new Error(`Category not found: ${categorySlug}`)
    }

    const shuffledTags = [...tags].sort(() => Math.random() - 0.5)
    const selectedTags = shuffledTags.slice(
      0,
      Math.floor(Math.random() * 3) + 2
    )

    await prisma.mod.create({
      data: {
        title: `Test ${i}`,
        slug: `test-${i}`,
        descriptionShort: "Test.",
        status: ModStatus.PUBLISHED,
        user: {
          connect: { username: "testuser" },
        },
        game: {
          connect: { id: game.id },
        },
        category: {
          connect: { id: category.id },
        },
        tags: {
          connect: selectedTags.map((tag) => ({
            id: tag.id,
          })),
        },
      },
    })
  }
}

main()
