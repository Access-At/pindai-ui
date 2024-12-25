'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon, TrashIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Breadcrumbs from '~/components/breadcrumbs'
import Divider from '~/components/divider'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Textarea } from '~/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { getCookieDecrypted } from '~/utils/cookie'
import {
  DosenManualType,
  dosenSchemaManual,
} from '~/zodSchema/dosen/dosenSchema'
import {
  penelitianSchema,
  PenelitianType,
} from '~/zodSchema/dosen/penelitianSchema'

export default function TambahPenelitian() {
  const [user, setUser] = useState<DosenManualType>()
  const formDosenManual = useForm<DosenManualType>({
    resolver: zodResolver(dosenSchemaManual),
    defaultValues: {
      nidn: '',
      name_with_title: '',
      name: '',
      prodi: '',
      phone_number: '',
      email: '',
      scholar_id: '',
      scopus_id: '',
      job_functional: '',
      affiliate_campus: '',
    },
  })

  const formPenelitian = useForm<PenelitianType>({
    resolver: zodResolver(penelitianSchema),
    defaultValues: {
      tahun_akademik: '',
      smester: undefined,
      judul_penelitian: '',
      description: '',
    },
  })

  const getUser = async () => {
    const user = await getCookieDecrypted('user')
    setUser(user)
  }

  useEffect(() => {
    getUser()
  }, [])

  const onSubmitDosenManual = (data: DosenManualType) => {
    console.log(data)
  }
  const onSubmitPenelitian = (data: PenelitianType) => {
    console.log(data)
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs href={'/dashboard/dosen/penelitian/tambah'}>
        Buat Penelitian
      </Breadcrumbs>
      <Card className="max-w-full">
        <CardContent className="py-6">
          <Form {...formPenelitian}>
            <form
              onSubmit={formPenelitian.handleSubmit(onSubmitPenelitian)}
              className="flex flex-col gap-4"
            >
              <Divider
                text="data penelitian-tahap 1"
                className="w-[34%] lg:w-[43%]"
              />
              <div className="flex flex-col lg:flex-row gap-4 lg:items-center w-full">
                <FormField
                  control={formPenelitian.control}
                  name="tahun_akademik"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel className="uppercase text-xs tracking-wider">
                        tahun akademik
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formPenelitian.control}
                  name="smester"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel className="uppercase text-xs tracking-wider">
                        Smester
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="---pilih smester---" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem
                            className="uppercase text-xs tracking-wider"
                            value="ganjil"
                          >
                            ganjil
                          </SelectItem>
                          <SelectItem
                            className="uppercase text-xs tracking-wider"
                            value="genap"
                          >
                            genap
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem className="flex-grow">
                  <FormLabel className="uppercase text-xs tracking-wider">
                    kode penelitian
                  </FormLabel>
                  <FormControl>
                    <Input disabled defaultValue={'0000'} />
                  </FormControl>
                </FormItem>
              </div>

              <FormField
                control={formPenelitian.control}
                name="judul_penelitian"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel className="uppercase text-xs tracking-wider">
                      Judul Penelitian
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formPenelitian.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel className="uppercase text-xs tracking-wider">
                      deskripsi penelitian
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Divider
                text="data ketua penelitian-tahap 2.1"
                className="w-[30%] lg:w-[41.5%]"
              />
              <div className="flex flex-col lg:flex-row gap-4 lg:items-center w-full">
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    NIDN
                  </Label>
                  <Input
                    defaultValue={user?.nidn === null ? '0000' : user?.nidn}
                    disabled
                  />
                </FormItem>
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    NO. HP
                  </Label>
                  <Input defaultValue={user?.phone_number} disabled />
                </FormItem>
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Prodi
                  </Label>
                  <Input defaultValue={user?.prodi} disabled />
                </FormItem>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 lg:items-center w-full">
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Nama Lengkap (Tanpa Gelar)
                  </Label>
                  <Input defaultValue={user?.name} disabled />
                </FormItem>
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Nama Lengkap (Menggunakan Gelar)
                  </Label>
                  <Input defaultValue={user?.name_with_title} disabled />
                </FormItem>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Email
                  </Label>
                  <Input defaultValue={user?.email} disabled />
                </FormItem>
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Scholar ID
                  </Label>
                  <Input defaultValue={user?.scholar_id} disabled />
                </FormItem>
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Scopus ID
                  </Label>
                  <Input defaultValue={user?.scopus_id} disabled />
                </FormItem>
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Jabatan funsional
                  </Label>
                  <Input defaultValue={user?.job_functional} disabled />
                </FormItem>
              </div>

              <FormItem className="flex-grow">
                <Label className="uppercase text-xs tracking-wider">
                  Affiliasi kampus
                </Label>
                <Input defaultValue={user?.affiliate_campus} disabled />
              </FormItem>

              <Divider
                text="data anggota (tahap pilih anggota) penelitian-tahap 2.2"
                className="w-[17.5%] lg:w-[36%]"
              />
              <div className="flex flex-col md:flex-row gap-4 md:w-fit">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full capitalize border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <PlusIcon />
                      pilih anggota terdaftar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="md:max-w-screen-md lg:max-w-screen-lg rounded-lg">
                    <DialogTitle className="capitalize">
                      pilih anggota terdaftar
                    </DialogTitle>
                    <Input placeholder="cari anggota" />
                    <Table className="border border-neutral-300">
                      <TableHeader>
                        <TableRow className="uppercase font-semibold">
                          <TableHead className="border-r border-neutral-300"></TableHead>
                          <TableHead className="text-center border-r border-neutral-300">
                            no
                          </TableHead>
                          <TableHead className="text-center border-r border-neutral-300">
                            nama
                          </TableHead>
                          <TableHead className="text-center border-r border-neutral-300">
                            nidn
                          </TableHead>
                          <TableHead className="text-center border-r border-neutral-300">
                            fakultas
                          </TableHead>
                          <TableHead className="text-center border-r border-neutral-300">
                            prodi
                          </TableHead>
                          <TableHead className="text-center border-r border-neutral-300">
                            afiliasi
                          </TableHead>
                          <TableHead className="text-center border-r border-neutral-300">
                            jab. fungsi
                          </TableHead>
                          <TableHead className="text-center border-r border-neutral-300">
                            scholar id
                          </TableHead>
                          <TableHead className="text-center">
                            scopus id
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="border-r border-neutral-300">
                            <Checkbox />
                          </TableCell>
                          <TableCell className="text-center border-r border-neutral-300">
                            1
                          </TableCell>
                          <TableCell className="text-center border-r border-neutral-300">
                            dosen
                          </TableCell>
                          <TableCell className="text-center border-r border-neutral-300">
                            123123
                          </TableCell>
                          <TableCell className="text-center border-r border-neutral-300">
                            fakultas
                          </TableCell>
                          <TableCell className="text-center border-r border-neutral-300">
                            prodi
                          </TableCell>
                          <TableCell className="text-center border-r border-neutral-300">
                            afiliasi
                          </TableCell>
                          <TableCell className="text-center border-r border-neutral-300">
                            jab fungsi
                          </TableCell>
                          <TableCell className="text-center border-r border-neutral-300">
                            123123
                          </TableCell>
                          <TableCell className="text-center border-r border-neutral-300">
                            123123
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <DialogFooter className="flex flex-col-reverse gap-y-2 sm:flex-row sm:justify-end sm:space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="capitalize border-neutral-400 text-neutral-700"
                      >
                        batalkan
                      </Button>
                      <Button type="button" className="capitalize">
                        simpan anggota terpilih
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full capitalize border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-primary-foreground"
                    >
                      pilih anggota baru (manual)
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-screen-lg">
                    <DialogTitle className="capitalize">
                      daftar anggota manual
                    </DialogTitle>
                    <Form {...formDosenManual}>
                      <form
                        onSubmit={formDosenManual.handleSubmit(
                          onSubmitDosenManual,
                        )}
                        className="text-muted-foreground space-y-4"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
                          <FormField
                            control={formDosenManual.control}
                            name="nidn"
                            render={({ field }) => (
                              <FormItem className="flex-grow">
                                <FormLabel className="uppercase">
                                  nidn
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={formDosenManual.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem className="flex-grow">
                                <FormLabel className="uppercase">
                                  nama dosen (tanpa gelar)
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={formDosenManual.control}
                            name="name_with_title"
                            render={({ field }) => (
                              <FormItem className="flex-grow">
                                <FormLabel className="uppercase">
                                  nama dosen (gelar)
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
                          <FormField
                            control={formDosenManual.control}
                            name="prodi"
                            render={({ field }) => (
                              <FormItem className="flex-grow">
                                <FormLabel className="uppercase">
                                  prodi
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={formDosenManual.control}
                            name="phone_number"
                            render={({ field }) => (
                              <FormItem className="flex-grow">
                                <FormLabel className="uppercase">
                                  no. hp
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={formDosenManual.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="flex-grow">
                                <FormLabel className="uppercase">
                                  email
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
                          <FormField
                            control={formDosenManual.control}
                            name="scholar_id"
                            render={({ field }) => (
                              <FormItem className="flex-grow">
                                <FormLabel className="uppercase">
                                  scholar id
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={formDosenManual.control}
                            name="scopus_id"
                            render={({ field }) => (
                              <FormItem className="flex-grow">
                                <FormLabel className="uppercase">
                                  scopus id
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={formDosenManual.control}
                            name="job_functional"
                            render={({ field }) => (
                              <FormItem className="flex-grow">
                                <FormLabel className="uppercase">
                                  jabatan fungsional
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={formDosenManual.control}
                            name="affiliate_campus"
                            render={({ field }) => (
                              <FormItem className="flex-grow">
                                <FormLabel className="uppercase">
                                  afiliasi kampus
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button type="submit" className="capitalize">
                          simpan dan tambahkan
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>

              <Table className="border border-neutral-300">
                <TableHeader>
                  <TableRow className="uppercase font-semibold">
                    <TableHead className="text-center border-r border-neutral-300">
                      no
                    </TableHead>
                    <TableHead className="text-center border-r border-neutral-300">
                      nama
                    </TableHead>
                    <TableHead className="text-center border-r border-neutral-300">
                      nidn
                    </TableHead>
                    <TableHead className="text-center border-r border-neutral-300">
                      fakultas
                    </TableHead>
                    <TableHead className="text-center border-r border-neutral-300">
                      prodi
                    </TableHead>
                    <TableHead className="text-center border-r border-neutral-300">
                      afiliasi
                    </TableHead>
                    <TableHead className="text-center border-r border-neutral-300">
                      jab. fungsi
                    </TableHead>
                    <TableHead className="text-center border-r border-neutral-300">
                      scholar id
                    </TableHead>
                    <TableHead className="text-center border-r border-neutral-300">
                      scopus id
                    </TableHead>
                    <TableHead className="text-center">aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-center border-r border-neutral-300">
                      1
                    </TableCell>
                    <TableCell className="text-center border-r border-neutral-300">
                      dosen
                    </TableCell>
                    <TableCell className="text-center border-r border-neutral-300">
                      123123
                    </TableCell>
                    <TableCell className="text-center border-r border-neutral-300">
                      fakultas
                    </TableCell>
                    <TableCell className="text-center border-r border-neutral-300">
                      prodi
                    </TableCell>
                    <TableCell className="text-center border-r border-neutral-300">
                      afiliasi
                    </TableCell>
                    <TableCell className="text-center border-r border-neutral-300">
                      jab fungsi
                    </TableCell>
                    <TableCell className="text-center border-r border-neutral-300">
                      123123
                    </TableCell>
                    <TableCell className="text-center border-r border-neutral-300">
                      123123
                    </TableCell>
                    <TableCell className="text-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-primary-foreground"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="left"
                            className="uppercase text-sm bg-black text-primary-foreground"
                          >
                            hapus anggota
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Button type="submit" className="w-full capitalize">
                simpan dan preview
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
