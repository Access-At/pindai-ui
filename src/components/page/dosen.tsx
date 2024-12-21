'use client'
import { useAtomValue } from 'jotai'
import { InfoIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { fetchDosen } from '~/api/request/dosen-request'
import { buttonVariants } from '~/components/ui/button'
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
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { cn } from '~/lib/utils'
import { dosenSearch } from '~/state/store'
import EachUtil from '~/utils/each-util'

interface Dosen {
  affiliate_campus: string
  fakultas: string
  id: string
  job_functional: string
  name: string
  nidn: string
  prodi: string
  scholar_id: string
  scopus_id: string
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

interface DosenResponse {
  dosen: Dosen[]
  meta: Meta
}

export default function Dosen({ role }: { role: string }) {
  const value = useAtomValue(dosenSearch)
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<DosenResponse>()

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
    getDosen(currentPage, role, value)
  }, [currentPage, role, value])

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
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/dashboard/dppm/dosen/${item.id}`}
                        className={cn(
                          buttonVariants({ variant: 'default', size: 'icon' }),
                          'bg-cyan-500 text-primary-foreground hover:bg-cyan-600 hover:text-primary-foreground',
                        )}
                      >
                        <InfoIcon />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-white text-sm uppercase">
                      lihat data dosen
                    </TooltipContent>
                  </Tooltip>
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
