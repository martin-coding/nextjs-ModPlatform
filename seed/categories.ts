import { Prisma } from "@/generated/prisma/client"

export const categoryData: Prisma.CategoryCreateInput[] = [
  {
    name: "Armor",
    slug: "armor",
    game: {
      connect: {
        slug: "skyrim-special-edition",
      },
    },
  },
  {
    name: "Weapons",
    slug: "weapons",
    game: {
      connect: {
        slug: "skyrim-special-edition",
      },
    },
  },
  {
    name: "Animations",
    slug: "animations",
    game: {
      connect: {
        slug: "skyrim-special-edition",
      },
    },
  },
  {
    name: "Models and Textures",
    slug: "models-textures",
    game: {
      connect: {
        slug: "skyrim-special-edition",
      },
    },
  },
  {
    name: "User Interface",
    slug: "user-interface",
    game: {
      connect: {
        slug: "skyrim-special-edition",
      },
    },
  },
  {
    name: "Modders Resources",
    slug: "modders-resources",
    game: {
      connect: {
        slug: "skyrim-special-edition",
      },
    },
  },
  {
    name: "Storage",
    slug: "storage",
    game: {
      connect: {
        slug: "minecraft",
      },
    },
  },
  {
    name: "Technology",
    slug: "technology",
    game: {
      connect: {
        slug: "minecraft",
      },
    },
  },
  {
    name: "Modders Resources",
    slug: "modders-resources",
    game: {
      connect: {
        slug: "skyrim",
      },
    },
  },
  {
    name: "Gameplay",
    slug: "gameplay",
    game: {
      connect: {
        slug: "cyberpunk-2077",
      },
    },
  },
  {
    name: "Outfits",
    slug: "outfits",
    game: {
      connect: {
        slug: "cyberpunk-2077",
      },
    },
  },
  {
    name: "Vehicles",
    slug: "vehicles",
    game: {
      connect: {
        slug: "cyberpunk-2077",
      },
    },
  },
  {
    name: "Weapons",
    slug: "weapons",
    game: {
      connect: {
        slug: "cyberpunk-2077",
      },
    },
  },
  {
    name: "Character",
    slug: "character",
    game: {
      connect: {
        slug: "baldurs-gate-3",
      },
    },
  },
  {
    name: "Photo Mode",
    slug: "photomode",
    game: {
      connect: {
        slug: "baldurs-gate-3",
      },
    },
  },
  {
    name: "Armor",
    slug: "armor",
    game: {
      connect: {
        slug: "elden-ring",
      },
    },
  },
  {
    name: "Character",
    slug: "character",
    game: {
      connect: {
        slug: "elden-ring",
      },
    },
  },
  {
    name: "Weapons",
    slug: "weapons",
    game: {
      connect: {
        slug: "elden-ring",
      },
    },
  },
  {
    name: "Outfits",
    slug: "outfits",
    game: {
      connect: {
        slug: "sims-4",
      },
    },
  },
  {
    name: "Furniture",
    slug: "furniture",
    game: {
      connect: {
        slug: "sims-4",
      },
    },
  },
  {
    name: "Crafting",
    slug: "crafting",
    game: {
      connect: {
        slug: "fallout-4",
      },
    },
  },
  {
    name: "Graphics",
    slug: "graphics",
    game: {
      connect: {
        slug: "the-witcher-3",
      },
    },
  },
  {
    name: "Gameplay",
    slug: "gameplay",
    game: {
      connect: {
        slug: "the-witcher-3",
      },
    },
  },
  {
    name: "Characters",
    slug: "characters",
    game: {
      connect: {
        slug: "the-witcher-3",
      },
    },
  },
  {
    name: "User Interface",
    slug: "user-interface",
    game: {
      connect: {
        slug: "starfield",
      },
    },
  },
]
