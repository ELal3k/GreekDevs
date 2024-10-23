import { useEffect } from "react"
import useApi from "../hooks/useApi"

export default function HomePage() {
  const { data: articles, isLoading, error, get } = useApi()

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        await get("/articles/get")
      } catch (err) {
        console.log(err)
      }
    }

    fetchArticles()
  }, [get])

  if (isLoading)
    return <div className="text-center mt-8 text-blue-700">Loading....</div>

  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>

  return (
    <>{articles ? <div>Articles Found</div> : <div>Articles not found</div>}</>
  )
}
