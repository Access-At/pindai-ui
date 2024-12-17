import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { fetchUser } from '~/api/request/user-request'

export default async function Dashboard() {
  const cookie = await cookies()
  const isLogin = cookie.has('access_token')
  if (!isLogin) {
    return redirect('/')
  }
  await fetchUser()
  // console.log(user)
}
