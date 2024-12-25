import { z } from 'zod'

export const dosenSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  nidn: z.string(),
  fakultas_id: z.string(),
  prodi_id: z.string(),
})

export type DosenType = z.infer<typeof dosenSchema>
