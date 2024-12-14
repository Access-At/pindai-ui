import { CheckCircle2Icon, InfoIcon } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { researchData } from '~/dummy'
import { Card } from './ui/card'
import { Button } from './ui/button'

export default function Tables() {
  return (
    <div className="w-full">
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead rowSpan={2} className="border-r-2 text-center">
                No
              </TableHead>
              <TableHead rowSpan={2} className="border-r-2 text-center">
                Judul Penelitian
              </TableHead>
              <TableHead rowSpan={2} className="border-r-2 text-center">
                Ketua Penelitian
              </TableHead>
              <TableHead rowSpan={2} className="border-r-2 text-center">
                Bidang
              </TableHead>
              <TableHead rowSpan={2} className="border-r-2 text-center">
                Tahun
              </TableHead>
              <TableHead rowSpan={2} className="border-r-2 text-center">
                Dibuat Pada
              </TableHead>
              <TableHead colSpan={2} className="text-center border-r-2">
                Status Penelitian
              </TableHead>
              <TableHead rowSpan={2} className="text-center">
                Aksi
              </TableHead>
            </TableRow>
            <TableRow className="border-b-2 capitalize">
              <TableHead className="text-center border-r-2">kaprodi</TableHead>
              <TableHead className="text-center border-r-2">dppm</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {researchData.map((research) => (
              <TableRow key={research.id}>
                <TableCell className="border-r-2 text-center">
                  {research.id}
                </TableCell>
                <TableCell className="border-r-2 text-center">
                  {research.title}
                </TableCell>
                <TableCell className="border-r-2 text-center">
                  {research.lead}
                </TableCell>
                <TableCell className="border-r-2 text-center">
                  {research.field}
                </TableCell>
                <TableCell className="border-r-2 text-center">
                  {research.year}
                </TableCell>
                <TableCell className="border-r-2 text-center">
                  {research.createdAt}
                </TableCell>
                <TableCell className="text-center border-r-2">
                  {research.status.kaprodi && (
                    <CheckCircle2Icon className="h-5 w-5 text-green-500 mx-auto" />
                  )}
                </TableCell>
                <TableCell className="text-center border-r-2">
                  {research.status.dppm && (
                    <CheckCircle2Icon className="h-5 w-5 text-purple-500 mx-auto" />
                  )}
                </TableCell>
                <TableCell className="flex text-center justify-center items-center align-middle">
                  <Button
                    variant="ghost"
                    className="size-fit p-2 hover:bg-neutral-200"
                  >
                    <InfoIcon className="text-blue-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
