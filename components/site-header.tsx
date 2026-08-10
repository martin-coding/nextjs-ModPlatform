import Link from "next/link"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { SearchDialog } from "@/components/search-dialog"
import { UserMenu } from "@/components/user-menu"
import { UploadDialog } from "@/components/upload-dialog"
import { SiteNavigation } from "@/components/site-navigation"
import { buttonVariants } from "@/components/ui/button"

export default async function SiteHeader() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

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

        {session?.user ? (
          <>
            <UploadDialog />
            <UserMenu user={session.user} />
          </>
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "default" })}
          >
            Login
          </Link>
        )}
      </div>
    </header>
  )
}
