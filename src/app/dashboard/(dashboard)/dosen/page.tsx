import Dashboard from '~/components/page/dashboard'
import { infoData, penelitian, pengabdian } from '~/dummy'

export default function DashboardDosen() {
  return (
    <Dashboard
      title="dasbor"
      infoData={infoData}
      penelitianData={penelitian}
      pengabdianData={pengabdian}
    />
  )
}
