import { Prisma } from "@/generated/prisma/client"

export type SignupState = {
  errors:
    | {
        name?:
          | {
              errors: string[]
            }
          | undefined
        email?:
          | {
              errors: string[]
            }
          | undefined
        username?:
          | {
              errors: string[]
            }
          | undefined
        password?:
          | {
              errors: string[]
            }
          | undefined
        confirmPassword?:
          | {
              errors: string[]
            }
          | undefined
        general?:
          | {
              errors: string[]
            }
          | undefined
      }
    | undefined
  values: {
    name: string
    email: string
    username: string
    password: string
    confirmPassword: string
  }
}

export type GameWithStats = {
  id: string
  name: string
  coverImage: string
  slug: string
  createdAt: Date

  modCount: bigint
  totalDownloads: bigint
}

export type ModCardMod = Prisma.ModGetPayload<{
  include: {
    game: true
    user: {
      select: {
        username: true
        displayUsername: true
      }
    }
    category: true
    images: {
      where: { position: 0 }
      select: { storageKey: true }
      take: 1
    }
  }
}>
