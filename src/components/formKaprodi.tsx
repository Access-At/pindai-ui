/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { z } from 'zod'
import { kaprodiSchema, KaprodiType } from '~/zodSchema/dppm/kaprodi'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { addKaprodiDppm, updateKaprodiDppm } from '~/api/request/dppm-request'
import { toast } from 'sonner'

type FormProps = {
  isEdit?: boolean
  initialData?: KaprodiType
  id?: string
}

export default function FormKaprodi({
  initialData,
  id,
  isEdit = false,
}: FormProps) {
  const form = useForm<z.infer<typeof kaprodiSchema>>({
    resolver: zodResolver(kaprodiSchema),
    defaultValues: {
      name: isEdit === true ? initialData?.name : '',
      email: initialData?.email,
      nidn: initialData?.nidn,
      address: initialData?.address,
      fakultas: initialData?.fakultas,
      status: initialData?.status,
    },
  })

  const onSubmit = async (data: z.infer<typeof kaprodiSchema>) => {
    try {
      if (initialData) {
        await updateKaprodiDppm(id as string, data).then((res) => {
          toast.success(res.message)
        })
      } else {
        await addKaprodiDppm(data).then((res) => {
          toast.success(res.message)
          form.reset()
        })
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Terjadi kesalahan')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name Kaprodi</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nidn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIDN</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fakultas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fakultas</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="capitalize size-fit ml-auto">
          {!!initialData ? 'edit' : 'kirim'}
        </Button>
      </form>
    </Form>
  )
}
