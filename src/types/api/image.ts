import { s3ResponseSchema } from '@/src/lib/validations/s3'
import { ZodIssue, z } from 'zod'

export type ImageResponseData = {
  success: boolean
  alt: string
  message: string
}

export type PresignResponseData =
  | z.infer<typeof s3ResponseSchema>
  | ZodIssue[]
  | { error: string }
