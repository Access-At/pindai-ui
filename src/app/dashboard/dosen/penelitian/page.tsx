import { CrossIcon, RefreshCcwIcon, UploadIcon } from 'lucide-react'
import ActionButton from '~/components/action-button'
import Breadcrumbs from '~/components/breadcrumbs'
import SelectMenu from '~/components/select-menu'
import Tables from '~/components/tables'
import { Card } from '~/components/ui/card'
import { Input } from '~/components/ui/input'

const tahun = Array.from({ length: 30 }).map((_, i) => (2024 - i).toString())
const createdDate = Array.from({ length: 30 }).map((_, i) => {
  const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
  return date.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
})

export default function Penelitian() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs>Penelitian</Breadcrumbs>
      <Card className="flex gap-4 px-6 py-4">
        <ActionButton
          icon={<CrossIcon className="mr-2 h-4 w-4" />}
          label="Tambah Penelitian"
          tooltip="Tambah Penelitian Baru Anda"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        />
        <Input placeholder="Cari Penelitian" />
        <SelectMenu label="--Tahun--" item={tahun} />
        <SelectMenu label="--Status--" item={createdDate} />
        <ActionButton
          icon={<RefreshCcwIcon className="h-4 w-4" />}
          tooltip="Refresh Halamat / Data"
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
      <Tables />
    </div>
  )
}
