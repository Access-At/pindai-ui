import { AuthSchema } from '~/zodSchema/authSchema'
import api from '../configApi'

export async function getUser(data: AuthSchema) {
  return await api.post('/auth/login', data)
}
