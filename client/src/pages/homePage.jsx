import { useEffect } from "react"
import useApi from "../hooks/useApi"
import LoadingSpinner from "../components/loadingSpinner"

export default function HomePage() {
  const { response: articles, isLoading, fetchData } = useApi()
  useEffect(() => {
    fetchData({
      url: "/articles/get",
      method: "GET",
    })
  }, [])

  console.log("Articles", articles)
  if (isLoading) return <LoadingSpinner />
  return (
    <div>
      {articles &&
        articles.map((article) => (
          <div key={article.id} className="prose">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        ))}
    </div>
  )
}
