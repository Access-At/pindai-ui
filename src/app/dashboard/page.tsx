'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { getUser } from '~/utils/get-user'

export default function Dashboard() {
  const router = useRouter()
  const user = getUser()

  useEffect(() => {
    switch (user.role) {
      case 'kaprodi':
        router.push(`/dashboard/${user.role}`)
        break
      case 'dosen':
        router.push(`/dashboard/${user.role}`)
        break
      case 'dppm':
        router.push(`/dashboard/${user.role}`)
        break
      default:
        router.push('/')
    }
  }, [router, user])
}
