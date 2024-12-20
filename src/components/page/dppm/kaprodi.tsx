/* eslint-disable @typescript-eslint/no-explicit-any */
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
// import {
//   addFakultas,
//   deleteFakultas,
//   fetchFakultas,
//   updateFakultas,
// } from '~/api/request/dppm-request'
import { useEffect, useState } from 'react'

import { Button, buttonVariants } from '~/components/ui/button'
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
import { deleteKaprodiDppm, fetchKaprodiDppm } from '~/api/request/dppm-request'
import Link from 'next/link'
import { cn } from '~/lib/utils'

interface Kaprodi {
  id: string
  name: string
  fakultas: string
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

interface KaprodiResponse {
  kaprodi: Kaprodi[]
  meta: Meta
}

function KaprodiRow({
  item,
  index,
  label,
}: {
  item: any
  index: number
  label: string
}) {
  const router = useRouter()
  const [alertOpen, setAlertOpen] = useState(false)

  const onDelete = async () => {
    await deleteKaprodiDppm(item.id)
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
      <TableCell className="capitalize">{item.fakultas}</TableCell>
      <TableCell className="capitalize">
        {item.status === '1' ? 'Aktif' : 'Tidak Aktif'}
      </TableCell>
      <TableCell className="flex gap-2">
        <TooltipProvider delayDuration={3} disableHoverableContent>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/dashboard/dppm/kaprodi/edit/${item.id}`}
                className={cn(
                  buttonVariants({ variant: 'default', size: 'icon' }),
                  'bg-cyan-500/30 text-cyan-500 hover:bg-cyan-500 hover:text-primary-foreground',
                )}
              >
                <EditIcon />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="uppercase bg-black text-sm font-medium">
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
            <TooltipContent className="uppercase bg-black text-sm font-medium">
              hapus
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
    </TableRow>
  )
}

export default function Kaprodi() {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<KaprodiResponse>()

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
  }, [currentPage])

  return (
    <Card>
      <CardHeader className="text-center font-bold text-lg md:text-xl xl:text-2xl py-8 px-6">
        <Link
          href="/dashboard/dppm/kaprodi/tambah"
          className={cn(
            buttonVariants({ variant: 'default' }),
            'size-fit capitalize',
          )}
        >
          tambah kaprodi
        </Link>
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
                  item={item}
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
