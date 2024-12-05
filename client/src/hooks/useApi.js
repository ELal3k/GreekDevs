import { useState } from "react"
import axios from "axios"

const useApi = () => {
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  })

  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  const fetchData = async ({ url, method, data = {}, params = {} }) => {
    setIsLoading(true)
    try {
      const res = await axiosInstance({
        url,
        method,
        data,
        params,
      })
      setResponse(res.data)
      setIsInitialized(true)
      return res.data
    } catch (err) {
      console.log(err.message)
      setIsInitialized(true)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { response, isLoading, fetchData, isInitialized }
}

export default useApi
