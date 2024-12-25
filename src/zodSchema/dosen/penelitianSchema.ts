import { z } from 'zod'

export const penelitianSchema = z.object({
  tahun_akademik: z.string().min(1),
  smester: z.enum(['ganjil', 'genap']),
  judul_penelitian: z.string().min(1),
  description: z.string().min(1),
})

export type PenelitianType = z.infer<typeof penelitianSchema>
