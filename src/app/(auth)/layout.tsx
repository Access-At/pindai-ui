import { RedirectType, redirect } from 'next/navigation'

import { cookies } from 'next/headers'
import { getCookieDecrypted } from '~/utils/cookie'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookie = await cookies()
  const isLogin = cookie.has('access_token')
  const user = await getCookieDecrypted('user')

  if (isLogin) {
    return redirect(`/dashboard/${user?.role}`, 'push' as RedirectType)
  }

  return (
    <main className="flex min-h-screen bg-primary/5 items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
    </main>
  )
}
