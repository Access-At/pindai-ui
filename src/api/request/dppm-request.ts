import { FakultasType } from '~/zodSchema/dppm/fakultas'
import api from '../configApi'

export async function fetchDashboard() {
  const request = await api.get('/dppm/dashboard')
  return request.data.data
}

export async function fetchFakultas(page: number) {
  const request = await api.get(`/dppm/fakultas`, {
    params: { page: page },
  })

  return request.data.data
}

export async function addFakultas(data: FakultasType) {
  const request = await api.post('/dppm/fakultas', data)
  return request.data
}

export async function updateFakultas(id: string, data: FakultasType) {
  const request = await api.put(`/dppm/fakultas/${id}`, data)
  return request.data
}

export async function deleteFakultas(id: string) {
  const request = await api.delete(`/dppm/fakultas/${id}`)
  return request.data
}
