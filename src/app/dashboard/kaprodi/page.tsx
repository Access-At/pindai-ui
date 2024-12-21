import { redirect, RedirectType } from 'next/navigation'
// import { fetchDashboardKaprodi } from '~/api/request/kaprodi-request'
import Dashboard from '~/components/page/dashboard'
import { infoData, penelitian, pengabdian } from '~/dummy'
import { getCookieDecrypted } from '~/utils/cookie'

export default async function DashboardKaprodi() {
  const user = await getCookieDecrypted('user')

  // const check = await fetchDashboardKaprodi()
  // console.log(check)

  if (user?.role !== 'kaprodi') {
    return redirect(`/dashboard/${user?.role}`, 'push' as RedirectType)
  }
  return (
    <Dashboard
      title="dasbor"
      infoData={infoData}
      penelitianData={penelitian}
      pengabdianData={pengabdian}
      role={user?.role}
    />
  )
}
