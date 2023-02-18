import { useState } from "react"
import axios from "axios"

import { maxImgSize } from "@/config/image"
import { useToast } from "@/hooks/use-toast"

export const useUploadForm = (url: string) => {
  const { toast } = useToast()
  const [isSuccess, setIsSuccess] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isError, setIsError] = useState<boolean>(false)

  const uploadForm = async (formData: FormData) => {
    // validate formData doesn't exceed max size
    const size = Array.from(formData.entries(), ([key, value]) => ({
      [key]: {
        ContentLength: typeof value === "string" ? value.length : value.size,
      },
    }))

    const totalSize = size.reduce((acc, curr) => {
      const key = Object.keys(curr)[0]
      return acc + curr[key].ContentLength
    }, 0)

    // upload form
    try {
      if (totalSize > maxImgSize) throw new Error()

      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress =
            (progressEvent.loaded / (progressEvent?.total ?? 100)) * 50
          setProgress(progress)
        },
        onDownloadProgress: (progressEvent) => {
          const progress =
            50 + (progressEvent.loaded / (progressEvent.total ?? 100)) * 50
          setProgress(progress)
        },
      })
    } catch (error) {
      toast({
        title: `This image is too large (${(totalSize / 1024 / 1024).toFixed(
          1
        )}MB).`,
        description: "Please compress this image first.",
      })
      setIsError(true)

      return
    }

    setIsSuccess(true)
  }

  return { uploadForm, isSuccess, isError, progress }
}
