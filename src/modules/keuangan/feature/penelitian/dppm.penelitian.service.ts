import {
  DetailPenelitian,
  PenelitianDosenData,
} from "@/modules/dosen/feature/penelitian/penelitian-dosen.interface"
import { API_ENDPOINTS_KEUANGAN } from "@/services/api/api-config"
import { getData, postData } from "@/services/api/http"
import { KeuanganResponse } from "../../keuangan.interface"

export async function getPenelitianDppm(
  page: number,
  search?: string,
  tahun_akademik?: string,
  status_kaprodi?: string,
  status_dppm?: string,
  status_keuangan?: string,
) {
  const params: Record<string, string | number> = { page }
  if (status_keuangan) params.status_keuangan = status_keuangan
  if (status_kaprodi) params.status_kaprodi = status_kaprodi
  if (tahun_akademik) params.tahun_akademik = tahun_akademik
  if (status_dppm) params.status_dppm = status_dppm
  if (search) params.search = search
  const response: KeuanganResponse<PenelitianDosenData> = await getData(
    API_ENDPOINTS_KEUANGAN.PENELITIAN,
    params,
  )
  return response.data
}

export async function getDetailPenelitian(id: string) {
  const response: KeuanganResponse<DetailPenelitian> = await getData(
    `${API_ENDPOINTS_KEUANGAN.PENELITIAN}/${id}`,
  )
  return response.data
}

export async function approvePenelitian(id: string) {
  const response = await postData(
    `${API_ENDPOINTS_KEUANGAN.APPROVED_PENELITIAN}/${id}`,
    {},
  )
  return response
}

export async function canclePenelitian(id: string, keterangan: string) {
  const response = await postData(
    `${API_ENDPOINTS_KEUANGAN.CANCELED_PENELITIAN}/${id}`,
    { keterangan },
  )
  return response
}
