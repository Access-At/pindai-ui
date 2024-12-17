import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookie = await cookies()
  const isLogin = cookie.has('access_token')

  if (isLogin) {
    return redirect('/dashboard')
  }

  return (
    <main className="flex min-h-screen bg-primary/5 items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
    </main>
  )
}
