import { CrossIcon, RefreshCcwIcon, UploadIcon } from 'lucide-react'
import ActionButton from '~/components/action-button'
import Breadcrumbs from '~/components/breadcrumbs'
import SelectMenu from '~/components/select-menu'
import Tables from '~/components/tables'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'

const tahun = Array.from({ length: 30 }).map((_, i) => (2024 - i).toString())
const status = ['disetujui', 'menunggu', 'ditolak']

export default function Penelitian() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs href={'/dashboard/dosen/penelitian'}>Penelitian</Breadcrumbs>
      <Card className="flex flex-col lg:flex-row gap-4 px-6 py-4">
        <ActionButton
          icon={<CrossIcon className="mr-2 h-4 w-4" />}
          label="Tambah Penelitian"
          href={'/dashboard/dosen/penelitian/tambah'}
          tooltip="Tambah Penelitian Baru Anda"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        />
        <Input placeholder="Cari Penelitian" />
        <SelectMenu label="--Tahun--" item={tahun} />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="capitalize border-neutral-300 text-muted-foreground"
            >
              filter Status
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex items-center justify-between">
            <div className="space-y-2">
              <Label className="capitalize">Kaprodi</Label>
              <RadioGroup className="flex flex-col">
                {status.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <RadioGroupItem value={item} />
                    <Label className="capitalize">{item}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="capitalize">DPPM</Label>
              <RadioGroup className="flex flex-col">
                {status.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <RadioGroupItem value={item} />
                    <Label className="capitalize">{item}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </PopoverContent>
        </Popover>
        <div className="flex gap-2">
          <ActionButton
            icon={<RefreshCcwIcon className="h-4 w-4" />}
            tooltip="Refresh Halamat / Data"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground p-4"
            isIcon
          />
          <ActionButton
            icon={<UploadIcon className="h-4 w-4" />}
            tooltip="Export Excel"
            className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white p-4"
            isIcon
          />
        </div>
      </Card>
      <Tables />
    </div>
  )
}
