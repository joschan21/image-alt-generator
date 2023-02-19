import { NextApiRequest, NextApiResponse } from "next"
import { withMethods } from "@/src/lib/api-middlewares/with-methods"
import { s3 } from "@/src/lib/s3"
import { AWS_BUCKET_NAME } from "@/src/config/s3"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // key refers to the file name in s3 bucket
  const { key } = req.query

  const fileUrl = await s3.getSignedUrlPromise("getObject", {
    Bucket: AWS_BUCKET_NAME,
    Key: key,
  })

  return res.status(200).json({ fileUrl })
}

export default withMethods(["GET"], handler)
