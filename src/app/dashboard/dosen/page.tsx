import { EllipsisVerticalIcon } from 'lucide-react'
import { ActionCard, DashboardCard } from '~/components/cards'
import { InformationCard } from '~/components/information'
import StatusBadge from '~/components/status-badge'
import { Card, CardHeader, CardContent } from '~/components/ui/card'
import { infoData, penelitian, pengabdian } from '~/dummy'
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
                <StatusBadge status={item.status} message={item.message} />
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
                <StatusBadge status={item.status} message={item.message} />
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

      <DashboardCard
        title="dasbor dosen"
        description="Anda dapat melakukan penelitian dan pengabdian kepada masyarakat."
      />

      <div className="flex items-center justify-center gap-4">
        <ActionCard title="Penelitian" btnLabel="ajukan penelitian" />
        <ActionCard title="Pengabdian" btnLabel="ajukan pengabdian" />
      </div>

      <div className="flex items-start justify-center gap-4">
        <InformationCard title="informasi dosen" data={infoData} />
        <InformationCard
          title="ulasan terakhir"
          data={[{ label: 'penelitian' }, { label: 'pengabdian' }]}
        />
      </div>
    </div>
  )
}
