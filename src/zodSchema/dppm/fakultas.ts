import { z } from 'zod'

export const fakultasSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
})

export type FakultasType = z.infer<typeof fakultasSchema>
