import "server-only"

import { prisma } from "@/lib/prisma"

export async function fetchTags() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: {
        name: "asc",
      },
    })

    return tags
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch tags.")
  }
}
