import { z } from 'zod'

export const prodiSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
})

export type ProdiType = z.infer<typeof prodiSchema>
