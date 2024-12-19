import api from '../configApi'

export async function fetchDashboardKaprodi() {
  const request = await api.get('/kaprodi/dashboard')
  return request.data.data
}
