import { AuthSchema } from '~/zodSchema/authSchema'
import api from '../configApi'
import { response } from '~/management/store'

export async function authenticateUser(data: AuthSchema) {
  const request = await api.post<response>('/auth/login', data)
  return request.data
}

// export async function registerUser(data: AuthSchema) {
//   return await api.post('/auth/register', data)
// }

export async function logoutUser() {
  const request = await api.post('/auth/logout', {})
  return request.data
}
