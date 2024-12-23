'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Breadcrumbs from '~/components/breadcrumbs'
import Divider from '~/components/divider'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
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
import { Textarea } from '~/components/ui/textarea'
import {
  penelitianSchema,
  PenelitianType,
} from '~/zodSchema/dosen/penelitianSchema'

export default function TambahPenelitian() {
  const form = useForm<PenelitianType>({
    resolver: zodResolver(penelitianSchema),
    defaultValues: {
      tahun_akademik: '',
      smester: undefined,
      kode_penelitian: '',
      judul_penelitian: '',
      description: '',
    },
  })

  const onSubmit = (data: PenelitianType) => {
    console.log(data)
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs href={'/dashboard/dosen/penelitian/tambah'}>
        Buat Penelitian
      </Breadcrumbs>
      <Card className="max-w-full">
        <CardContent className="py-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <Divider text="data penelitian-tahap 1" className="w-[43%]" />
              <div className="flex gap-4 items-center w-full">
                <FormField
                  control={form.control}
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
                  control={form.control}
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

                <FormField
                  control={form.control}
                  name="kode_penelitian"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel className="uppercase text-xs tracking-wider">
                        kode penelitian
                      </FormLabel>
                      <FormControl>
                        <Input {...field} disabled placeholder="0000" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
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
                control={form.control}
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

              <Divider text="data penelitian-tahap 2.1" className="w-[42.5%]" />
              <div className="flex gap-4 items-center w-full">
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    NIDN
                  </Label>
                  <Input value="0000" disabled />
                </FormItem>
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    NO. HP
                  </Label>
                  <Input value="0000" disabled />
                </FormItem>
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Prodi
                  </Label>
                  <Input value="0000" disabled />
                </FormItem>
              </div>

              <div className="flex gap-4 items-center w-full">
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Nama Lengkap (Tanpa Gelar)
                  </Label>
                  <Input value="0000" disabled />
                </FormItem>
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Nama Lengkap (Menggunakan Gelar)
                  </Label>
                  <Input value="0000" disabled />
                </FormItem>
              </div>

              <div className="flex gap-4 items-center w-full">
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Email
                  </Label>
                  <Input value="asdasd@example.com" disabled />
                </FormItem>
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Scholar ID
                  </Label>
                  <Input value="0000" disabled />
                </FormItem>
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Scopus ID
                  </Label>
                  <Input value="0000" disabled />
                </FormItem>
                <FormItem className="flex-grow">
                  <Label className="uppercase text-xs tracking-wider">
                    Jabatan funsional
                  </Label>
                  <Input value="Jabatan functional" disabled />
                </FormItem>
              </div>

              <FormItem className="flex-grow">
                <Label className="uppercase text-xs tracking-wider">
                  Affiliasi kampus
                </Label>
                <Input value="Affiliasi kampus" disabled />
              </FormItem>

              <Divider text="data penelitian-tahap 2.2" className="w-[42.5%]" />

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
