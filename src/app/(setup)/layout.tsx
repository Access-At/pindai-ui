'use client'

import { useRouter } from 'next/navigation'
import { hasCookie } from '~/lib/cookie'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const isLogin = hasCookie('access_token')
  if (isLogin) {
    return router.push('/dashboard')
  }
  return (
    <main className="flex min-h-screen bg-primary/5 items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
    </main>
  )
}
