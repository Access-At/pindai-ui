import api from '../configApi'

export async function fetchDashboardKaprodi() {
  const request = await api.get('/kaprodi/dashboard')
  return request.data.data
}

export async function fetchKaprodiById(id: string) {
  const request = await api.get(`/kaprodi/${id}`)
  return request.data.data
}
