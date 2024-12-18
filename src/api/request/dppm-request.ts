import { FakultasType } from '~/zodSchema/dppm/fakultas'
import api from '../configApi'

export async function fetchDashboard() {
  const request = await api.get('/dashboard')
  return request.data.data
}
export async function fetchFakultas(page: number) {
  const request = await api.get(`/fakultas/?page=${page}`)
  return request.data.data
}

export async function addFakultas(data: FakultasType) {
  const request = await api.post('/fakultas', data)
  return request.data
}

export async function updateFakultas(id: string, data: FakultasType) {
  const request = await api.put(`/fakultas/${id}`, data)
  return request.data
}
