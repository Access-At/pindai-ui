import { z } from 'zod'

export const dosenSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  nidn: z.string(),
  address: z.string(),
  name_with_title: z.string(),
  phone_number: z.string(),
  scholar_id: z.string(),
  scopus_id: z.string(),
  job_functional: z.string(),
  affiliate_campus: z.string(),
  fakultas_id: z.string(),
  prodi_id: z.string(),
})

export type DosenType = z.infer<typeof dosenSchema>
