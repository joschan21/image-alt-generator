import { useEffect, useReducer, useRef } from "react"
import axios from "axios"

import { useToast } from "./use-toast"

interface State<T> {
  data?: T
  isLoading: boolean
  progress?: number
  error?: boolean
}

// discriminated union type
type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: boolean }
  | { type: "progress"; payload: number }

type Options = {
  disabled: boolean | undefined
}

export const useUploadFile = <T = unknown>(
  url: string,
  resourceUrl: string,
  options: Options
) => {
  const { toast } = useToast()
  const { disabled } = options

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false)

  const initialState: State<T> = {
    error: undefined,
    isLoading: false,
    progress: undefined,
    data: undefined,
  }

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...state, isLoading: true }
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
    if (!url || disabled) return

    cancelRequest.current = false

    const fetchData = async () => {
      dispatch({ type: "loading" })

      try {
        const res = await axios.post(url, resourceUrl, {
          headers: {
            "Content-Type": "application/json",
          },

          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            )

            dispatch({ type: "progress", payload: percentCompleted })
          },
        })

        const data = res.data as T
        if (cancelRequest.current) return

        dispatch({ type: "fetched", payload: data })
      } catch (error) {
        if (cancelRequest.current) return

        dispatch({ type: "error", payload: true })

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
