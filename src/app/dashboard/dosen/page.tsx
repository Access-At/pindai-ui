import { cookies } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'
import Dashboard from '~/components/page/dashboard'
import { infoData, penelitian, pengabdian } from '~/dummy'
import { getCookieDecrypted } from '~/utils/cookie'

export default async function DashboardDosen() {
  const user = await getCookieDecrypted('user')
  const cookie = await cookies()
  const isLogin = cookie.has('access_token')
  if (!isLogin) {
    return redirect('/', 'push' as RedirectType)
  }

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
