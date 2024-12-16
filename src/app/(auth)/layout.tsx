'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { hasCookie } from '~/lib/cookie'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const isLogin = hasCookie('access_token')

  useEffect(() => {
    if (isLogin) {
      return router.push('/dashboard')
    }
  }, [isLogin, router])

  return (
    <main className="flex min-h-screen bg-primary/5 items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
    </main>
  )
}
