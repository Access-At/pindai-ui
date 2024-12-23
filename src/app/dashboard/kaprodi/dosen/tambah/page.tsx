'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
import EachUtil from '~/utils/each-util'
import { dosenSchema, DosenType } from '~/zodSchema/kaprodi/dosen'
import { addDosen } from '~/api/request/dosen-request'
import { fetchProdiList } from '~/api/request/prodi-request'
import { ProdiType } from '~/zodSchema/kaprodi/prodi'
import { FakultasType } from '~/zodSchema/dppm/fakultas'
import { fetchFakultasList } from '~/api/request/fakultas-request'

export default function TambahDosen() {
  const [isLoading, setIsLoading] = useState(false)
  const [fakultasOpen, setFakultasOpen] = useState(false)
  const [prodiOpen, setProdiOpen] = useState(false)
  const [prodi, setProdi] = useState<ProdiType[]>([])
  const [fakultas, setFakultas] = useState<FakultasType[]>([])

  const form = useForm<DosenType>({
    resolver: zodResolver(dosenSchema),
    defaultValues: {
      name: '',
      email: '',
      nidn: '',
      address: '',
      name_with_title: '',
      phone_number: '',
      scholar_id: '',
      scopus_id: '',
      job_functional: '',
      affiliate_campus: '',
      fakultas_id: '',
      prodi_id: '',
    },
  })

  const getFakultas = async () => {
    await fetchFakultasList().then((res) => {
      setFakultas(res)
    })
  }

  const getProdi = async (fakultasId: string) => {
    await fetchProdiList(fakultasId).then((res) => {
      setProdi(res)
    })
  }

  useEffect(() => {
    getFakultas()
  }, [])

  const onSubmit = async (data: DosenType) => {
    setIsLoading(true)
    await addDosen(data)
      .then((res) => {
        toast.success(res.message)
        form.reset()
      })
      .catch((err) => {
        if (err.response?.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            form.setError(key as keyof DosenType, {
              message: value as string,
              type: 'manual',
            })
          }
        }
      })
      .finally(() => setIsLoading(false))
  }

  console.log(form.getValues())
  return (
    <Card className="flex flex-col items-center justify-center gap-2">
      <CardHeader className="text-center font-bold uppercase text-lg md:text-xl xl:text-2xl">
        Tambah Dosen
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
                  <FormLabel>Name Dosen</FormLabel>
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
              name="name_with_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Dengan Gelar</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scholar_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scholar ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scopus_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scopus ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="job_functional"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jabatan Fungsional</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="affiliate_campus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kampus Affiliasi</FormLabel>
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
                  <Popover open={fakultasOpen} onOpenChange={setFakultasOpen}>
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
                          {field.value
                            ? fakultas.find((item) => item.id === field.value)
                                ?.name
                            : 'Select fakultas...'}
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
                              of={fakultas}
                              render={(item) => (
                                <CommandItem
                                  key={item.name}
                                  value={item.name}
                                  onSelect={() => {
                                    getProdi(item.id)
                                    form.setValue('fakultas_id', item.id)
                                    setFakultasOpen(false)
                                  }}
                                >
                                  {item.name}
                                  <Check
                                    className={cn(
                                      'ml-auto',
                                      item.name === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                    )}
                                  />
                                </CommandItem>
                              )}
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
              name="prodi_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prodi</FormLabel>
                  <Popover open={prodiOpen} onOpenChange={setProdiOpen}>
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
                          {field.value
                            ? prodi.find((item) => item.id === field.value)
                                ?.name
                            : 'Select fakultas...'}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" align="start">
                      <Command>
                        <CommandInput
                          placeholder="Search prodi..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No fakultas found.</CommandEmpty>
                          <CommandGroup>
                            <EachUtil
                              of={prodi}
                              render={(item) => (
                                <CommandItem
                                  key={item.name}
                                  value={item.name}
                                  onSelect={() => {
                                    form.setValue('prodi_id', item.id)
                                    setProdiOpen(false)
                                  }}
                                >
                                  {item.name}
                                  <Check
                                    className={cn(
                                      'ml-auto',
                                      item.name === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                    )}
                                  />
                                </CommandItem>
                              )}
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
