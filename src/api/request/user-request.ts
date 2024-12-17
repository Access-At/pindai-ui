import api from '~/api/configApi'

export async function fetchUser() {
  const request = await api.get('/me')
  return request.data.data
}

export async function deleteUserData() {
  const request = await api.delete('/user')
  return request.data
}
