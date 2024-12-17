import { z } from 'zod'

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type AuthSchema = z.infer<typeof authSchema>

// DPPM:
// "data": {
//     "id": 1,
//     "name": "Direktur Pembinaan Mahasiswa",
//     "email": "dppm@example.com",
//     "nidn": null,
//     "address": null,
//     "role": "dppm"
//   }

// kaprodi:
//   "data": {
//     "id": 2,
//     "name": "Kaprodi",
//     "email": "kaprodi@example.com",
//     "nidn": null,
//     "address": null,
//     "role": "kaprodi",
//     "faculty": "Fakultas Ekonomi dan Bisnis"
//   }

// dosen:
//   "data": {
//     "id": 3,
//     "name": "Dosen",
//     "email": "dosen@example.com",
//     "nidn": null,
//     "address": null,
//     "role": "dosen",
//     "name_with_title": "RIP. Dr. Dosen S.pd M.pd A.pd",
//     "phone_number": "081234567890",
//     "scholar_id": "1234567890",
//     "scopus_id": "1234567890",
//     "job_functional": "Dosen",
//     "affiliate_campus": null,
//     "prodi": "Teknik Informatika"
//   }
