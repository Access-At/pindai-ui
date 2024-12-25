import { ProfileType } from '~/zodSchema/dosen/dosenSchema'
import api from '../configApi'

export async function fetchFakultasList() {
  const request = await api.get('/list/fakultas')
  return request.data.data
}

export async function fetchProdiList(fakutlasId: string) {
  const request = await api.get(`/list/prodi/${fakutlasId}`)
  return request.data.data
}

export async function fetchProfile() {
  const request = await api.get('/profile')
  return request.data.data
}

export async function updateProfile(data: ProfileType) {
  const request = await api.put('/profile', data)
  return request.data
}
