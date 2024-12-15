import { AuthSchema } from '~/zodSchema/authSchema'
import api from '../configApi'

export async function authenticateUser(data: AuthSchema) {
  return await api.post('/auth/login', data)
}

// export async function registerUser(data: AuthSchema) {
//   return await api.post('/auth/register', data)
// }

export async function logoutUser() {
  return await api.post('/auth/logout', {})
}
