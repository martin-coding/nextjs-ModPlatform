import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { buttonVariants } from "@/components/ui/button"

export default async function Page({
  params,
}: {
  params: Promise<{ game: string }>
}) {
  const { game } = await params

  return (
    <main className="flex min-h-[70vh] items-center justify-center p-6">
      <Card className="w-full max-w-xl text-center">
        <CardHeader>
          <CardDescription>Game Page</CardDescription>

          <CardTitle className="text-3xl">{game}</CardTitle>

          <CardDescription>
            This game&apos;s dedicated page isn&apos;t available yet. Features
            such as ongoing events are still being built.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Link
            href={`/games/${game}/mods`}
            className={buttonVariants({ variant: "default", size: "default" })}
          >
            Browse Mods →
          </Link>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Looking for mods? The mod hub is already available.
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}
