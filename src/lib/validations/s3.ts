import { ALLOWED_FILE_TYPES } from "@/src/config/s3"
import { z } from "zod"

export const fileTypeSchema = z.string().refine(
  (value) => {
    return ALLOWED_FILE_TYPES.includes(value)
  },
  {
    message: "Invalid file type",
  }
)

/**
 * fields: provided by AWS to authenticate request
 * key: file name in s3 bucket
 * getUrl: url to view the file from s3 bucket
 * postUrl: url that allows post request to s3 bucket
 */

export const s3ResponseSchema = z.object({
  getUrl: z.string(),
  postUrl: z.string(),
  fields: z.object({
    Policy: z.string(),
    "X-Amz-Algorithm": z.string(),
    "X-Amz-Credential": z.string(),
    "X-Amz-Date": z.string(),
    "X-Amz-Signature": z.string(),
    bucket: z.string(),
    key: z.string(),
  }),
})
