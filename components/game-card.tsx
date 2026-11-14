import Image from "next/image"
import Link from "next/link"
import { PackageIcon, DownloadIcon } from "lucide-react"
import { GameWithStats } from "@/lib/definitions"
import { formatCompactNumber, getImageUrl } from "@/lib/utils"

export default function GameCard({ game }: { game: GameWithStats }) {
  const url = `/games/${game.slug}/mods`
  const imageSrc = getImageUrl(game.coverImage)

  return (
    <div className="flex flex-col gap-1 overflow-hidden transition-all duration-300 hover:-translate-y-1">
      {/* Game cover image */}
      <Link href={url}>
        <Image
          src={imageSrc}
          width={400}
          height={600}
          alt="Game Image"
          className="h-auto w-full rounded object-cover shadow-lg"
        />
      </Link>

      {/* Game Title */}
      <Link href={url} className="text-left text-lg font-semibold">
        {game.name}
      </Link>

      {/* Stats row */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <PackageIcon width={16} height={16} />
          <span>{formatCompactNumber(Number(game.modCount))}</span>
        </div>

        <div className="flex items-center gap-1">
          <DownloadIcon width={16} height={16} />
          <span>{formatCompactNumber(Number(game.totalDownloads))}</span>
        </div>
      </div>
    </div>
  )
}
