import { EllipsisVerticalIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Fakultas } from '~/dummy'
import EachUtil from '~/utils/each-util'
import { Badge } from '~/components/ui/badge'
import { ActionCard } from '~/components/cards'
import { InformationCard } from '~/components/information'
import { redirect, RedirectType } from 'next/navigation'
import { cookies } from 'next/headers'
import { getCookieDecrypted } from '~/utils/cookie'
import { fetchDashboard } from '~/api/request/dppm-request'

export default async function DashboardDppm() {
  const user = await getCookieDecrypted('user')
  const { fakultas } = await fetchDashboard()
  const cookie = await cookies()
  const isLogin = cookie.has('access_token')
  if (!isLogin) {
    return redirect('/', 'push' as RedirectType)
  }

  if (user?.role !== 'dppm') {
    return redirect(`/dashboard/${user?.role}`, 'push' as RedirectType)
  }
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl text-muted-foreground capitalize">
        Fakultas (10)
      </h2>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <EachUtil
          of={fakultas}
          render={(item: Fakultas, index) => (
            <Card key={index} className="grow">
              <CardHeader className="flex flex-row items-center justify-between text-sm">
                <Badge className="bg-primary/30 text-primary rounded-lg text-center px-3 py-1.5 hover:text-primary-foreground">
                  {index + 1}
                </Badge>
                <EllipsisVerticalIcon className="text-muted-foreground h-5 w-5" />
              </CardHeader>
              <CardContent className="flex flex-col items-start gap-4 text-muted-foreground">
                <h1 className="text-lg leading-none capitalize">{item.name}</h1>
                <p className="flex items-start gap-2 capitalize">
                  <span className="text-2xl">{item.dosen_count}</span> dosen
                </p>
              </CardContent>
            </Card>
          )}
        />
      </div>

      <h2 className="text-xl text-muted-foreground capitalize">
        Penelitian / Pengabdian
      </h2>
      <div className="flex items-center justify-center gap-4">
        <ActionCard title="penelitian" role={user?.role} />
        <ActionCard title="pengabdian" role={user?.role} />
      </div>

      <div className="flex items-center justify-center gap-4">
        <InformationCard title="penelitian terbaru" role={user?.role} />
        <InformationCard title="pengabdian terbaru" role={user?.role} />
      </div>
    </div>
  )
}
