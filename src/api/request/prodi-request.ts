import api from '../configApi'

export async function fetchProdiList(fakutlasId: string) {
  const request = await api.get(`/list/prodi/${fakutlasId}`)
  return request.data.data
}
