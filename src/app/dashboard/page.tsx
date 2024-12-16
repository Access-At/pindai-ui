'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { hasCookie } from '~/lib/cookie'
import { getUser } from '~/utils/get-user'

export default function Dashboard() {
  const router = useRouter()
  const isLogin = hasCookie('access_token')
  const user = getUser()

  useEffect(() => {
    if (!isLogin) {
      return router.push('/login-first')
    }

    if (user?.role) {
      router.replace(`/dashboard/${user.role}`)
    } else {
      router.replace('/')
    }
  }, [isLogin, router, user])
}
