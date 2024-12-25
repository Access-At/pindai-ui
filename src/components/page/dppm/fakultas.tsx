/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { EditIcon, LoaderCircleIcon, TrashIcon } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
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
import {
  addFakultas,
  deleteFakultas,
  fetchFakultas,
  updateFakultas,
} from '~/api/request/dppm-request'
import { useEffect, useState } from 'react'

import { Button } from '~/components/ui/button'
import EachUtil from '~/utils/each-util'
import { Input } from '~/components/ui/input'
import { fakultasSchema, FakultasType } from '~/zodSchema/dppm/fakultas'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog'

function FakultasForm({
  initialData,
  label,
  onClose,
}: {
  initialData?: any
  label: string
  onClose: () => void
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const form = useForm<FakultasType>({
    resolver: zodResolver(fakultasSchema),
    defaultValues: {
      name: initialData?.name || '',
    },
  })

  const onSubmit = async (data: FakultasType) => {
    try {
      setLoading(true)
      if (initialData) {
        await updateFakultas(initialData.id, data).then((res) => {
          toast.success(res.message)
        })
      } else {
        await addFakultas(data).then((res) => {
          toast.success(res.message)
          form.reset()
        })
      }
      setLoading(false)
      onClose() // Close the dialog after successful submission
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Terjadi kesalahan')
    }

    router.refresh()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">nama {label}</FormLabel>
              <FormControl>
                <Input type="text" autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="capitalize" disabled={loading}>
          simpan {loading && <LoaderCircleIcon className="animate-spin" />}
        </Button>
      </form>
    </Form>
  )
}

function FakultasRow({
  item,
  index,
  label,
}: {
  item: any
  index: number
  label: string
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  const handleClose = () => {
    setOpen(false) // Close the dialog
  }

  const onDelete = async () => {
    await deleteFakultas(item.id)
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
      <TableCell className="capitalize">{item.name}</TableCell>
      <TableCell className="flex gap-2">
        <TooltipProvider delayDuration={3} disableHoverableContent>
          <Tooltip>
            <TooltipTrigger asChild>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    className="bg-cyan-500/30 text-cyan-500 hover:bg-cyan-500 hover:text-primary-foreground"
                  >
                    <EditIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className="text-center capitalize">
                    edit {label}
                  </DialogTitle>
                  <FakultasForm
                    initialData={item}
                    onClose={handleClose}
                    label={label}
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
                    hapus {item.name}
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

interface Faculty {
  id: string
  name: string
}

interface Meta {
  current_page: number
  from: number
  last_page: number
  path: string
  per_page: number
  to: number
  total: number
}

interface FacultyResponse {
  fakultas: Faculty[]
  meta: Meta
}
export default function Fakultas() {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<FacultyResponse>()
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false) // Close the dialog
  }

  const fetchFaculties = async (page: number) => {
    try {
      const response = await fetchFakultas(page)
      setData(response)
    } catch (error) {
      console.error('Error fetching faculties:', error)
      toast.error('Failed to fetch faculties. Please try again.')
    }
  }

  useEffect(() => {
    fetchFaculties(currentPage)
  }, [currentPage])

  return (
    <Card>
      <CardHeader className="text-center font-bold text-lg md:text-xl xl:text-2xl py-8 px-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="size-fit capitalize">tambah fakultas</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="text-center capitalize">
              tambah fakultas
            </DialogTitle>
            <FakultasForm
              initialData={null}
              onClose={handleClose}
              label="fakultas"
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="text-center capitalize">
              <TableHead>no</TableHead>
              <TableHead>nama fakultas</TableHead>
              <TableHead>action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <EachUtil
              of={data?.fakultas || []}
              render={(item, index) => (
                <FakultasRow
                  item={item}
                  key={item.id}
                  index={index}
                  label="fakultas"
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
