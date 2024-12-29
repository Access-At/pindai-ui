'use client'
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card'
import { EditIcon, TrashIcon } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { useEffect, useState } from 'react'

import { Button } from '~/components/ui/button'
import EachUtil from '~/utils/each-util'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog'
import {
  addKaprodiDppm,
  deleteKaprodiDppm,
  fetchKaprodiDppm,
} from '~/api/request/dppm-request'
import { IKaprodi, KaprodiResponse } from '~/interface'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import Forms from '~/components/forms'
import { fetchFakultasList } from '~/api/request/request'
import { FakultasType } from '~/zodSchema/dppm/fakultas'
import { useForm } from 'react-hook-form'
import { kaprodiSchema, KaprodiType } from '~/zodSchema/dppm/kaprodi'
import { zodResolver } from '@hookform/resolvers/zod'
import { kaprodiField } from '~/constant/field'

function KaprodiRow({
  kaprodi,
  fakultas,
  index,
  label,
}: {
  kaprodi: IKaprodi
  fakultas: FakultasType[]
  index: number
  label: string
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  const onClose = () => setOpen(!open)

  const form = useForm<KaprodiType>({
    resolver: zodResolver(kaprodiSchema),
    defaultValues: {
      name: kaprodi.name,
      email: kaprodi.email,
      nidn: kaprodi.nidn,
      address: kaprodi.address,
      fakultas_id: kaprodi.fakultas_id,
      status: kaprodi.status === '1' ? '1' : '0',
    },
  })

  const onSubmit = async (data: KaprodiType) => {
    // setIsLoading(true)
    await addKaprodiDppm(data)
      .then((res) => {
        onClose()
        toast.success(res.message)
        form.reset()
      })
      .catch((err) => {
        if (err.response?.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            form.setError(key as keyof KaprodiType, {
              message: value as string,
              type: 'manual',
            })
          }
        }
      })
    // .finally(() => setIsLoading(false))
  }

  const onDelete = async () => {
    await deleteKaprodiDppm(kaprodi.id)
      .then((res) => {
        toast.success(res.message)
        router.refresh()
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell className="capitalize">{kaprodi.name}</TableCell>
      <TableCell className="capitalize">{kaprodi.fakultas}</TableCell>
      <TableCell className="capitalize">
        {kaprodi.status === '1' ? 'Aktif' : 'Tidak Aktif'}
      </TableCell>
      <TableCell className="flex gap-2">
        <TooltipProvider delayDuration={3} disableHoverableContent>
          <Tooltip>
            <TooltipTrigger asChild>
              <Dialog open={open} onOpenChange={onClose}>
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    className="bg-cyan-500/30 text-cyan-500 hover:bg-cyan-500 hover:text-primary-foreground"
                  >
                    <EditIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogTitle className="text-center capitalize">
                    edit kaprodi
                  </DialogTitle>
                  <DialogDescription className="text-center capitalize">
                    ubah data {label}
                  </DialogDescription>
                  <Forms
                    form={form}
                    fields={kaprodiField}
                    btnText="simpan"
                    list={fakultas}
                    onSubmit={onSubmit}
                    className="flex flex-col gap-4 uppercase"
                  />
                </DialogContent>
              </Dialog>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="uppercase bg-black text-sm font-medium"
            >
              edit
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    className="bg-red-500/30 text-red-500 hover:bg-red-500 hover:text-primary-foreground"
                  >
                    <TrashIcon />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogTitle className="capitalize">
                    hapus {kaprodi.name}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="capitalize">
                    apakah anda yakin ingin menghapus {label} ini?
                  </AlertDialogDescription>
                  <div className="flex justify-end gap-2">
                    <AlertDialogAction onClick={onDelete}>
                      Hapus
                    </AlertDialogAction>
                    <AlertDialogCancel className="border-red-500 text-red-500 hover:bg-red-500 hover:text-primary-foreground">
                      Batal
                    </AlertDialogCancel>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="uppercase bg-black text-sm font-medium"
            >
              hapus
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
    </TableRow>
  )
}

export default function Kaprodi() {
  const [open, setOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [fakultas, setFakultas] = useState<FakultasType[]>()
  const [data, setData] = useState<KaprodiResponse>()

  const onClose = () => setOpen(!open)

  const getFakultas = async () => {
    await fetchFakultasList().then((res) => setFakultas(res))
  }

  const fetchKaprodi = async (page: number) => {
    try {
      const response = await fetchKaprodiDppm(page)
      setData(response)
    } catch (error) {
      console.error('Error fetching kaprodi:', error)
      toast.error('Failed to fetch kaprodi. Please try again.')
    }
  }

  useEffect(() => {
    fetchKaprodi(currentPage)
    getFakultas()
  }, [currentPage])

  const form = useForm<KaprodiType>({
    resolver: zodResolver(kaprodiSchema),
    defaultValues: {
      name: '',
      email: '',
      nidn: '',
      address: '',
      fakultas_id: '',
      status: '1',
    },
  })

  const onSubmit = async (data: KaprodiType) => {
    // setIsLoading(true)
    await addKaprodiDppm(data)
      .then((res) => {
        onClose()
        toast.success(res.message)
        form.reset()
      })
      .catch((err) => {
        if (err.response?.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            form.setError(key as keyof KaprodiType, {
              message: value as string,
              type: 'manual',
            })
          }
        }
      })
    // .finally(() => setIsLoading(false))
  }

  return (
    <Card>
      <CardHeader className="text-center font-bold text-lg md:text-xl xl:text-2xl py-8 px-6">
        <Dialog open={open} onOpenChange={onClose}>
          <DialogTrigger asChild>
            <Button className="size-fit capitalize">tambah kaprodi</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogTitle className="text-center capitalize">
              tambah kaprodi
            </DialogTitle>
            <DialogDescription className="text-center capitalize">
              tambahkan data kaprodi
            </DialogDescription>
            <Forms
              form={form}
              fields={kaprodiField}
              btnText="simpan"
              list={fakultas}
              onSubmit={onSubmit}
              className="flex flex-col gap-4 uppercase"
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="text-center capitalize">
              <TableHead>no</TableHead>
              <TableHead>nama kaprodi</TableHead>
              <TableHead>fakultas</TableHead>
              <TableHead>status</TableHead>
              <TableHead>action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <EachUtil
              of={data?.kaprodi || []}
              render={(item, index) => (
                <KaprodiRow
                  kaprodi={item}
                  fakultas={fakultas || []}
                  key={item.id}
                  index={index}
                  label="kaprodi"
                />
              )}
            />
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                }
              />
            </PaginationItem>
            {data?.meta.last_page &&
              Array.from({ length: data.meta.last_page }).map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    href="#"
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < (data?.meta.last_page || 1) ? prev + 1 : prev,
                  )
                }
                className={
                  currentPage === data?.meta.last_page
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  )
}
