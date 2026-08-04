import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

export function GameItem({
  game,
}: {
  game: { href: string; icon: string; title: string }
}) {
  return (
    <li className="group relative">
      <Link
        href={game.href}
        className="flex items-center gap-3 rounded-md p-2 pr-16 transition-colors hover:bg-accent"
      >
        <Image
          src={game.icon}
          alt={game.title}
          width={36}
          height={36}
          className="rounded-md object-cover"
        />

        <span className="truncate text-sm font-medium">{game.title}</span>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-2 h-7 w-7 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <XIcon />
      </Button>
    </li>
  )
}
