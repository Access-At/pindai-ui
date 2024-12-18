import { fetchFakultas } from '~/api/request/dppm-request'
import Fakultas from '~/components/page/dppm/fakultas'

export default async function FakultasPage() {
  const data = await fetchFakultas()
  return <Fakultas data={data} />
}
