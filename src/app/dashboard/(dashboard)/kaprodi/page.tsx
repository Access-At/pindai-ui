import Dashboard from '~/components/page/dashboard'
import { infoData, penelitian, pengabdian } from '~/dummy'

export default function DashboardKaprodi() {
  return (
    <Dashboard
      title="dasbor"
      infoData={infoData}
      penelitianData={penelitian}
      pengabdianData={pengabdian}
    />
  )
}
