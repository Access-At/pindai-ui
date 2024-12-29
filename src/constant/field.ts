export const profileField = [
  { name: 'nidn', label: 'NIDN' },
  { name: 'name', label: 'Nama' },
  { name: 'name_with_title', label: 'Nama (gelar)' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone_number', label: 'No. HP' },
  { name: 'address', label: 'Alamat' },
  { name: 'job_functional', label: 'Jabatan Fungsional' },
  { name: 'affiliate_campus', label: 'Kampus Afiliasi' },
  { name: 'fakultas_id', label: 'Fakultas', select: true },
  { name: 'prodi_id', label: 'Program Studi', select: true },
  { name: 'scholar_id', label: 'Scholar ID' },
  { name: 'scopus_id', label: 'Scopus ID' },
]

export const kaprodiField = [
  { name: 'name', label: 'nama kaprodi' },
  {
    name: 'email',
    type: 'email',
    label: 'email',
  },
  { name: 'nidn', label: 'nidn' },
  { name: 'address', label: 'alamat' },
  {
    name: 'fakultas_id',
    label: 'fakultas',
    select: true,
  },
  { name: 'status', label: 'status', radio: true },
]
