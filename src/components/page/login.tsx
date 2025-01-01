'use client'
import { getCookieDecrypted, setCookie } from '~/utils/cookie'

import { authSchema, AuthType } from '~/zodSchema/authSchema'
import { authenticateUser } from '~/api/request/auth-request'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import Forms from '../forms'
import InputField from '../input-field'

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const form = useForm<AuthType>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: AuthType) => {
    setLoading(true)
    await authenticateUser(data)
      .then(async (res) => {
        await setCookie('access_token', res.data.access_token)
        await setCookie('user', res.data.user)
        const user = await getCookieDecrypted('user')
        toast.success(res.message, {})
        setLoading(false)

        return router.push(`/dashboard/${user?.role}`)
      })
      .catch((err) => {
        if (err.response?.data?.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            form.setError(key as keyof AuthType, {
              message: value as string,
              type: 'manual',
            })
          }
        }
        toast.error(err.response?.data?.message)
      })
      .finally(() => setLoading(false))
  }

  return (
    <Forms
      form={form}
      onSubmit={onSubmit}
      isLoading={loading}
      btnText="Login"
      className="flex flex-col gap-4 w-auto"
    >
      <InputField
        label="Email"
        name="email"
        type="email"
        control={form.control}
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        control={form.control}
      />
    </Forms>
  )
}
