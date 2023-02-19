"use client"

import { forwardRef, useEffect, useState } from "react"
import Image from "next/image"
// import { useUploadForm } from "@/src/hooks/use-upload-form"
import { useUploadFile } from "@/src/hooks/use-upload-file"
import { Progress } from "@/ui/progress"
import { Loader2 } from "lucide-react"

import { ImageResponseData } from "@/src/types/api/image"
import { cn } from "@/lib/utils"

interface ImageUploadProps extends React.HTMLAttributes<HTMLTableRowElement> {
  image: File
}

const ImageUpload = forwardRef<HTMLTableRowElement, ImageUploadProps>(
  ({ image, className, ...props }, ref) => {
    const [previewUrl, setPreviewUrl] = useState<string>("")

    const { data, progress, isLoading, error } =
      useUploadFile<ImageResponseData>("/api/image/process", image)

    // generate preview url
    useEffect(() => {
      setPreviewUrl(URL.createObjectURL(image))
      return () => URL.revokeObjectURL(previewUrl)
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
        <td className="px-6 py-4 truncate whitespace-normal text-sm font-medium dark:text-slate-400 ">
          <div className="">
            <p className="dark:text-slate-300">{image.name}</p>
            {data ? (
              <p>{data.alt}</p>
            ) : isLoading ? (
              <Loader2 className="mt-1 w-4 h-4 animate-spin" />
            ) : null}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400 ">
          {(image.size / 1000).toFixed(0)} KB
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400 ">
          <Progress
            className={cn("w-full h-2")}
            value={progress}
            isError={!!error}
          />
        </td>
      </tr>
    )
  }
)

ImageUpload.displayName = "ImageUpload"

export default ImageUpload
