import Breadcrumbs from '~/components/breadcrumbs'
import Dosen from '~/components/page/dosen'
import SearchDosen from '~/components/page/kaprodi/search-dosen'

import { getCookieDecrypted } from '~/utils/cookie'

export default async function DosenPage() {
  const user = await getCookieDecrypted('user')
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs href={'/dashboard/kaprodi/dosen'}>Dosen</Breadcrumbs>
      <SearchDosen />
      <Dosen role={user?.role} />
    </div>
  )
}
