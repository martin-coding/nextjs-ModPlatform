import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbData {
  label: string
  href: string
}

export function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: BreadcrumbData[]
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/">Home</Link>} />
        </BreadcrumbItem>

        {breadcrumbs.map((breadcrumb, index) => [
          <BreadcrumbSeparator key={`separator-${breadcrumb.href}`} />,
          <BreadcrumbItem key={breadcrumb.href}>
            {index === breadcrumbs.length - 1 ? (
              <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink
                render={<Link href={breadcrumb.href}>{breadcrumb.label}</Link>}
              />
            )}
          </BreadcrumbItem>,
        ])}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
