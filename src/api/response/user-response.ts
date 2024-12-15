import api from '~/api/configApi'

export async function fetchUser() {
  const response = await api.get('/user')
  return response.data
}

export async function fetchUserById(id: string) {
  const response = await api.get(`/user/${id}`)
  return response.data
}

export async function fetchUserByEmail(email: string) {
  const response = await api.get(`/user/email/${email}`)
  return response.data
}

export async function fetchUserByUsername(username: string) {
  const response = await api.get(`/user/username/${username}`)
  return response.data
}

export async function fetchUserByRole(role: string) {
  const response = await api.get(`/user/role/${role}`)
  return response.data
}

export async function fetchUserByNidn(nidn: string) {
  const response = await api.get(`/user/nidn/${nidn}`)
  return response.data
}

export async function deleteUserData() {
  const response = await api.delete('/user')
  return response.data
}
