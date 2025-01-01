import { z } from 'zod'

export const dosenSchema = z.object({
  is_active: z.enum(['true', 'false']).transform((value) => value === 'true'),
})

export type DosenType = z.infer<typeof dosenSchema>
