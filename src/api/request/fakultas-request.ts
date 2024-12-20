import api from '../configApi'

export async function fetchFakultasList() {
  const request = await api.get('/list/fakultas')
  return request.data.data
}
