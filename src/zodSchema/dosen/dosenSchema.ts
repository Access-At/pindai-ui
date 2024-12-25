import { z } from 'zod'

export const dosenSchemaManual = z.object({
  name: z.string(),
  email: z.string().email(),
  nidn: z.string(),
  name_with_title: z.string(),
  phone_number: z.string(),
  scholar_id: z.string(),
  scopus_id: z.string(),
  job_functional: z.string(),
  affiliate_campus: z.string(),
  prodi: z.string(),
})

export type DosenManualType = z.infer<typeof dosenSchemaManual>

export const profileSchema = z.object({
  nidn: z.string(),
  name: z.string(),
  name_with_title: z.string(),
  email: z.string().email(),
  phone_number: z.string(),
  address: z.string(),
  job_functional: z.string(),
  affiliate_campus: z.string(),
  fakultas_id: z.string(),
  prodi_id: z.string(),
  scholar_id: z.string(),
  scopus_id: z.string(),
})

export type ProfileType = z.infer<typeof profileSchema>
