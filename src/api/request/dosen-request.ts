import { DosenType } from '~/zodSchema/kaprodi/dosen'
import api from '../configApi'

export async function fetchDosen(
  page?: number,
  role?: string,
  search?: string,
) {
  const request = await api.get(`/${role}/dosen`, {
    params: { page: page, search: search },
  })
  return request.data.data
}

export async function fetchDosenById(id: string, role: string) {
  const request = await api.get(`/${role}/dosen/${id}`)
  return request.data.data
}

export async function addDosen(data: DosenType) {
  const request = await api.post(`/kaprodi/dosen`, data)
  return request.data
}

export async function updateDosen(id: string, data: DosenType) {
  const request = await api.put(`/kaprodi/dosen/${id}`, data)
  return request.data
}

export async function approvedDosen(id: string) {
  const request = await api.post(`/kaprodi/approved/dosen/${id}`)
  return request.data
}

export async function activeDosen(id: string, is_active: boolean) {
  const request = await api.post(`/kaprodi/active/dosen/${id}`, { is_active })
  return request.data
}
