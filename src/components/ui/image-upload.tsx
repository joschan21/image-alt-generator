"use client"

import { forwardRef, useEffect, useState } from "react"
import Image from "next/image"
import { useUploadForm } from "@/src/hooks/use-upload-form"
import { Progress } from "@/ui/progress"

import { cn } from "@/lib/utils"

interface ImageUploadProps extends React.HTMLAttributes<HTMLTableRowElement> {
  image: File
}

const ImageUpload = forwardRef<HTMLTableRowElement, ImageUploadProps>(
  ({ image, className, ...props }, ref) => {
    const [previewUrl, setPreviewUrl] = useState<string>("")

    const { uploadForm, isError, progress } =
      useUploadForm("/api/image/process")

    // generate preview url
    useEffect(() => {
      setPreviewUrl(URL.createObjectURL(image))
      return () => URL.revokeObjectURL(previewUrl)
    }, [image])

    // upload image
    useEffect(() => {
      const formData = new FormData()
      formData.append("image", image)

      uploadForm(formData)
    }, [image])

    return (
      <tr ref={ref} {...props} className={cn("", className)}>
        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400">
          <div className="relative flex h-12 w-20">
            {previewUrl ? (
              <Image
                style={{ objectFit: "contain" }}
                src={previewUrl}
                fill
                alt={image.name}
              />
            ) : null}
          </div>
        </td>
        <td className="px-6 py-4 truncate whitespace-nowrap text-sm font-medium dark:text-slate-400 ">
          {image.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400 ">
          {(image.size / 1000).toFixed(0)} KB
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400 ">
          <Progress
            className={cn("w-full h-2")}
            value={progress}
            isError={isError}
          />
        </td>
      </tr>
    )
  }
)

ImageUpload.displayName = "ImageUpload"

export default ImageUpload
