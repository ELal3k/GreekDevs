import { useState, useCallback } from "react"
import axios from "axios"

const useApi = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const get = useCallback(async (url) => {
    setIsLoading(true)
    setError(null)
    setData(null)

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${url}`)
      setData(res.data)

      if (Array.isArray(res.data) && res.data.length === 0) {
        throw new Error("EMPTY_ARRAY")
      }
    } catch (error) {
      if (error.message === "Network Error") {
        setError("Network Error")
      }

      if (error.message === "EMPTY_ARRAY") {
        setError("Ooohh so empty....")
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { data, isLoading, error, get }
}

export default useApi
