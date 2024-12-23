/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import {
  fetchKaprodiDppmById,
  updateKaprodiDppm,
} from '~/api/request/dppm-request'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { kaprodiSchema, KaprodiType } from '~/zodSchema/dppm/kaprodi'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'

import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '~/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { FakultasType } from '~/zodSchema/dppm/fakultas'
import { fetchFakultasList } from '~/api/request/fakultas-request'
import EachUtil from '~/utils/each-util'
import { useParams } from 'next/navigation'

export default function EditKaprodi() {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<FakultasType[]>([])
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  const [initialData, setInitialData] = useState<KaprodiType>()

  const form = useForm<z.infer<typeof kaprodiSchema>>({
    resolver: zodResolver(kaprodiSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      nidn: initialData?.nidn || '',
      address: initialData?.address || '',
      fakultas_id: initialData?.fakultas_id || '',
      status: initialData?.status || '0',
    },
  })
  const getFakultas = async () => {
    try {
      await fetchFakultasList().then((res) => {
        setData(res)
      })
    } catch (error) {
      toast.error('Failed to fetch fakultas list')
      console.error(error)
    }
  }

  useEffect(() => {
    setIsInitialLoading(true)
    Promise.all([getFakultas(), fetchKaprodiDppmById(params.id as string)])
      .then(([_, kaprodiData]) => {
        setInitialData(kaprodiData)
        form.reset(kaprodiData)
      })
      .catch((error) => {
        toast.error('Failed to fetch data')
        console.error(error)
      })
      .finally(() => setIsInitialLoading(false))
  }, [params.id, form])

  const onSubmit = async (data: z.infer<typeof kaprodiSchema>) => {
    setIsLoading(true)
    await updateKaprodiDppm(params.id as string, data)
      .then((res) => {
        toast.success(res.message)
      })
      .catch((err) => {
        if (err.response?.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            form.setError(key as keyof z.infer<typeof kaprodiSchema>, {
              message: value as string,
              type: 'manual',
            })
          }
        }
      })
      .finally(() => setIsLoading(false))
  }

  if (isInitialLoading) {
    return <div>Loading...</div>
  }

  return (
    <Card className="flex flex-col items-center justify-center gap-2">
      <CardHeader className="text-center font-bold uppercase text-lg md:text-xl xl:text-2xl">
        Edit Kaprodi
      </CardHeader>
      <CardContent className="flex flex-col w-full">
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
              name="fakultas_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fakultas</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {data.find((item) => item.id === field.value)?.name ||
                            'Select fakultas...'}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" align="start">
                      <Command>
                        <CommandInput
                          placeholder="Search fakultas..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No fakultas found.</CommandEmpty>
                          <CommandGroup>
                            <EachUtil
                              of={data}
                              render={(item) => {
                                return (
                                  <CommandItem
                                    key={item.name}
                                    onSelect={() => {
                                      form.setValue('fakultas_id', item.id)
                                    }}
                                  >
                                    {item.name}
                                    <Check
                                      className={cn(
                                        'ml-auto',
                                        item.id === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                  </CommandItem>
                                )
                              }}
                            />
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Status Kaprodi</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="flex flex-col space-y-1"
                      defaultValue={field.value}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal capitalize">
                          aktif
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal capitalize">
                          tidak aktif
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="capitalize size-fit ml-auto"
              disabled={isLoading}
            >
              kirim
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
