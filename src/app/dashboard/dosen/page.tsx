import { ArrowRightIcon, EllipsisVerticalIcon } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardHeader, CardContent } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import { penelitian, pengabdian } from '~/dummy'
import { cn } from '~/lib/utils'
import EachUtil from '~/utils/each-util'

export default function DashboardDosen() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="capitalize font-semibold text-muted-foreground">dasbor</h1>
      <div className="grid grid-flow-row grid-cols-4 gap-4">
        <EachUtil
          of={penelitian}
          render={(item, index) => (
            <Card key={index} className="grow">
              <CardHeader className="flex flex-row items-center justify-between text-xs uppercase tracking-wide">
                <Badge
                  className={cn(
                    item.status === 'disetujui' &&
                      'bg-green-500/30 text-green-500 hover:bg-green-500 hover:text-primary-foreground',
                    item.status === 'ditolak' &&
                      'bg-red-500/30 text-red-500 hover:bg-red-500 hover:text-primary-foreground',
                  )}
                >
                  {item.status === 'disetujui' && item.message}
                  {item.status === 'ditolak' && item.message}
                </Badge>
                <EllipsisVerticalIcon className="text-muted-foreground h-5 w-5" />
              </CardHeader>
              <CardContent className="flex flex-col items-start gap-4 text-muted-foreground">
                <p className="flex items-start gap-2 capitalize">
                  <span className="text-2xl">10</span> dosen
                </p>
              </CardContent>
            </Card>
          )}
        />
        <EachUtil
          of={pengabdian}
          render={(item, index) => (
            <Card key={index} className="grow">
              <CardHeader className="flex flex-row items-center justify-between text-xs uppercase tracking-wide">
                <Badge
                  className={cn(
                    item.status === 'disetujui' &&
                      'bg-green-500/30 text-green-500 hover:bg-green-500 hover:text-primary-foreground',
                    item.status === 'ditolak' &&
                      'bg-red-500/30 text-red-500 hover:bg-red-500 hover:text-primary-foreground',
                  )}
                >
                  {item.status === 'disetujui' && item.message}
                  {item.status === 'ditolak' && item.message}
                </Badge>
                <EllipsisVerticalIcon className="text-muted-foreground h-5 w-5" />
              </CardHeader>
              <CardContent className="flex flex-col items-start gap-4 text-muted-foreground">
                <p className="flex items-start gap-2 capitalize">
                  <span className="text-2xl">10</span> dosen
                </p>
              </CardContent>
            </Card>
          )}
        />
      </div>

      <Card className="flex flex-col grow p-6 text-muted-foreground">
        <span className="font-semibold capitalize">dasbor dosen</span>
        <span>
          Anda dapat melakukan penelitian dan pengabdian kepada masyarakat.
        </span>
      </Card>

      <div className="flex items-center justify-center gap-4">
        <Card className="flex flex-col grow p-6 gap-4 text-muted-foreground capitalize">
          <Badge className="size-fit bg-green-500/30 text-green-500 hover:bg-green-500 hover:text-primary-foreground">
            Penelitian
          </Badge>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowRightIcon className="h-4 w-4" />
            <span className="capitalize">ajukan penelitian</span>
          </Button>
        </Card>

        <Card className="flex flex-col grow p-6 gap-4 text-muted-foreground capitalize">
          <Badge className="size-fit bg-cyan-500/30 text-cyan-500 hover:bg-cyan-500 hover:text-primary-foreground">
            pengabdian
          </Badge>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowRightIcon className="h-4 w-4" />
            <span className="capitalize">ajukan pengabdian</span>
          </Button>
        </Card>
      </div>

      <div className="flex items-start justify-center gap-4">
        <Card className="flex flex-col grow p-6 text-muted-foreground">
          <h5 className="font-semibold capitalize">informasi dosen</h5>
          <p>Berisikan informasi tentang data diri anda.</p>

          <Separator className="bg-neutral-400 my-4" />
          <div className="flex items-center justify-between">
            <span className="font-semibold capitalize">NIDN</span>
            <span>001</span>
          </div>
          <Separator className="bg-neutral-400 my-4" />
          <div className="flex items-center justify-between">
            <span className="font-semibold capitalize">Email</span>
            <span>mail.prodi@pindai.com</span>
          </div>
          <Separator className="bg-neutral-400 my-4" />
          <div className="flex items-center justify-between">
            <span className="font-semibold capitalize">No. hp</span>
            <span>08123456789</span>
          </div>
          <Separator className="bg-neutral-400 my-4" />
          <div className="flex items-center justify-between">
            <span className="font-semibold capitalize">Jabatan Fungsional</span>
            <span>null</span>
          </div>
          <Separator className="bg-neutral-400 my-4" />
          <div className="flex items-center justify-between">
            <span className="font-semibold capitalize">
              SK Jabatan Fungsional
            </span>
            <span>null</span>
          </div>
          <Separator className="bg-neutral-400 my-4" />
          <div className="flex items-center justify-between">
            <span className="font-semibold capitalize">Prodi</span>
            <span className="capitalize">Fakultas Teknik</span>
          </div>
          <Separator className="bg-neutral-400 my-4" />
          <div className="flex items-center justify-between">
            <span className="font-semibold capitalize">Schopus ID</span>
            <span>10213123213</span>
          </div>
          <Separator className="bg-neutral-400 my-4" />
          <div className="flex items-center justify-between">
            <span className="font-semibold capitalize">Scholar ID</span>
            <span>10213123213</span>
          </div>
        </Card>
        <Card className="flex flex-col p-6 gap-4 text-muted-foreground capitalize">
          <h5 className="font-semibold capitalize">ulasan terakhir</h5>
          <p>
            Melihat usulan terakhir penelitian atau pengabdian kepada masyarakat
          </p>

          <Separator className="bg-neutral-400 my-4" />
          <div className="flex items-center justify-between">
            <span className="font-semibold capitalize">penelitian</span>
            <ArrowRightIcon className="h-4 w-4" />
          </div>
          <Separator className="bg-neutral-400 my-4" />
          <div className="flex items-center justify-between">
            <span className="font-semibold capitalize">pengabdian</span>
            <ArrowRightIcon className="h-4 w-4" />
          </div>
        </Card>
      </div>
    </div>
  )
}
