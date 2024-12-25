'use client'
import { useAtomValue } from 'jotai'
import { EditIcon, InfoIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { fetchDosen } from '~/api/request/dosen-request'
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
            <TableHead className="text-center">nidn</TableHead>
            <TableHead className="text-center">fakultas</TableHead>
            <TableHead className="text-center">prodi</TableHead>
            <TableHead className="text-center">afiliasi</TableHead>
            <TableHead className="text-center">jab. fungsi</TableHead>
            <TableHead className="text-center">scholar id</TableHead>
            <TableHead className="text-center">scopus id</TableHead>
            <TableHead className="text-center">action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <EachUtil
            of={data?.dosen || []}
            render={(item, index) => (
              <TableRow className="text-center" key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.nidn}</TableCell>
                <TableCell>{item.fakultas}</TableCell>
                <TableCell>{item.prodi}</TableCell>
                <TableCell>{item.affiliate_campus}</TableCell>
                <TableCell>{item.job_functional}</TableCell>
                <TableCell>{item.scholar_id}</TableCell>
                <TableCell>{item.scopus_id}</TableCell>
                <TableCell className="flex gap-2 justify-center">
                  <TooltipProvider delayDuration={0} disableHoverableContent>
                    {role === 'kaprodi' ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-primary-foreground"
                          >
                            <EditIcon />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="left"
                          className="bg-black text-white text-sm uppercase"
                        >
                          edit dosen
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
                        className="bg-black text-white text-sm uppercase"
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
