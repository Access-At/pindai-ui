import { redirect, RedirectType } from 'next/navigation'
import Dashboard from '~/components/page/dashboard'
import { infoData, penelitian, pengabdian } from '~/dummy'
import { getCookieDecrypted } from '~/utils/cookie'

export default async function DashboardDosen() {
  const user = await getCookieDecrypted('user')

  if (user?.role !== 'dosen') {
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
