export interface Fakultas {
  name: string
  jumlahDosen: number
}

export const fakultas: Fakultas[] = [
  { name: 'Fakultas Kedokteran', jumlahDosen: 12 },
  { name: 'Fakultas Hukum', jumlahDosen: 8 },
  { name: 'Fakultas Ekonomi', jumlahDosen: 15 },
  { name: 'Fakultas Teknik', jumlahDosen: 10 },
  { name: 'Fakultas MIPA', jumlahDosen: 12 },
  { name: 'Fakultas Pertanian', jumlahDosen: 8 },
  { name: 'Fakultas Kesehatan Masyarakat', jumlahDosen: 10 },
  { name: 'Fakultas Ilmu Sosial', jumlahDosen: 12 },
]

export const penelitian = [
  {
    message: 'penelitian disetujui',
    status: 'disetujui',
  },
  {
    message: 'penelitian ditolak',
    status: 'ditolak',
  },
]

export const pengabdian = [
  {
    message: 'pengabdian disetujui',
    status: 'disetujui',
  },
  {
    message: 'pengabdian ditolak',
    status: 'ditolak',
  },
]
