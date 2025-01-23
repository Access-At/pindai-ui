import Tooltip from "@/components/atom/tooltip"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ROUTE } from "@/services/route"
import { ColumnDef } from "@tanstack/react-table"
import { InfoIcon } from "lucide-react"
import Link from "next/link"
import { PengabdianDosen } from "../pengabdian-dosen.interface"
import StatusBadge from "./status-badge"

export const columnPengabdian = (): ColumnDef<PengabdianDosen>[] => {
  return [
    {
      id: "title",
      accessorKey: "title",
      header: "Judul Pengabdian",
    },
    {
      id: "leader",
      accessorKey: "leader",
      header: "Penanggung Jawab",
    },
    {
      id: "academic_year",
      accessorKey: "academic_year",
      header: "Tahun Akademik",
    },
    {
      id: "created_date",
      accessorKey: "created_date",
      header: "tanggal dibuat",
    },
    {
      accessorKey: "status",
      header: "status",
      columns: [
        {
          id: "status.kaprodi",
          accessorKey: "status.kaprodi",
          header: "Kaprodi",
          cell: ({ row }) => (
            <StatusBadge status={row.original.status.kaprodi} />
          ),
        },
        {
          id: "status.dppm",
          accessorKey: "status.dppm",
          header: "Dppm",
          cell: ({ row }) => <StatusBadge status={row.original.status.dppm} />,
        },
        {
          id: "status.keuangan",
          accessorKey: "status.keuangan",
          header: "Keuangan",
          cell: ({ row }) => (
            <StatusBadge status={row.original.status.keuangan} />
          ),
        },
      ],
    },
    {
      id: "action",
      accessorKey: "action",
      header: "aksi",

      cell: ({ row }) => {
        return (
          <Tooltip contentText='Detail Pengabdian'>
            <Link
              href={`${ROUTE.DASHBOARD}/dosen/pengabdian/${row.original.id}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-primary-foreground",
              )}
            >
              <InfoIcon />
            </Link>
          </Tooltip>
        )
      },
    },
  ]
}