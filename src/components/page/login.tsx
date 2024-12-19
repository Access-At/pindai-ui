'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { getCookieDecrypted, setCookie } from '~/utils/cookie'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { authSchema } from '~/zodSchema/authSchema'
import { authenticateUser } from '~/api/request/auth-request'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { LoaderCircleIcon } from 'lucide-react'

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof authSchema>) => {
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
        toast.error(err.response.data.message)
      })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-auto"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          Login {loading && <LoaderCircleIcon className="animate-spin" />}
        </Button>
      </form>
    </Form>
  )
}
