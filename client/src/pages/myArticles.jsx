import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useApi from "../hooks/useApi"
import LoadingSpinner from "../components/UI/loadingSpinner"
import TipTapViewer from "../components/TipTap/tipTapViewer"

export default function MyArticles() {
  const { id } = useParams()
  const { response: articles, isLoading, fetchData } = useApi()

  useEffect(() => {
    fetchData({
      url: `/articles/author/${id}`,
    })
  }, [])

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {articles &&
        articles.map((article) => (
          <div
            key={article._id}
            className="border rounded-lg bg-white
      "
          >
            <TipTapViewer
              content={article?.content}
              title={article?.title}
              author={article?.author}
              id={article?._id}
              createdAt={article?.createdAt}
            />
          </div>
        ))}
    </div>
  )
}
