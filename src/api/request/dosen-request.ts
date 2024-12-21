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

export async function addDosen(data: DosenType) {
  const request = await api.post(`/kaprodi/dosen`, data)
  return request.data
}
