import Dosen from '~/components/page/dosen'
import { getCookieDecrypted } from '~/utils/cookie'

export default async function DosenPage() {
  const user = await getCookieDecrypted('user')

  return <Dosen role={user?.role} />
}
