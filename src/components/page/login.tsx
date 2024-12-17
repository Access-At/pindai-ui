'use client'
import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '~/components/ui/input'
import { useForm } from 'react-hook-form'
import { authSchema } from '~/zodSchema/authSchema'
import { authenticateUser } from '~/api/request/auth-request'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'

export default function LoginForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof authSchema>) => {
    await authenticateUser(data)
      .then(async (res) => {
        setCookie('access_token', res.data.access_token)
        toast.success(res.message, {})

        return router.push(`/dashboard`)
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
        <Button type="submit">Login</Button>
      </form>
    </Form>
  )
}
