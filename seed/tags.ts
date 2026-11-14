import { Prisma } from "@/generated/prisma/client"

export const tagData: Prisma.TagCreateManyInput[] = [
  { name: "Textures", slug: "textures" },
  { name: "Gameplay", slug: "gameplay" },
  { name: "Graphics", slug: "graphics" },
  { name: "Immersion", slug: "immersion" },
  { name: "Weapons", slug: "weapons" },
  { name: "Armor", slug: "armor" },
  { name: "UI", slug: "ui" },
  { name: "Performance", slug: "performance" },
  { name: "Bug Fixes", slug: "bug-fixes" },
  { name: "Utilities", slug: "utilities" },
]
