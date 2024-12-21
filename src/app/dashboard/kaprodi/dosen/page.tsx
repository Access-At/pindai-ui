import Link from 'next/link'
import Dosen from '~/components/page/dosen'
import SearchDosen from '~/components/page/kaprodi/search-dosen'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { getCookieDecrypted } from '~/utils/cookie'

export default async function DosenPage() {
  const user = await getCookieDecrypted('user')
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb className="capitalize font-semibold text-muted-foreground">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard/kaprodi">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize font-semibold text-muted-foreground">
              Dosen
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SearchDosen />
      <Dosen role={user?.role} />
    </div>
  )
}
