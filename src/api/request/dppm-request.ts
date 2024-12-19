import { FakultasType } from '~/zodSchema/dppm/fakultas'
import api from '../configApi'
import { KaprodiType } from '~/zodSchema/dppm/kaprodi'

export async function fetchDashboardDppm() {
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

export async function fetchKaprodiDppm(page: number) {
  const request = await api.get(`/dppm/kaprodi`, {
    params: { page: page },
  })
  return request.data.data
}

export async function fetchKaprodiDppmById(id: string) {
  const request = await api.get(`/dppm/kaprodi/${id}`)
  return request.data
}

export async function addKaprodiDppm(data: KaprodiType) {
  const request = await api.post('/dppm/kaprodi', data)
  return request.data
}

export async function updateKaprodiDppm(id: string, data: KaprodiType) {
  const request = await api.put(`/dppm/kaprodi/${id}`, data)
  return request.data
}

export async function deleteKaprodiDppm(id: string) {
  const request = await api.delete(`/dppm/kaprodi/${id}`)
  return request.data
}
