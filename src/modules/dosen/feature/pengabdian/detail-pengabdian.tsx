"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { downloadDocxFile, uploadDocxFile } from "@/utils/files"

import Breadcrumb from "@/components/atom/bradcrumb"
import KeteranganDitolak from "@/components/molecules/keterangan-ditolak"
import { Separator } from "@/components/ui/separator"
import { ROUTE } from "@/services/route"
import { EachUtil } from "@/utils/each-utils"
import { toast } from "sonner"
import { Dosen } from "../../dosen.interface"
import { columnsDokumen } from "./components/column-dokumen"
import { columnsIdentitas } from "./components/column-identitas"
import DokumenTable from "./components/dokumen-table"
import { IdentitasTable } from "./components/identitas-table"
import { useDownloadPengabdian } from "./hook/use-download"
import { useGetDetailPengabdian } from "./hook/use-pengabdian/get-detail-pengabdian"
import { useUploadPengabdian } from "./hook/use-pengabdian/upload"

export default function DetailPengabdianPage({
  id,
  user,
}: {
  id: string
  user: Dosen
}) {
  const { data } = useGetDetailPengabdian(id)

  const { mutate, isPending } = useDownloadPengabdian({
    onSuccess(res) {
      downloadDocxFile(res.base64, res.file_name)
      toast.dismiss()
    },
    onError(err) {
      toast.error(err.message)
    },
  })

  const { mutate: upload } = useUploadPengabdian({
    onSuccess(res) {
      toast.success("Berhasil Mengunggah Dokumen")
    },
    onError(err) {
      toast.error(err.message)
    },
  })

  const handleFileUpload = async (file: File) => {
    const fileEncode = await uploadDocxFile(file)

    const fileData = {
      base64: fileEncode,
      type: file.type,
    }

    upload({ id, file: fileData })
  }

  const handleDownload = (jenis_Dokumen: string) => {
    mutate({ id, jenis_dokumen: jenis_Dokumen })
  }

  const columnsIdentity = columnsIdentitas({ status: data?.status })
  const columnsDocuments = columnsDokumen({
    isLeader: data?.anggota.some(
      anggota => anggota.is_leader === 1 && anggota.nidn === user.nidn,
    ),
    status: data?.status,
    handleFileUpload,
    handleDownload,
  })

  if (isPending) toast.loading("Sedang Mengunduh Dokumen")
  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumb
        href={`${ROUTE.DASHBOARD}/dosen`}
        data={[
          {
            name: "Pengabdian",
            href: `${ROUTE.DASHBOARD}/dosen/pengabdian`,
          },
          {
            name: "Detail",
          },
        ]}
      >
        {data?.title}
      </Breadcrumb>
      {data?.status.kaprodi === "rejected" &&
        data?.status.kaprodi === "rejected" &&
        data?.status.keuangan === "rejected" && (
          <KeteranganDitolak title='Pengabdian ditolak oleh kaprodi'>
            {data.keterangan}
          </KeteranganDitolak>
        )}

      {data?.status.kaprodi === "accepted" &&
        data?.status.dppm === "rejected" &&
        data?.status.keuangan === "rejected" && (
          <KeteranganDitolak title='Pengabdian ditolak oleh dppm'>
            {data.keterangan}
          </KeteranganDitolak>
        )}

      {data?.status.kaprodi === "accepted" &&
        data?.status.dppm === "accepted" &&
        data?.status.keuangan === "rejected" && (
          <KeteranganDitolak title='Pengabdian ditolak oleh keuangan'>
            {data.keterangan}
          </KeteranganDitolak>
        )}

      <Card>
        <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
          <CardTitle className='capitalize tracking-wide'>
            Informasi Pengabdian: {data?.title}
          </CardTitle>
          <CardDescription>
            Kaprodi dapat menyetujui / menolak pengabdian yang diajukan oleh
            dosen.
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='space-y-4 p-6 capitalize text-muted-foreground'>
          <EachUtil
            of={[
              { label: "Ketua Kelompok", value: data?.leader.name },
              { label: "Judul pengabdian", value: data?.title },
              { label: "Bidang", value: data?.bidang || "-" },
              { label: "Jenis pengabdian", value: data?.jenis_pengabdian },
              { label: "Target Indeksasi", value: data?.jenis_indeksasi },
              { label: "Semester", value: data?.semester },
              { label: "Tahun", value: data?.academic_year },
            ]}
            render={(item, index) => (
              <div className='flex flex-col gap-2' key={index}>
                <span>
                  {item.label}: {item.value}
                </span>
                <Separator />
              </div>
            )}
          />
        </CardContent>
      </Card>

      {/* Dokumen Pengabdian */}
      <Card>
        <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
          <CardTitle className='capitalize tracking-wide'>
            dokumen pengabdian
          </CardTitle>
          <CardDescription>
            Tabel berisi dokumen pengabdian yang harus dilengkapi.
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
          <DokumenTable columns={columnsDocuments} />
        </CardContent>
      </Card>

      {/* Identitas Kelompok */}
      <Card>
        <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
          <CardTitle className='capitalize tracking-wide'>
            Identitas Kelompok
          </CardTitle>
          <CardDescription>
            Tabel berisi identitas kelompok pengabdian
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
          <IdentitasTable
            data={data?.anggota || []}
            columns={columnsIdentity}
          />
        </CardContent>
      </Card>
    </div>
  )
}