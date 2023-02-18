"use client"

import {
  forwardRef,
  useReducer,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react"
import { useToast } from "@/src/hooks/use-toast"
import ImageUpload from "@/ui/image-upload"

import { maxImgSize } from "@/config/image"
import { cn } from "@/lib/utils"

// Reducer action(s)
const addFilesToInput = () => ({
  type: "ADD_FILES_TO_INPUT" as const,
  payload: [] as File[],
})

type Action = ReturnType<typeof addFilesToInput>
type State = File[]

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const FileInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const { toast } = useToast()
    const [dragActive, setDragActive] = useState<boolean>(false)
    const [input, dispatch] = useReducer((state: State, action: Action) => {
      switch (action.type) {
        case "ADD_FILES_TO_INPUT": {
          // do not allow more than 5 files to be uploaded at once
          if (state.length + action.payload.length > 5) {
            toast({
              title: "Too many files",
              description:
                "You can only upload a maximum of 5 files at a time.",
            })
            return state
          }

          return [...state, ...action.payload]
        }

        // You could extend this, for example to allow removing files
      }
    }, [])

    const noInput = input.length === 0

    // handle drag events
    const handleDrag = (e: DragEvent<HTMLFormElement | HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true)
      } else if (e.type === "dragleave") {
        setDragActive(false)
      }
    }

    // triggers when file is selected with click
    const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
      e.preventDefault()
      if (e.target.files && e.target.files[0]) {
        // at least one file has been selected
        addFilesToState(Array.from(e.target.files))
      }
    }

    const addFilesToState = (files: File[]) => {
      dispatch({ type: "ADD_FILES_TO_INPUT", payload: files })
    }

    // triggers when file is dropped
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        // at least one file has been selected
        addFilesToState(Array.from(e.dataTransfer.files))

        e.dataTransfer.clearData()
      }
    }

    return (
      <form
        onSubmit={(e) => e.preventDefault()}
        onDragEnter={handleDrag}
        className="flex h-full items-center w-2/3 justify-start"
      >
        <label
          htmlFor="dropzone-file"
          className={cn(
            "relative h-full flex flex-col items-center justify-center w-full aspect-video border-2 border-slate-300 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-slate-800 transition",
            { "dark:border-slate-400 dark:bg-slate-800": dragActive },
            { "h-fit aspect-auto": !noInput },
            { "items-start justify-start": !noInput }
          )}
        >
          <div
            className={cn(
              "w-full h-full flex flex-col items-center justify-center",
              { "items-start": !noInput }
            )}
          >
            {noInput ? (
              <>
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>

                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  up to 5 images, {(maxImgSize / 1000000).toFixed(0)}MB per file
                </p>
              </>
            ) : (
              <div className="flex flex-col w-full h-full">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden sm:rounded-lg">
                      <table className="min-w-full divide-y dark:divide-slate-600">
                        <thead className="bg-slate-800">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300  uppercase tracking-wider"
                            >
                              Preview
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300  uppercase tracking-wider"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300  uppercase tracking-wider"
                            >
                              Size
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium dark:text-slate-300  uppercase tracking-wider"
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-slate-600">
                          {input.map((file, index) => (
                            <ImageUpload key={index} image={file} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <input
            {...props}
            ref={ref}
            multiple
            onChange={handleChange}
            accept="image/jpeg, image/jpg, image/png"
            id="dropzone-file"
            type="file"
            className="hidden"
          />

          {true && (
            <div
              className="absolute inset-0"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></div>
          )}
        </label>
      </form>
    )
  }
)
FileInput.displayName = "FileInput"

export { FileInput }
