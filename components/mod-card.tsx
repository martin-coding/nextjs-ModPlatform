import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { dateString, formatCompactNumber, timeAgo } from "@/lib/utils"
import {
  ThumbsUpIcon,
  DownloadIcon,
  RotateCwIcon,
  ArrowUpFromLineIcon,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { ModCardMod } from "@/lib/definitions"

export function ModCard({ mod }: { mod: ModCardMod }) {
  const imageSrc = mod.images[0]?.storageKey
    ? `/${mod.images[0].storageKey}`
    : "/placeholder.webp"
  const profileUrl = `/users/${mod.user.username}`
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <Image
        src={imageSrc}
        width={1280}
        height={720}
        alt={mod.title}
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardTitle>{mod.title}</CardTitle>
        <Link
          href={profileUrl}
          className="text-muted-foreground hover:text-foreground"
        >
          by {mod.user.displayUsername}
        </Link>
        <Badge variant="secondary">{mod.category?.name}</Badge>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-muted-foreground">
          {mod.descriptionShort}
        </p>
      </CardContent>
      <CardFooter className="mt-auto">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-1">
            <ThumbsUpIcon className="h-4 w-4" />
            <span>{formatCompactNumber(mod.likesCount)}</span>
          </div>

          <div className="flex items-center gap-1">
            <DownloadIcon className="h-4 w-4" />
            <span>{formatCompactNumber(mod.uniqueDownloads)}</span>
          </div>

          <div className="flex items-center gap-1">
            <RotateCwIcon className="h-4 w-4" />
            <span>
              {mod.lastReleasedAt ? timeAgo(mod.lastReleasedAt) : "NotReleased"}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <ArrowUpFromLineIcon className="h-4 w-4" />
            <span>{dateString(mod.createdAt)}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
