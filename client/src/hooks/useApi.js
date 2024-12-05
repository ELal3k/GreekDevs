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
    console.log(
      "9. API Request Config:", //---9---
      {
        url: config.url,
        method: config.method,
        hasToken: !!token,
      }
    )

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  const fetchData = async ({ url, method, data = {}, params = {} }) => {
    console.log("10. fetchData called with:", { url, method }) //---10---

    setIsLoading(true)
    try {
      const res = await axiosInstance({
        url,
        method,
        data,
        params,
      })
      console.log("11. API Response:", res.data) //---11---
      setResponse(res.data)
      setIsInitialized(true)
      return res.data
    } catch (err) {
      console.log("12. API Error:", err.message) //---12---
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
