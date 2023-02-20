'use client'

import { forwardRef } from 'react'
import Image from 'next/image'
import { useUploadFile } from '@/src/hooks/use-upload-file'
import { ImageResponseData } from '@/src/types/api/image'
import { Progress } from '@/ui/progress'
import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'

interface ImageUploadProps extends React.HTMLAttributes<HTMLTableRowElement> {
  name: string
  size: number
  getUrl: string
  error?: boolean | undefined
}

const ImageUpload = forwardRef<HTMLTableRowElement, ImageUploadProps>(
  ({ getUrl, error, name, size, className, ...props }, ref) => {
    const {
      data,
      progress,
      isLoading,
      error: processingError,
    } = useUploadFile<ImageResponseData>('/api/image/process', getUrl, {
      disabled: error,
    })

    return (
      <tr ref={ref} {...props} className={cn('', className)}>
        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400">
          <div className="relative flex h-12 w-20">
            {error ? (
              <div className="flex w-full justify-center items-center">
                <Icons.redx className="h-6 w-6" />
              </div>
            ) : (
              <Image
                style={{ objectFit: 'contain' }}
                src={getUrl}
                fill
                alt={name}
              />
            )}
          </div>
        </td>
        <td className="px-6 py-4 truncate whitespace-normal text-sm font-medium dark:text-slate-400 ">
          <div className="">
            <p
              className={cn('dark:text-slate-300', {
                'dark:text-red-500': error,
              })}
            >
              {name}
            </p>
            {data ? (
              <p>{data.alt}</p>
            ) : isLoading ? (
              <Loader2 className="mt-1 w-4 h-4 animate-spin" />
            ) : null}
          </div>
        </td>
        <td
          className={cn(
            'px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400',
            {
              'dark:text-red-500': error,
            }
          )}
        >
          {(size / 1000).toFixed(0)} KB
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400 ">
          <Progress
            className={cn('w-full h-2')}
            value={progress}
            isError={error || processingError}
          />
        </td>
      </tr>
    )
  }
)

ImageUpload.displayName = 'ImageUpload'

export default ImageUpload
