import Link from "next/link"
import { SearchDialog } from "@/components/search-dialog"
import { UserMenu } from "@/components/user-menu"
import { UploadDialog } from "@/components/upload-dialog"
import { SiteNavigation } from "@/components/site-navigation"

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-1 flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-8">
        <Link href="/" className="justify-self-start text-2xl font-bold">
          ModPlatform
        </Link>

        <SiteNavigation />
      </div>

      <div className="flex gap-4">
        <SearchDialog />
        <UploadDialog />
        <UserMenu />
      </div>
    </header>
  )
}
