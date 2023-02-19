import { useEffect, useReducer, useRef } from "react"
import axios, { AxiosError } from "axios"

import { toBase64 } from "@/lib/utils"
import { useToast } from "./use-toast"

interface State<T> {
  data?: T
  isLoading: boolean
  progress?: number
  error?: "TOO_LARGE" | "INTERNAL_SERVER_ERROR"
}

type Cache<T> = { [url: string]: T }

// discriminated union type
type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: "TOO_LARGE" | "INTERNAL_SERVER_ERROR" }
  | { type: "progress"; payload: number }

export const useUploadFile = <T = unknown>(url: string, file: File) => {
  const { toast } = useToast()
  const cache = useRef<Cache<T>>({})

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false)

  const initialState: State<T> = {
    error: undefined,
    isLoading: true,
    progress: undefined,
    data: undefined,
  }

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...state }
      case "fetched":
        return { ...state, data: action.payload, isLoading: false }
      case "error":
        return { ...state, error: action.payload, isLoading: false }
      case "progress":
        return { ...state, progress: action.payload }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) return

    cancelRequest.current = false

    const fetchData = async () => {
      dispatch({ type: "loading" })

      // If a cache exists for this url, return it
      if (cache.current[file.name]) {
        dispatch({ type: "fetched", payload: cache.current[url] })
        return
      }

      try {
        const base64 = await toBase64(file)

        const res = await axios.post(url, base64, {
          headers: {
            "Content-Type": "application/octet-stream",
          },

          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            )

            dispatch({ type: "progress", payload: percentCompleted })
          },
        })

        const data = res.data as T
        cache.current[file.name] = data
        if (cancelRequest.current) return

        dispatch({ type: "fetched", payload: data })
      } catch (error) {
        if (cancelRequest.current) return

        if (error instanceof AxiosError && error.response?.status === 413) {
          dispatch({ type: "error", payload: "TOO_LARGE" })

          toast({
            title: `This image is too large (${(
              file.size /
              1024 /
              1024
            ).toFixed(1)}MB).`,
            description: "Please compress this image first.",
          })

          return
        }

        dispatch({ type: "error", payload: "INTERNAL_SERVER_ERROR" })

        toast({
          title: "Something went wrong.",
          description: "Please try again later.",
        })
      }
    }

    void fetchData()

    // Use the cleanup function for avoiding a possible...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true
    }
  }, [url])

  return state
}
