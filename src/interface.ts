interface authResopnse {
  access_token: string
  token_type: string
  user: string
}

export interface response {
  data: authResopnse
  message: string
  status: string
  error?: string
}

export interface Meta {
  current_page: number
  from: number
  last_page: number
  path: string
  per_page: number
  to: number
  total: number
}

export interface IDosen {
  affiliate_campus: string
  fakultas: string
  id: string
  job_functional: string
  address: string
  name: string
  nidn: string
  prodi: string
  scholar_id: string
  scopus_id: string
}

export interface IKaprodi {
  id: string
  name: string
  email: string
  nidn: string
  address: string
  fakultas_id: string
  fakultas: string
  status: string
}

export interface KaprodiResponse {
  kaprodi: IKaprodi[]
  meta: Meta
}
export interface DosenResponse {
  dosen: IDosen[]
  meta: Meta
}
