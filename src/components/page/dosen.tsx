'use client'
import { useAtomValue } from 'jotai'
import { Check, InfoIcon, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  activeDosen,
  approvedDosen,
  fetchDosen,
} from '~/api/request/dosen-request'
import { Button } from '~/components/ui/button'
import { Card, CardFooter } from '~/components/ui/card'
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
import { dosenSearch } from '~/state/store'
import EachUtil from '~/utils/each-util'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import DetailDosen from './detail-dosen'
import { DosenResponse } from '~/interface'
import { useDebounce } from 'use-debounce'
import { Badge } from '../ui/badge'
import { cn } from '~/lib/utils'

export default function Dosen({ role }: { role: string }) {
  const value = useAtomValue(dosenSearch)
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<DosenResponse>()
  const [search] = useDebounce(value, 500)

  const getDosen = async (page: number, role: string, value: string) => {
    try {
      await fetchDosen(page, role, value).then((res) => {
        setData(res)
      })
    } catch (error) {
      console.error('Error fetching dosen:', error)
      toast.error('Failed to fetch dosen. Please try again.')
    }
  }

  const handleApprove = async (id: string) => {
    await approvedDosen(id)
      .then((res) => {
        toast.success(res.message)
        getDosen(currentPage, role, search)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }

  const handleActive = async (id: string, is_active: boolean) => {
    await activeDosen(id, !is_active)
      .then((res) => {
        toast.success(res.message)
        getDosen(currentPage, role, search)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }

  useEffect(() => {
    getDosen(currentPage, role, search)
  }, [currentPage, role, search])

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow className="uppercase font-semibold">
            <TableHead className="text-center">no</TableHead>
            <TableHead className="text-center">nama</TableHead>
            <TableHead className="text-center">email</TableHead>
            <TableHead className="text-center">status</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <EachUtil
            of={data?.dosen || []}
            render={(item, index) => (
              <TableRow className="text-center" key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell className="capitalize">
                  <TooltipProvider delayDuration={0} disableHoverableContent>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="outline"
                          className={cn('p-2 hover:text-primary-foreground', {
                            'border-green-500 text-green-500 hover:bg-green-500':
                              item.is_active,
                            'border-red-500 text-red-500 hover:bg-red-500':
                              !item.is_active,
                          })}
                          onClick={() =>
                            role === 'kaprodi' &&
                            handleActive(item.id, item.is_active)
                          }
                        >
                          {item.is_active ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent
                        side="left"
                        className="bg-black text-white text-xs uppercase"
                      >
                        {item.is_active ? 'Dosen Aktif' : 'Dosen Tidak Aktif'}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="flex gap-2 justify-center">
                  <TooltipProvider delayDuration={0} disableHoverableContent>
                    {role === 'kaprodi' && !item.is_approved ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-green-500 text-green-500 hover:bg-green-500 hover:text-primary-foreground"
                            onClick={() => handleApprove(item.id)}
                          >
                            <Check />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="left"
                          className="bg-black text-white text-xs uppercase"
                        >
                          Approve
                        </TooltipContent>
                      </Tooltip>
                    ) : null}

                    <Tooltip>
                      <Dialog>
                        <TooltipTrigger asChild>
                          <DialogTrigger asChild>
                            <Button
                              variant="default"
                              size="icon"
                              className="bg-cyan-500 text-primary-foreground hover:bg-cyan-600 hover:text-primary-foreground"
                            >
                              <InfoIcon />
                            </Button>
                          </DialogTrigger>
                        </TooltipTrigger>
                        <DialogContent>
                          <DialogTitle>Detail Dosen</DialogTitle>
                          <DetailDosen dosen={item} />
                        </DialogContent>
                      </Dialog>
                      <TooltipContent
                        side="right"
                        className="bg-black text-white text-xs uppercase"
                      >
                        lihat data dosen
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            )}
          />
        </TableBody>
      </Table>
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
