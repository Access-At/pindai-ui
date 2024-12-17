import api from '~/api/configApi'

export async function fetchUser() {
  const request = await api.get('/')
  console.log(request.data)
  return request.data
}

export async function deleteUserData() {
  const request = await api.delete('/user')
  return request.data
}
