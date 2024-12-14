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

export const researchData = [
  {
    id: 1,
    title: 'Penelitian A',
    lead: 'Bayu Priyambada',
    field: 'Bidang 1',
    year: '2024',
    createdAt: '14 Des 2024',
    status: {
      kaprodi: true,
      dppm: true,
    },
  },
]

export const infoData = [
  { label: 'NIDN', value: '001' },
  { label: 'Email', value: 'mail.prodi@pindai.com' },
  { label: 'No. hp', value: '08123456789' },
  { label: 'Jabatan Fungsional', value: 'null' },
  { label: 'SK Jabatan Fungsional', value: 'null' },
  { label: 'Prodi', value: 'Fakultas Teknik' },
  { label: 'Schopus ID', value: '10213123213' },
  { label: 'Scholar ID', value: '10213123213' },
]
