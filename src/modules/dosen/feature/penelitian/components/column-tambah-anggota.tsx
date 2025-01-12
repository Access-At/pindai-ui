"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { useAtomValue } from "jotai"
import { AnggotaType } from "../schema/anggota-schema"
import { selectedAnggotaAtom } from "../state/store"

interface FormFieldProps {
  handleCheckboxChange: (nidn: string) => void
}

export const columnTambahAnggota = ({
  handleCheckboxChange,
}: FormFieldProps): ColumnDef<AnggotaType>[] => {
  return [
    {
      id: "select",
      cell: ({ row }) => {
        const selectedAnggota = useAtomValue(selectedAnggotaAtom)
        return (
          <Checkbox
            checked={selectedAnggota.includes(row.original.nidn)}
            onCheckedChange={() => handleCheckboxChange(row.original.nidn)}
            disabled={selectedAnggota.includes(row.original.nidn)}
            aria-label='Select row'
          />
        )
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "nidn",
      header: "NIDN",
    },
    {
      accessorKey: "name",
      header: "Nama",
    },
    {
      accessorKey: "name_with_title",
      header: "Nama Dengan Gelar",
    },
    {
      accessorKey: "prodi",
      header: "Prodi",
    },
    {
      accessorKey: "phone_number",
      header: "Nomor Telepon",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "scholar_id",
      header: "Scholar ID",
    },
    {
      accessorKey: "scopus_id",
      header: "Scopus ID",
    },
    {
      accessorKey: "job_functional",
      header: "Job Functional",
    },
    {
      accessorKey: "affiliate_campus",
      header: "Affiliate Campus",
    },
  ]
}
