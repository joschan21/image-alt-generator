import { toast } from "@/hooks/use-toast"

import { MAX_FILE_SIZE } from "@/config/image"
import { FileTooLargeError } from "@/lib/exceptions"
import { s3ResponseSchema } from "@/lib/validations/s3"

interface UseS3UploadReturn {
  s3Upload: (file: File) => Promise<{ getUrl: string | null; error: boolean }>
}

const uploadFile = async (file: File) => {
  try {
    const res = await fetch("/api/image/presign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileType: file.type,
      }),
    })

    const data = await res.json()

    const { fields, getUrl, postUrl } = s3ResponseSchema.parse(data)

    const outboundToS3 = {
      ...fields,
      "Content-Type": file.type,
      file,
    }

    const formData = new FormData()

    Object.entries(outboundToS3).forEach(([key, value]) => {
      formData.append(key, value)
    })

    try {
      // Upload to S3
      await fetch(postUrl, {
        method: "POST",
        body: formData,
      })
    } catch (error) {
      throw new FileTooLargeError()
    }

    return { getUrl }
  } catch (error) {
    if (error instanceof FileTooLargeError) {
      throw new FileTooLargeError()
    }

    throw new Error("Internal Server Error")
  }
}

export const useS3Upload = (): UseS3UploadReturn => {
  const s3Upload = async (file: File) => {
    try {
      if (file.size > MAX_FILE_SIZE) throw new FileTooLargeError()

      // Single file upload
      const singleFile = file as File

      const { getUrl } = await uploadFile(singleFile)

      return { getUrl, error: false }
    } catch (error) {
      if (error instanceof FileTooLargeError) {
        toast({
          title: "Image Too Large",
          description: error.message,
        })

        return { getUrl: null, error: true }
      }

      toast({
        title: "Internal Server Error",
        description: "There was an error uploading your image.",
      })

      return { getUrl: null, error: true }
    }
  }

  return { s3Upload }
}
