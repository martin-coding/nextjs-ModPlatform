import { Prisma } from "@/generated/prisma/client"

export const userData: Prisma.UserCreateManyInput[] = [
  {
    id: "1",
    username: "testuser",
    displayUsername: "TestUser",
    name: "Test User",
    email: "testuser@example.com",
  },
]
