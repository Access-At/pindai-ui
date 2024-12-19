import { z } from 'zod'

export const kaprodiSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  nidn: z.string().optional(),
  address: z.string().optional(),
  fakultas: z.string().min(1),
  status: z.string().min(1),
})

export type KaprodiType = z.infer<typeof kaprodiSchema>
