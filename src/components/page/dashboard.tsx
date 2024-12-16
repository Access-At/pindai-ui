'use client'
import { InformationCard } from '~/components/information'
import StatusBadge from '~/components/status-badge'
import { Card, CardHeader, CardContent } from '~/components/ui/card'
import EachUtil from '~/utils/each-util'
import { ActionCard, DashboardCard } from '../cards'
import { getUser } from '~/utils/get-user'

interface DashboardProps {
  title: string
  infoData: {
    label: string
    value: string
  }[]
  penelitianData: {
    status: string
    message: string
    totalDosen: number
  }[]
  pengabdianData: {
    status: string
    message: string
    totalDosen: number
  }[]
}

export default function Dashboard({
  title,
  infoData,
  penelitianData,
  pengabdianData,
}: DashboardProps) {
  const user = getUser()
  return (
    <div className="flex flex-col gap-4">
      <h1 className="capitalize font-semibold text-muted-foreground">
        {title}
      </h1>
      <div className="grid grid-flow-row grid-cols-4 gap-4">
        <EachUtil
          of={penelitianData}
          render={(item, index) => (
            <Card key={index} className="grow">
              <CardHeader className="flex flex-row items-center justify-between text-xs uppercase tracking-wide">
                <StatusBadge status={item.status} message={item.message} />
              </CardHeader>
              <CardContent className="flex flex-col items-start gap-4 text-muted-foreground">
                <p className="flex items-start gap-2 capitalize">
                  <span className="text-2xl">{item.totalDosen}</span> dosen
                </p>
              </CardContent>
            </Card>
          )}
        />
        <EachUtil
          of={pengabdianData}
          render={(item, index) => (
            <Card key={index} className="grow">
              <CardHeader className="flex flex-row items-center justify-between text-xs uppercase tracking-wide">
                <StatusBadge status={item.status} message={item.message} />
              </CardHeader>
              <CardContent className="flex flex-col items-start gap-4 text-muted-foreground">
                <p className="flex items-start gap-2 capitalize">
                  <span className="text-2xl">{item.totalDosen}</span> dosen
                </p>
              </CardContent>
            </Card>
          )}
        />
      </div>

      <DashboardCard
        title={`dasbor ${user?.role === 'dosen' ? 'dosen' : user?.role === 'kaprodi' ? 'prodi' : ''}`}
        description="Anda dapat melakukan penelitian dan pengabdian kepada masyarakat."
      />

      <div className="flex items-center justify-center gap-4">
        <ActionCard title="penelitian" role={user?.role} />
        <ActionCard title="pengabdian" role={user?.role} />
      </div>

      <div className="flex items-start justify-center gap-4">
        <InformationCard
          role={user?.role}
          title="informasi dosen"
          data={infoData}
        />
        <InformationCard
          role={user?.role}
          title="ulasan terakhir"
          data={[{ label: 'penelitian' }, { label: 'pengabdian' }]}
        />
      </div>
    </div>
  )
}
