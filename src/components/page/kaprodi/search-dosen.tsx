'use client'
import { useSetAtom } from 'jotai'
import { CrossIcon, RefreshCcwIcon, UploadIcon } from 'lucide-react'
import ActionButton from '~/components/action-button'
import { Card } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { dosenSearch } from '~/state/store'

export default function SearchDosen() {
  const setValue = useSetAtom(dosenSearch)
  return (
    <Card className="flex gap-4 px-6 py-4">
      <ActionButton
        icon={<CrossIcon className="mr-2 h-4 w-4" />}
        href="/dashboard/kaprodi/dosen/tambah"
        label="Tambah Dosen"
        tooltip="Tambah Dosen Baru Anda"
        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
      />
      <Input
        placeholder="Cari Dosen"
        onChange={(e) => setValue(e.target.value)}
      />
      <ActionButton
        icon={<RefreshCcwIcon className="h-4 w-4" />}
        tooltip="Refresh Halaman / Data"
        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground p-4"
        isIcon
      />
      <ActionButton
        icon={<UploadIcon className="h-4 w-4" />}
        tooltip="Unggah Excel"
        className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white p-4"
        isIcon
      />
    </Card>
  )
}
