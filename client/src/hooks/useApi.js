import { useState } from "react"
import axios from "axios"

const useApi = () => {
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState(null)

  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  })

  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  const fetchData = async ({ url, method, data = {}, params = {} }) => {
    setError(null)
    setIsLoading(true)
    try {
      const res = await axiosInstance({
        url,
        method,
        data,
        params,
      })

      setResponse(res.data)
    } catch (err) {
      console.log(err.message)
      setError(err.response ? err.response.data : err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { response, isLoading, error, fetchData }
}

export default useApi
