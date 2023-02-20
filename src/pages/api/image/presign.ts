import { NextApiRequest, NextApiResponse } from "next"
import { MAX_FILE_SIZE } from "@/src/config/image"
import { S3_BUCKET_NAME } from "@/src/config/s3"
import { withMethods } from "@/src/lib/api-middlewares/with-methods"
import { s3 } from "@/src/lib/s3"
import { fileTypeSchema } from "@/src/lib/validations/s3"
import { PresignResponseData } from "@/src/types/api/image"
import { nanoid } from "nanoid"
import { z } from "zod"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<PresignResponseData>
) => {
  const reqFileType = req.body.fileType
  const fileId = nanoid()

  try {
    // validate file extension, will throw if invalid
    const fileType = fileTypeSchema.parse(reqFileType)
    const fileExtension = fileType.split("/")[1]
    const key = `${fileId}.${fileExtension}`

    // Create a presigned POST request to upload the file to S3

    // debug env variables
    if (!process.env.S3_BUCKET_NAME)
      throw new Error("S3_BUCKET_NAME is undefined")
    if (!process.env.S3_ACCESS_KEY_ID)
      throw new Error("S3_ACCESS_KEY_ID is undefined")
    if (!process.env.S3_SECRET_ACCESS_KEY)
      throw new Error("S3_SECRET_ACCESS_KEY is undefined")

    const { url: postUrl, fields } = (await new Promise((resolve, reject) => {
      s3.createPresignedPost(
        {
          Bucket: S3_BUCKET_NAME,
          Fields: { key },
          Expires: 60,
          Conditions: [
            ["content-length-range", 0, MAX_FILE_SIZE],
            ["starts-with", "$Content-Type", "image/"],
          ],
        },
        (err, signed) => {
          if (err) return reject(err)
          resolve(signed)
        }
      )
    })) as { url: string; fields: any }

    const getUrl = await s3.getSignedUrlPromise("getObject", {
      Bucket: S3_BUCKET_NAME,
      Key: key,
    })

    return res.status(200).json({ postUrl, getUrl, fields })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(415).json(error.issues)
    }

    if (error instanceof Error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(500).json({ error: "Something went wrong" })
  }
}

export default withMethods(["POST"], handler)
