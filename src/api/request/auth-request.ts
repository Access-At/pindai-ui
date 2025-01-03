import { AuthType, RegisterType } from '~/zodSchema/authSchema'
import api from '../configApi'
import { response } from '~/interface'

export async function authenticateUser(data: AuthType) {
  const request = await api.post<response>('/auth/login', data)
  return request.data
}

export async function registerDosen(data: RegisterType) {
  const request = await api.post('/auth/register', data)
  return request.data
}

export async function logoutUser() {
  const request = await api.post('/auth/logout', {})
  return request.data
}
