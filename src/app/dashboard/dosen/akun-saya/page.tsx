/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  fetchProfile,
  updateProfile,
  fetchFakultasList,
  fetchProdiList,
} from '~/api/request/request'
import Forms, { FormFields } from '~/components/forms'
import fakultas from '~/components/page/dppm/fakultas'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { profileField } from '~/constant/field'
import { cn } from '~/lib/utils'
import EachUtil from '~/utils/each-util'
import { profileSchema, ProfileType } from '~/zodSchema/dosen/dosenSchema'
import { FakultasType } from '~/zodSchema/dppm/fakultas'
import { ProdiType } from '~/zodSchema/kaprodi/prodi'

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true)
  const [fakultasList, setFakultasList] = useState<FakultasType[]>([])
  const [prodiList, setProdiList] = useState<ProdiType[]>([])

  const form = useForm<ProfileType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nidn: '',
      name: '',
      name_with_title: '',
      email: '',
      phone_number: '',
      address: '',
      job_functional: '',
      affiliate_campus: '',
      fakultas_id: '',
      prodi_id: '',
      scholar_id: '',
      scopus_id: '',
    },
  })

  useEffect(() => {
    Promise.all([fetchProfile(), fetchFakultasList()])
      .then(([profileData, fakultasData]) => {
        const sanitizedData = Object.fromEntries(
          Object.entries(profileData).map(([key, value]) => [key, value ?? '']),
        ) as ProfileType
        form.reset(sanitizedData)
        setFakultasList(fakultasData)
        if (sanitizedData.fakultas_id) {
          fetchProdiList(sanitizedData.fakultas_id).then(setProdiList)
        }
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message || 'Failed to fetch profile data',
        )
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [form])

  const onSubmit = async (data: ProfileType) => {
    setIsLoading(true)
    await updateProfile(data)
      .then((res) => {
        toast.success(res.message)
      })
      .catch((err) => {
        if (err.response?.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            form.setError(key as keyof ProfileType, {
              message: value as string,
              type: 'manual',
            })
          }
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleFakultasChange = async (fakultasId: string) => {
    console.log(fakultasId)
    form.setValue('fakultas_id', fakultasId)
    form.setValue('prodi_id', '') // Reset prodi when fakultas changes
    try {
      const prodiData = await fetchProdiList(fakultasId)
      setProdiList(prodiData || [])
    } catch (error) {
      toast.error('Failed to fetch prodi data')
      setProdiList([])
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList className="capitalize text-base">
          <BreadcrumbItem>Seting akun</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>akun</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <CardHeader>
          <CardTitle>Informasi Pribadi</CardTitle>
        </CardHeader>
        <CardContent>
          <Forms
            form={form}
            onSubmit={onSubmit}
            isLoading={isLoading}
            btnText="Simpan"
            className="flex flex-col gap-4 uppercase"
          >
            <EachUtil
              of={profileField}
              render={(item, index) =>
                item.name === 'fakultas_id' ? (
                  <FormFields
                    item={item}
                    form={form}
                    key={index}
                    handleSelect={handleFakultasChange}
                    list={fakultasList}
                    type="select"
                  />
                ) : item.name === 'prodi_id' ? (
                  <FormFields
                    item={item}
                    form={form}
                    key={index}
                    handleSelect={handleFakultasChange}
                    list={prodiList}
                    type="select"
                  />
                ) : (
                  <FormFields
                    item={item}
                    form={form}
                    key={index}
                    type="input"
                  />
                )
              }
            />
          </Forms>
          {/* <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="uppercase space-y-4"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <EachUtil
                  of={profileField}
                  render={(item) =>
                    item.select ? (
                      <FormField
                        key={item.name}
                        control={form.control}
                        name={item.name as keyof ProfileType}
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>{item.label}</FormLabel>
                            <Popover>
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
                                      ? item.name === 'fakultas_id'
                                        ? fakultasList.find(
                                            (f) => f.id === field.value,
                                          )?.name
                                        : prodiList.find(
                                            (p) => p.id === field.value,
                                          )?.name
                                      : `Select ${item.label}...`}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput
                                    placeholder={`Search ${item.label.toLowerCase()}...`}
                                  />
                                  <CommandList>
                                    <CommandEmpty>
                                      No {item.label.toLowerCase()} found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <EachUtil
                                        of={
                                          item.name === 'fakultas_id'
                                            ? fakultasList
                                            : prodiList
                                        }
                                        render={(option) => (
                                          <CommandItem
                                            value={option.name}
                                            key={option.id}
                                            onSelect={() => {
                                              if (item.name === 'fakultas_id') {
                                                handleFakultasChange(option.id)
                                              } else {
                                                form.setValue(
                                                  item.name as keyof ProfileType,
                                                  option.id,
                                                )
                                              }
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                option.id === field.value
                                                  ? 'opacity-100'
                                                  : 'opacity-0',
                                              )}
                                            />
                                            {option.name}
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
                    ) : (
                      <FormField
                        key={item.name}
                        control={form.control}
                        name={item.name as keyof ProfileType}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{item.label}</FormLabel>
                            <FormControl>
                              <Input type={item.type || 'text'} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )
                  }
                />
              </div>
              <Button type="submit" className="capitalize" disabled={isLoading}>
                Simpan Perubahan
              </Button>
            </form>
          </Form> */}
        </CardContent>
      </Card>
    </div>
  )
}
